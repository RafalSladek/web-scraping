#!/bin/bash
set -ex
npm i -g npm yarn pm2 && \
npm install && \
DEBUG=metrics pm2-runtime index.js