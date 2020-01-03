const metrics = require("datadog-metrics");
const io = require("@pm2/io");
const degussa_config = require("./degussa_config");
const proaurum_config = require("./proaurum_config");
const parser = require("./parser");
const os = require("os");
const hostname = os.hostname();
const invocation = io.counter({
  name: "Invocation"
});
const parsingSucessful = io.counter({
  name: "ParsingSucessful"
});
const parsingError = io.counter({
  name: "ParsingError"
});

const main = () => {
  invocation.inc();
  const allParameters = degussa_config.parameters.concat(
    proaurum_config.parameters
  );
  Promise.all(
    allParameters.map(parameter => {
      parser
        .parseHtml(parameter)
        .then(extendedParameter => {
          if (extendedParameter.price > 0) {
            console.log("parsingSucessful: " + extendedParameter.name);
            parsingSucessful.inc();
          }

          const bufferedMetricsLogger = new metrics.BufferedMetricsLogger({
            host: hostname,
            prefix: "goldcoin.",
            flushIntervalSeconds: 180,
            defaultTags: extendedParameter.defaultTags
          });

          bufferedMetricsLogger.gauge("price", extendedParameter.price);
        })
        .catch(erro => {
          console.log("parsingError: " + erro);
          parsingError.inc();
        });
    })
  );
};
const fivemin = 300000;
setInterval(main, fivemin);
