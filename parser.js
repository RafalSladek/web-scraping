const $ = require("cheerio");
const rp = require("request-promise");
const helper = require("./helper");

exports.parseHtml = parameter => {
  return rp(parameter.url)
    .then(function(html) {
      const priceText = $(parameter.selector, html).text();
      parameter.price = helper.convertDegusaPriceToNumber(priceText);
      return parameter;
    })
    .catch(function(err) {
      console.error(err);
    });
};

exports.parseApi = parameter => {
  return rp(parameter.url)
    .then(out => JSON.parse(out))
    .catch(function(err) {
      console.error(err);
    });
};

exports.extractPrice = (url, cssSelector) =>
  rp(url)
    .then(function(html) {
      const priceText = $(cssSelector, html).text();
      const price = helper.convertDegusaPriceToNumber(priceText);
      return price;
    })
    .catch(function(err) {
      console.error(err);
    });
