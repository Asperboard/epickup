FROM httpd:alpine3.21
COPY ./html/ /usr/local/apache2/htdocs/
