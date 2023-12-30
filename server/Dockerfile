FROM php:8.2-fpm-alpine as php

RUN apk update \
    && apk --no-cache add "curl=8.4.0-r0" "pcre-dev=8.45-r3" "${PHPIZE_DEPS}" "rabbitmq-c-dev=0.13.0-r1" "yaml-dev=0.2.5-r1" "libpq-dev=15.4-r0" "libzip-dev=1.9.2-r2" "zip=3.0-r12" \
    && apk add --no-cache --virtual .build-deps "g++-12.2.1_git20220924-r10" "make=4.4.1-r1" "autoconf=2.71-r2" \
    && pecl channel-update pecl.php.net \
    && pecl install amqp yaml xdebug \
    && docker-php-ext-enable amqp yaml xdebug \
    && docker-php-ext-install pdo pdo_pgsql zip \
    && docker-php-ext-enable pdo_pgsql \
    && apk upgrade --no-cache \
    && apk add --no-cache -U "tzdata=2023d-r0" \
    && cp /usr/share/zoneinfo/Europe/Paris /etc/localtime \
    && apk del tzdata

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /srv/app/

COPY ./.docker/php/conf.d/custom.ini /usr/local/etc/php/conf.d/custom.ini
COPY ./composer.json ./composer.lock* /srv/app/
COPY ./symfony.lock /srv/app/

RUN composer install --no-dev --no-scripts \
    && APP_ENV=prod composer run auto-scripts

COPY . /srv/app/

FROM php as php_dev

FROM httpd:2 as server

COPY ./.docker/httpd/httpd.conf /usr/local/apache2/conf/httpd.conf
COPY --from=php /srv/app/public /srv/app/public