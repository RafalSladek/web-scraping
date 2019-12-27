#!/bin/bash

docker run -d \
    -e DATADOG_API_KEY=${DATADOG_API_KEY} \
    -v $(PWD):/app \
    -w /app \
    --name=web-scraper \
    node:12 \
    yarn install && node index.js


docker ps -a