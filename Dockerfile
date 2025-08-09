FROM python:3.11-alpine

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV DJANGO_SETTINGS_MODULE=api.settings
ENV PORT=3000

# Build argument for git repository
ARG GIT_REPO=https://github.com/bohipaul/django-hello-world.git

WORKDIR /app

# Install git and build dependencies
RUN apk add --no-cache git build-base postgresql-dev

# Clone the project from git
RUN git clone $GIT_REPO .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Run Django setup
RUN python manage.py migrate --noinput && \
    python manage.py collectstatic --noinput

EXPOSE 3000

# Start with gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:3000", "--workers", "4", "api.wsgi:app"]