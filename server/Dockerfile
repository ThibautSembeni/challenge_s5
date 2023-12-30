#<<<<<<<<<<Start: PHP-FPM Image Target>>>>>>>>>>#
FROM php:8.2-fpm-alpine as php

RUN apk update \
    && apk --no-cache add curl pcre-dev ${PHPIZE_DEPS} rabbitmq-c-dev yaml-dev libpq-dev libzip-dev zip \
    && apk add --update linux-headers \
    && apk add --no-cache --virtual .build-deps g++ make autoconf \
    && pecl channel-update pecl.php.net \
    && pecl install amqp yaml xdebug \
    && docker-php-ext-enable amqp yaml xdebug \
    && docker-php-ext-install pdo pdo_pgsql zip \
    && docker-php-ext-enable pdo_pgsql \
    && apk upgrade --update \
    && apk add -U tzdata \
    && cp /usr/share/zoneinfo/Europe/Paris /etc/localtime \
    && apk del tzdata \
    && rm -rf /var/cache/apk/*

# Installing Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /srv/app/

COPY ./.docker/php/conf.d/custom.ini /usr/local/etc/php/conf.d/custom.ini
COPY ./composer.json ./composer.lock* /srv/app/
COPY ./symfony.lock /srv/app/

RUN composer install --no-dev --no-scripts \
    && APP_ENV=prod composer run auto-scripts

COPY . /srv/app/

#<<<<<<<<<<End: PHP-FPM Image Target>>>>>>>>>>#

#<<<<<<<<<<Start: PHP-FPM Image For the Dev Environment Target>>>>>>>>>>#
FROM php as php_dev

#<<<<<<<<<<End: PHP-FPM Image For the Dev Environment Target>>>>>>>>>>#

#<<<<<<<<<<Start: Server Image Target>>>>>>>>>>#
FROM httpd:2 as server

COPY ./.docker/httpd/httpd.conf /usr/local/apache2/conf/httpd.conf
COPY --from=php /srv/app/public /srv/app/public
#<<<<<<<<<<End: Server Image Target>>>>>>>>>>#