const moment = require('moment');
 
moment.locale('en');

module.exports = function(eleventyConfig) {

  eleventyConfig.addFilter('dateIso', date => {
    return moment(date).toISOString();
  });

  eleventyConfig.addFilter('dateReadable', date => {
    return moment(date).utc().format('L'); // E.g. May 31, 2019
  });

  // Copy `static/` to `_site/static`
  // If you use a subdirectory, it’ll copy using the same directory structure.
  eleventyConfig.addPassthroughCopy("static/");
};