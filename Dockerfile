FROM python:3.11-alpine

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV DJANGO_SETTINGS_MODULE=api.settings
ENV DEBUG=False
ENV PORT=8000

WORKDIR /app

# Install system dependencies
RUN apk add --no-cache --virtual .build-deps \
    build-base \
    musl-dev \
    linux-headers \
    gcc \
    python3-dev \
    && apk add --no-cache \
    curl

# Copy requirements first for better caching
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy all application code (including pre-built frontend)
COPY . .

# Run database migrations and collect static files
RUN python manage.py migrate --noinput
RUN python manage.py collectstatic --noinput --clear

# Clean up build dependencies
RUN apk del .build-deps

# Create non-root user for security
RUN addgroup -g 1001 -S django && \
    adduser -S django -u 1001 -G django

# Change ownership of the app directory
RUN chown -R django:django /app

# Switch to non-root user
USER django

EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8000/health/ || exit 1

# Start with gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "4", "--timeout", "120", "--access-logfile", "-", "--error-logfile", "-", "api.wsgi:app"]