
## Note

Requires signing up for free [twitter developer account](https://developer.twitter.com/en/apply-for-access) - see more about [signing up for twitter credentials below][#TwitterAPI]

## Usage

At it's simplest, you should just be able to drop in this nunjucks shortcode with a tweet ID which will deliver all the necessary html to embed (must be passed as a string because long numbers will truncate)

```js
{% raw %}{% tweet "1188837207206977536" %}{% endraw %}
```


## Goals

* Avoid client side API calls
* Minimize repetitive server side API calls
* Cache assets and API data so project can build offline
* Leverage free (personal) twitter API tier on build server
* Provide fallback for local development for distributed devs who want to run without adding credentials


## Setting .ENV variables

Create a file named `.env` at the project root - it contains keys so it's excluded by the `.gitignore` so each person will have to manually create their own

```env
TOKEN=********
TOKEN_SECRET=********
CONSUMER_KEY=********
CONSUMER_SECRET=********
```

## Todo

* [ ] Destructure API JSON before caching - only store info we care about
* [ ] Much better docs
* [ ] Figure out more consistent CSS structure
* [ ] Cache profile and media images

## Resources

## Eleventy

* [Allow shortcodes to return promises #429](https://github.com/11ty/eleventy/issues/429)
* [Nunjucks Asynchronous Shortcodes](https://www.11ty.dev/docs/languages/nunjucks/#asynchronous-shortcodes)
* [Ignore Directory](https://www.11ty.dev/docs/ignores/)
* [Escape curly brackets in nunjucks](https://github.com/mozilla/nunjucks/issues/604)
* [Escape curly brackets in nunjucks](https://github.com/mozilla/nunjucks/issues/388)

## Twitter API

* [Apps Dashboard](https://developer.twitter.com/en/apps)
* [Authentication](https://developer.twitter.com/en/docs/basics/authentication/oauth-1-0a)
* [`GET statuses/show/:id](https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/get-statuses-show-id)
  * **Examples**:
    * https://api.twitter.com/1.1/statuses/show/210462857140252672.json
    * https://api.twitter.com/1.1/statuses/show.json?id=210462857140252672

### Twitter

* [Can I fetch the tweet from Twitter if I know the tweet's id?](https://stackoverflow.com/q/897107/1366033)
* [Search for tweets with t.co rewritten links](https://stackoverflow.com/q/7561016/1366033)
* [Twitter api text field value is truncated](https://stackoverflow.com/a/40454382/1366033)

### OAuth

* [How to call the API using OAuth 1.0?](https://stackoverflow.com/q/32328718/1366033)
* [request/**request**](https://github.com/request/request)
  * [Promises & Async/Await](https://github.com/request/request#promises--asyncawait)
  * [OAuth Signing](https://github.com/request/request#oauth-signing)
* *ALT*: [ciaranj/**node-oauth**](https://github.com/ciaranj/node-oauth)
  * [Intro to OAuth with Node.js: OAuth 1.0 (One-Legged)](https://webapplog.com/intro-to-oauth-with-node-js-oauth-1-0/)

## Node.JS

* [Setting Environment Variables for Node to retrieve](https://stackoverflow.com/a/34154491/1366033)
* [Managing Environment Variables in Node.js with dotenv](https://stackabuse.com/managing-environment-variables-in-node-js-with-dotenv/)
* [motdotla/**dotenv**](https://github.com/motdotla/dotenv)
* *ALT*: [erisanolasheni/**custom-env**](https://github.com/erisanolasheni/custom-env)
* [How do you properly promisify request?](https://stackoverflow.com/q/28308131/1366033)
* [Using filesystem in node.js with async / await](https://stackoverflow.com/a/58332163/1366033)
