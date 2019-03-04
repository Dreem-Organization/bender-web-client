FROM dreem/bender-front-builder:latest as builder

WORKDIR /usr/src/app
COPY . .

RUN yarn install
RUN yarn build:docker

FROM dreem/caddy-server:v0.11.0

ENV NPM_CONFIG_LOGLEVEL warn
ENV API_URL="NO_URL_PROVIDED"

VOLUME ["/home/caddy"]
WORKDIR /home/caddy

COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=builder /usr/src/app/build /home/caddy/

ENTRYPOINT ["/sbin/tini", "--"]
CMD sed -i 's/REPLACEMENT_API_URL/'"$API_URL"'/g' /home/caddy/* && caddy -agree --conf /etc/caddy/Caddyfile