const pkg = require("./package.json");
const twitter = require("./twitter")

module.exports = {
    initArguments: {},
    configFunction: function(eleventyConfig, {cacheDirectory = "", useInlineStyles = true, autoEmbed = false} = {}) {
        // combine destructured option params
        let options = {cacheDirectory, useInlineStyles, autoEmbed}
        
        try {
            eleventyConfig.versionCheck(pkg["11ty"].compatibility);
        } catch (e) {
            console.log(
              `WARN: Eleventy Plugin (${pkg.name}) Compatibility: ${e.message}`
            );
        }
        // added in 0.10.0
        eleventyConfig.addNunjucksAsyncShortcode("tweet", async(tweetId) => {
            return await twitter.getTweet(tweetId, options)
        });

        eleventyConfig.addNunjucksAsyncShortcode("tweetStyles", async() => {
            return await twitter.getStyles()
        });

        if (options.autoEmbed) {
            eleventyConfig.addTransform("autoEmbedTweets", async (content, outputPath) => {
                return await twitter.autoEmbedTweets(content, outputPath, options)
            });
        }
    }
}
