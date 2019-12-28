var twitter = require("./twitter")

module.exports = {
    initArguments: {},
    configFunction: function(eleventyConfig, {cacheDirectory = "", useInlineStyles = true} = {}) {
        // combine destructured option params
        let options = {cacheDirectory, useInlineStyles}
        
        // added in 0.10.0
        eleventyConfig.addNunjucksAsyncShortcode("tweet", async(tweetId) => {
            return await twitter.getTweet(tweetId, options)
        });

        eleventyConfig.addNunjucksAsyncShortcode("tweetStyles", async() => {
            return await twitter.getStyles()
        });

    }
}
