const metrics = require("datadog-metrics");
const config = require("./config");
const parser = require("./parser");
const os = require("os");
const hostname = os.hostname();

const main = () => {
  Promise.all(
    config.parameters.map(parameter => {
      parser.parseHtml(parameter).then(extendedParameter => {
        const bufferedMetricsLogger = new metrics.BufferedMetricsLogger({
          host: hostname,
          prefix: "goldcoin.",
          flushIntervalSeconds: 120,
          defaultTags: extendedParameter.defaultTags
        });

        bufferedMetricsLogger.gauge("price", extendedParameter.price);
      });
    })
  );
};
const tenmin = 240000;
setInterval(main, tenmin);
