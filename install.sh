#!/bin/bash
set -ex
CONTAINER_NAME=web-scraper
COUNT_CONTAINERS=$(docker ps -a | grep -c "${CONTAINER_NAME}")

if [ "${COUNT_CONTAINERS}" != 0 ];
then
    echo "deleting ${CONTAINER_NAME} container"
    docker rm ${CONTAINER_NAME}
fi

docker run -d \
    -e DATADOG_API_KEY="${DATADOG_API_KEY}" \
    -e PM2_PUBLIC_KEY="${PM2_PUBLIC_KEY}" \
    -e PM2_SECRET_KEY="${PM2_SECRET_KEY}" \
    -v "$(pwd)":/app \
    -w /app \
    --name=${CONTAINER_NAME} \
    --entrypoint=/app/start.sh \
    node:12