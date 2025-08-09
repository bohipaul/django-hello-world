FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV DJANGO_SETTINGS_MODULE=api.settings
ENV PORT=3000

WORKDIR /app

# Install system dependencies
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        build-essential \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY . .

# Create staticfiles directory
RUN mkdir -p /app/staticfiles

# Run Django migrations and collect static files
RUN python manage.py migrate --noinput
RUN python manage.py collectstatic --noinput

EXPOSE $PORT

# Use gunicorn with dynamic port
CMD gunicorn --bind 0.0.0.0:$PORT --workers 4 api.wsgi:app