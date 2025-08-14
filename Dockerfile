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
    build-base \
    postgresql-dev \
    musl-dev \
    linux-headers \
    gcc \
    python3-dev \
    && apk add --no-cache \
    postgresql-libs

# Copy requirements first for better caching
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy all application code (including pre-built frontend)
COPY . .

# Collect static files (assumes frontend is already built)
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

EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD python -c "import requests; requests.get('http://localhost:3000/api/participants/', timeout=10)"

# Start with gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:3000", "--workers", "4", "--timeout", "120", "--access-logfile", "-", "--error-logfile", "-", "api.wsgi:app"]