ARG BUILD_MODE=build
FROM dreem/bender-front-builder:latest as builder
ARG BUILD_MODE

WORKDIR /usr/src/app
COPY . .

RUN yarn install
RUN yarn $BUILD_MODE

FROM nginx:1.15-alpine

ENV NPM_CONFIG_LOGLEVEL warn

VOLUME ["/var/www"]
WORKDIR /var/www

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /usr/src/app/build /var/www/

ENTRYPOINT ["nginx", "-c", "/etc/nginx/nginx.conf", "-g", "daemon off;"]
