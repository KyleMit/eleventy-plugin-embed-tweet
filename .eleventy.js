var twitter = require("./TinyTwitter")

module.exports = {
    initArguments: {},
    configFunction: function(eleventyConfig, options = {}) {

        if(typeof options.cacheDirectory === "undefined") {
            options.cacheDirectory = "";
        }
        if(typeof options.useInlineStyles === "undefined") {
            options.useInlineStyles = true;
        }
        
        // added in 0.9.1
        eleventyConfig.addNunjucksAsyncShortcode("tweet", async(tweetId) => {
            return await twitter.getTweet(tweetId, options)
        });

        eleventyConfig.addNunjucksAsyncShortcode("tweetStyles", async() => {
            return await twitter.getStyles()
        });

    }
}
