FROM php:8.0.3-apache

# Install dependencies
RUN apt-get update && apt-get install -y \
    git \
    libzip-dev \
    zip \
    unzip

# Install PHP extensions
RUN docker-php-ext-install zip

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
