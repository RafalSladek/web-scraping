# web-scraping

## How to setup
```
yarn install
```

## How to run in terminal
```
DATADOG_API_KEY=<YOUR_API_KEY> DEBUG=metrics node index.js
```

## How to run with docker
```
docker run -d \
    -e DATADOG_API_KEY=${DATADOG_API_KEY} \
    -v $(pwd):/app \
    -w /app \
    --name=web-scraper \
    node:12 \
    yarn install && DEBUG=metrics node index.js
```

## How to run tests
```
yarn test
```