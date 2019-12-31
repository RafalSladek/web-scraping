const metrics = require("datadog-metrics");
const io = require("@pm2/io");
const config = require("./config");
const parser = require("./parser");
const os = require("os");
const hostname = os.hostname();
const invocation = io.counter({
  name: "Invocation"
});
const parsing = io.counter({
  name: "Parse"
});

const main = () => {
  invocation.inc();
  Promise.all(
    config.parameters.map(parameter => {
      parser.parseHtml(parameter).then(extendedParameter => {
        parsing.inc();
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
