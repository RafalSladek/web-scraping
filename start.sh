#!/bin/bash
set -e
docker run -d \
    -e DATADOG_API_KEY=${DATADOG_API_KEY} \
    -v $(pwd):/app \
    -w /app \
    --name=web-scraper \
    node:12 \
    yarn install && DEBUG=metrics node index.js