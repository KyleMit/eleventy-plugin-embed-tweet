var twitter = require("./TinyTwitter")

module.exports = function(eleventyConfig) {

    eleventyConfig.addPassthroughCopy("assets");
    eleventyConfig.addPassthroughCopy("favicon.ico");

    eleventyConfig.addNunjucksAsyncShortcode("tweet", async(tweetId, handle, text, date) => {
        return await twitter.getTweet(tweetId, handle, text, date)
    });

    return {
        markdownTemplateEngine: "njk",
    };
};