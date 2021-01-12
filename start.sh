#!/bin/bash
set -ex
npm i -g npm yarn pm2 && \
npm i
pm2 update

pm2 delete all

NODE_ENV=prod  DEBUG=metrics pm2 start index.js \
--name web-scraper \
--watch \
--time \
--no-daemon \
-f

#--log /var/log/web-scraper.log
