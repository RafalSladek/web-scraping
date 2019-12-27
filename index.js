const metrics = require("datadog-metrics");
const config = require("./config");
const parser = require("./parser");

const main = () => {
  Promise.all(
    config.parameters.map(p => {
      parser.parseHtml(p).then(p1 => {
        console.log(JSON.stringify(p1));
        const bufferedMetricsLogger = new metrics.BufferedMetricsLogger({
          host: "mac",
          prefix: "goldcoin.",
          flushIntervalSeconds: 5,
          defaultTags: p1.defaultTags
        });

        bufferedMetricsLogger.gauge("price", p1.price);
      });
    })
  );
};

setInterval(main, 15000);
