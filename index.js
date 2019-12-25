const rp = require("request-promise");
const $ = require("cheerio");
const metrics = require("datadog-metrics");
const config = require("./config");
const helper = require("./helper");
const metricsLogger = new metrics.BufferedMetricsLogger({
  host: "mac",
  prefix: "goldcoin.",
  flushIntervalSeconds: 5,
  defaultTags: []
});

const locale = "de-DE";
const formatter = new Intl.NumberFormat(locale, {
  style: "currency",
  currency: "EUR"
});

const reverseFormatNumber = val => {
  var group = formatter.format(1111).replace(/1/g, "");
  var decimal = formatter.format(1.1).replace(/1/g, "");
  var reversedVal = val.replace(new RegExp("\\" + group, "g"), "");
  reversedVal = reversedVal.replace(new RegExp("\\" + decimal, "g"), ".");
  return Number.isNaN(reversedVal) ? 0 : reversedVal;
};

const parseHtml = parameter => {
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

const main = () => {
  Promise.all(config.parameters.map(parseHtml)).then(p => {
    var price = p.price;
    //metricsLogger.gauge("price", price);
  });
};

setInterval(main, 15000);
