require('dotenv').config()
const request = require('request-promise')
const { promises: fs } = require("fs");

module.exports = {
    getTweet
}

async function getTweet(tweetId, handle, text, date) {

    let cachedTweets = []
    try {
        let file = await fs.readFile("./cache/tweets.json")
        cachedTweets = JSON.parse(file) || []
    } catch (error) {
        // otherwise, empty array is fine
        console.log(error)
    }

    let cachedTweet = cachedTweets.find(t => t.id_str === tweetId)

    // if we have a cached tweet, use that
    if (cachedTweet && !process.env.CACHE_BUST) {
        return buildTweet(cachedTweet)
    }

    // if we have env variables, go get tweet
    if (process.env.TOKEN && process.env.TOKEN_SECRET && process.env.CONSUMER_KEY && process.env.CONSUMER_SECRET) {
        // fetch tweet
        let apiURI = `https://api.twitter.com/1.1/statuses/show/${tweetId}.json?tweet_mode=extended`
        let oAuth = {
            token: process.env.TOKEN,
            token_secret: process.env.TOKEN_SECRET,
            consumer_key: process.env.CONSUMER_KEY,
            consumer_secret: process.env.CONSUMER_SECRET,
        }
        try {
            let resp = await request.get(apiURI, { oauth: oAuth });
            let liveTweet = JSON.parse(resp)

            // cache tweet
            cachedTweets.push(liveTweet)
            let tweetsJSON = JSON.stringify(cachedTweets, 2, 2)
            await fs.writeFile("./cache/tweets.json", tweetsJSON)

            // build
            return buildTweet(liveTweet)

        } catch (error) {
            // unhappy path - continue to other fallbacks
            console.log(error)
        }


    }

    // see if we have text fallback
    if (handle && text && date) {
        var htmlTweet =
            `<blockquote class="twitter-tweet">
            ${text}
            <a href="https://twitter.com/${handle}/status/${tweetId}">${date}</a>
        </blockquote>
        <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>`

        return htmlTweet
    }

    // finally fallback to client-side injection
    var htmlTweet =
        `<blockquote class="twitter-tweet">
        <a href="https://twitter.com/anon/status/${tweetId}"></a>
    </blockquote>
    <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>`

    return htmlTweet
}

function buildTweet(tweet) {

    let { body, images } = getTweetContents(tweet)

    let { dateDisplay, dateMeta } = getTweetDates(tweet)

    let htmlTweet =
        `<blockquote class="static-tweet">
  <div class="tweet-header">
    <a class="tweet-profile" href="https://twitter.com/${tweet.user.screen_name}" >
      <img src="${tweet.user.profile_image_url_https}" />
    </a>
    <div class="tweet-author">
      <a class="tweet-author-name" href="https://twitter.com/${tweet.user.screen_name}" >${tweet.user.name}</a>
      <a class="tweet-author-handle" href="https://twitter.com/${tweet.user.screen_name}" >@${tweet.user.screen_name}</a>
    </div>
    <a class="tweet-bird" href="https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}">
      <div class="tweet-bird-icon" aria-label="View on Twitter" title="View on Twitter" role="presentation"></div>
    </a>
  </div>
  <p class="tweet-body">${body}</p>
  <div class="tweet-images">${images.map(url => `<img alt='Image from Tweet' src='${url}' />`).join('')}</div>
  <div class="tweet-footer">
    <a class="tweet-heart" href="https://twitter.com/intent/like?tweet_id=${tweet.id_str}">
      <div class="tweet-heart-icon" aria-label="Like" title="Like" role="img"></div>
      <span class="tweet-favorite-count">${tweet.favorite_count}</span>
    </a>
    <a class="tweet-date" href="https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}" title="Time Posted: ${dateMeta}">
      ${dateDisplay}
    </a>
  </div>
</blockquote>`

    return htmlTweet
}

function getTweetContents(tweet) {
    let htmlText = tweet.full_text

    let replacements = []
    let images = []

    // hashtags
    for (hashtag of tweet.entities.hashtags) {
        let { startPos, endPos, len } = getIndexPos(hashtag.indices)

        let oldText = htmlText.substr(startPos, len)
        let newText = `<a href="https://twitter.com/${oldText}">${oldText}</a>`

        replacements.push({ oldText, newText })
    }

    // users
    for (user of tweet.entities.user_mentions) {
        let { startPos, endPos, len } = getIndexPos(user.indices)

        let oldText = htmlText.substr(startPos, len)
        let newText = `<a href="https://twitter.com/hashtag/${user.screen_name}">${oldText}</a>`

        replacements.push({ oldText, newText })
    }

    // urls
    for (url of tweet.entities.urls) {
        let { startPos, endPos, len } = getIndexPos(url.indices)

        let oldText = htmlText.substr(startPos, len)
        let newText = `<a href="${url.expanded_url}">${url.expanded_url.replace(/https?:\/\//,"")}</a>`

        replacements.push({ oldText, newText })
    }

    // media
    for (media of tweet.entities.media) {
        let { startPos, endPos, len } = getIndexPos(media.indices)

        let oldText = htmlText.substr(startPos, len)
        let newText = `` // get rid of img url in tweet text

        replacements.push({ oldText, newText })
        images.push(media.media_url_https)
    }

    // make updates at the end
    for (rep of replacements) {
        htmlText = htmlText.replace(rep.oldText, rep.newText)
    }

    return { body: htmlText, images }
}

function getIndexPos(indices) {

    let startPos = indices[0];
    let endPos = indices[1];
    let len = endPos - startPos

    return {
        startPos,
        endPos,
        len
    }
}

function getTweetDates(tweet) {
    let moment = require("moment");

    let dateMoment = moment(tweet.created_at, "ddd MMM D hh:mm:ss Z YYYY");

    let dateDisplay = dateMoment.format("hh:mm A · MMM D, YYYY")
    let dateMeta = dateMoment.utc().format("MMM D, YYYY hh:mm:ss (z)")

    return { dateDisplay, dateMeta }
}