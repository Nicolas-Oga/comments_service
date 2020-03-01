FROM node:12.16.1-alpine3.11

WORKDIR /comments_service

ADD package.json yarn.lock
RUN yarn install

ADD . $WORKDIR
RUN yarn build

CMD sh ./docker-entrypoint.sh
