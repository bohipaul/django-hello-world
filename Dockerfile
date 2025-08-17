FROM python:3.11-alpine

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV DJANGO_SETTINGS_MODULE=api.settings
ENV DEBUG=False
ENV PORT=3000

WORKDIR /app

# Install system dependencies
RUN apk add --no-cache --virtual .build-deps \
    gcc \
    musl-dev \
    postgresql-dev \
    && apk add --no-cache \
    postgresql-libs \
    curl

# Copy requirements first for better caching
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Clean up build dependencies
RUN apk del .build-deps

# Create non-root user for security
RUN addgroup -g 1001 -S django && \
    adduser -S django -u 1001 -G django

# Copy all application code
COPY . .

# Create startup script
RUN echo '#!/bin/sh' > /app/start.sh && \
    echo 'set -e' >> /app/start.sh && \
    echo 'echo "Running database migrations..."' >> /app/start.sh && \
    echo 'python manage.py migrate --noinput' >> /app/start.sh && \
    echo 'echo "Creating superuser if needed..."' >> /app/start.sh && \
    echo 'python manage.py create_admin --username admin --email admin@example.com --password admin || true' >> /app/start.sh && \
    echo 'echo "Starting gunicorn..."' >> /app/start.sh && \
    echo 'exec gunicorn --bind 0.0.0.0:3000 --workers 4 --timeout 120 --access-logfile - --error-logfile - api.wsgi:app' >> /app/start.sh && \
    chmod +x /app/start.sh

# Collect static files (migrations seront exécutées au runtime)
RUN python manage.py collectstatic --noinput --clear

# Change ownership of all files to django user
RUN chown -R django:django /app

# Switch to non-root user
USER django

EXPOSE 3000

# Start with custom script
CMD ["/app/start.sh"]