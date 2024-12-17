FROM php:8.2-apache
RUN a2enmod rewrite
RUN apt-get update && apt-get install -y libpng-dev libjpeg-dev libfreetype6-dev git zip libxml2-dev && \
    docker-php-ext-configure gd --with-freetype --with-jpeg && \
    docker-php-ext-install gd pdo pdo_mysql xml bcmath
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
WORKDIR /var/www/html
COPY . /var/www/html
RUN chown -R www-data:www-data /var/www/html && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache
RUN composer install --no-scripts --no-autoloader
EXPOSE 80
CMD ["apache2-foreground"]