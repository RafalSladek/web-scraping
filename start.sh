#!/bin/bash
set -ex
npm i -g npm yarn pm2@latest && \
npm i
pm2 update

pm2 delete all

NODE_ENV=prod  DEBUG=metrics pm2 start index.js \
--name web-scraper \
--watch \
--time \
-f

#--log /var/log/web-scraper.log
