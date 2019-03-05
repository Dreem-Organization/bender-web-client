#!/bin/sh
sed -i 's/REPLACEMENT_API_URL/'"$API_URL"'/g' /var/www/*;
exec nginx -c /etc/nginx/nginx.conf -g "daemon off;"
