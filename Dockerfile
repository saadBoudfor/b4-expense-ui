FROM nginx:1.17.1-alpine
COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY dist/b4-expenses-ui /usr/share/nginx/html
