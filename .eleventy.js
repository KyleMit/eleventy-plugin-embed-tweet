var twitter = require("./TinyTwitter")

module.exports = function(eleventyConfig, options = {}) {

    // added in 0.9.1
    eleventyConfig.addNunjucksAsyncShortcode("tweet", async(tweetId) => {
        return await twitter.getTweet(tweetId, options)
    });

    eleventyConfig.addNunjucksAsyncShortcode("tweetStyles", async() => {
        return await twitter.getStyles()
    });

};
