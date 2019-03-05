#!/bin/sh
sed -i 's/REPLACEMENT_API_URL/'"$API_URL"'/g' /var/www/*;
nginx -c /etc/nginx/nginx.conf -g "daemon off;"
