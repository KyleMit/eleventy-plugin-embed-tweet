
## Install

Install [on npm](https://www.npmjs.com/package/eleventy-plugin-embed-tweet)

```bash
npm install eleventy-plugin-embed-tweet --save
```

## Note

Requires signing up for free [twitter developer account](https://developer.twitter.com/en/apply-for-access)

## Usage

Embed a tweet anywhere you can use nunjucks templates using a shortcode with the tweet id like this:

```js
{% tweet "1188837207206977536" %}
```

> **Note**: ID must be passed as a string because [long numbers will truncate in JS](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER))

### Demo

Demo project available on github at [KyleMit/eleventy-plugin-embed-tweet-demo](https://github.com/KyleMit/eleventy-plugin-embed-tweet-demo) and live version hosted on [eleventy-embed-tweet.netlify.com/](https://eleventy-embed-tweet.netlify.com/)

## Goals

* Avoid client side API calls
* Minimize repetitive server side API calls
* Cache assets and API data so project can build offline
* Leverage free (personal) twitter API tier on build server
* Provide fallback for local development for distributed devs who want to run without adding credentials


## Setting .ENV variables

Once you sign up for a twitter account, you'll need to create a file named `.env` at the project root - it contains keys so it's excluded by the `.gitignore` so each person will have to manually create their own:

```env
TOKEN=********
TOKEN_SECRET=********
CONSUMER_KEY=********
CONSUMER_SECRET=********
```

You'll also have to add the environment variables on your build server

## Todo

* [ ] Destructure API JSON before caching - only store info we care about
* [ ] Cache profile and media images
* [ ] Much better docs
* [ ] Figure out more consistent CSS structure
* [ ] Handle `<br>` elements
* [ ] Automate `npm publish`
