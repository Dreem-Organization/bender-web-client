FROM dreem/bender-front-builder:latest as builder

WORKDIR /usr/src/app
COPY . .

RUN yarn install
RUN yarn build:docker

FROM nginx:1.15-alpine

ENV NPM_CONFIG_LOGLEVEL warn
ENV API_URL="NO_URL_PROVIDED"

VOLUME ["/var/www"]
WORKDIR /var/www

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /usr/src/app/build /var/www/
COPY run.sh /

ENTRYPOINT ["/bin/sh"]
CMD ["/run.sh"]
