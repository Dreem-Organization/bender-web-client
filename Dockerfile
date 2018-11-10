# This is the builder container
FROM registry.rythm.co/bender-front-builder:745519c as builder

WORKDIR /usr/src/app
COPY . .

RUN yarn install
RUN yarn build

FROM registry.rythm.co/caddy-server:v0.11.0

ENV NPM_CONFIG_LOGLEVEL warn

VOLUME ["/var/www"]
WORKDIR /var/www

COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=builder /usr/src/app/build /var/www/

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["caddy", "-agree", "--conf", "/etc/caddy/Caddyfile"]