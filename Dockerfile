FROM php:8.0.3-apache

# Install dependencies
RUN apt-get update && apt-get install -y \
    git \
    libzip-dev \
    zip \
    unzip

# Install PHP extensions
RUN docker-php-ext-install zip

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy project files
COPY . /var/www/html

# Set working directory
WORKDIR /var/www/html

# Composer install
RUN composer install --no-dev --optimize-autoloader

# Build assets
RUN npm ci && npm run build

# Expose port
EXPOSE 80

# Start Apache
CMD ["apache2-foreground"]
