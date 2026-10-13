/*We are importing english and spanish files methods and ,we club them in a json and export it. */
var printEnglish = require("./english");
var printSpanish = require("./spanish");

module.exports = {
  english: printEnglish,
  spanish: printSpanish,
};
