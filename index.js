const metrics = require("datadog-metrics");
const io = require("@pm2/io");
const fgi_config = require("./fgi_config");
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
  parseCryptoFGI();
  //parseGoldCoins();
};

/*
 * parsing api of Fear and Greed Index
 */
const parseCryptoFGI = () => {
  invocation.inc();
  const allParameters = fgi_config.parameters;
  Promise.all(
    allParameters.map(parameter => {
      parser
        .parseApi(parameter)
        .then(p => {
          console.log(p);
          const title = p.name;
          const metricname = "fear_gready";
          p.data.map(d => {
            const metricvalue = d.value;
            const metrictimestamp = d.timestamp;
            const metricclass = d.value_classification;
            sendMetric(
              hostname,
              "index.",
              ["'name:" + title + "'", "'class:" + metricclass + "'"],
              metricname,
              metricvalue,
              [],
              metrictimestamp
            );
          });
        })
        .catch(erro => {
          console.log("parsingError: " + erro);
          parsingError.inc();
        });
    })
  );
};

/*
 * parsing online page of gold coin shops
 */
const parseGoldCoins = () => {
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
          sendMetric(
            hostname,
            "goldcoin.",
            extendedParameter.defaultTags,
            "price",
            extendedParameter.price
          );
        })
        .catch(erro => {
          console.log("parsingError: " + erro);
          parsingError.inc();
        });
    })
  );
};

const sendMetric = (
  hostname,
  prefix,
  tags,
  metricname,
  metricvalue,
  metrictags = [],
  metrictimestamp = Date.now()
) => {
  const bufferedMetricsLogger = new metrics.BufferedMetricsLogger({
    host: hostname,
    prefix: prefix,
    flushIntervalSeconds: 180,
    defaultTags: tags
  });

  bufferedMetricsLogger.gauge(
    metricname,
    metricvalue,
    metrictags,
    metrictimestamp
  );
};
const fivemin = 10000;
setInterval(main, fivemin);
