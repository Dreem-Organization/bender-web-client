ARG BUILD_MODE=build
FROM dreem/bender-front-builder:latest as builder

WORKDIR /usr/src/app
COPY . .

RUN yarn install
RUN yarn $BUILD_MODE

FROM dreem/caddy-server:v0.11.0

ENV NPM_CONFIG_LOGLEVEL warn

VOLUME ["/var/www"]
WORKDIR /var/www

COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=builder /usr/src/app/build /var/www/

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["caddy", "-agree", "--conf", "/etc/caddy/Caddyfile"]