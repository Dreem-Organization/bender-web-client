FROM node:8.12
MAINTAINER Dylan Heirstraeten <dylan@dreem.com>
ENV NPM_CONFIG_LOGLEVEL warn

EXPOSE 8000
ADD . /app
WORKDIR /app
RUN yarn install
RUN yarn build

CMD [ "yarn", "start:prod" ]
