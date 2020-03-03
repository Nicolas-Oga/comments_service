FROM node:12.16.1-alpine3.11

WORKDIR /comments_service

COPY package.json yarn.lock ./
RUN yarn install

COPY . ./
RUN yarn build

CMD sh ./docker-entrypoint.sh ./
