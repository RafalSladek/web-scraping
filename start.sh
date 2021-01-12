#!/bin/bash
set -ex
npm i -g npm yarn pm2 && \
npm audit fix && npm i

pm2 update

DEBUG=metrics pm2 start index.js \
--name web-scraper \
--watch \
--time

#--log /var/log/web-scraper.log
