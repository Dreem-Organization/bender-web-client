FROM node:8.12
ENV NPM_CONFIG_LOGLEVEL warn

ADD . /app
WORKDIR /app
RUN yarn install
RUN yarn build

CMD [ "yarn", "start:prod" ]