# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Running the Development Server
```bash
python manage.py runserver
```
The application will be available at `http://localhost:8000`.

### Django Management Commands
Use the standard Django management interface:
```bash
python manage.py <command>
```

Common commands include:
- `python manage.py migrate` - Apply database migrations
- `python manage.py makemigrations` - Create new database migrations
- `python manage.py createsuperuser` - Create admin user
- `python manage.py collectstatic` - Collect static files

## Architecture Overview

This is a Django 4.1.3 application configured for deployment on Vercel using serverless functions. The project follows an unconventional structure optimized for Vercel deployment:

### Project Structure
- `api/` - Contains the Django project configuration (equivalent to typical Django project root)
  - `settings.py` - Main Django settings, configured for Vercel deployment
  - `urls.py` - Root URL configuration
  - `wsgi.py` - WSGI application entry point with custom `app` variable for Vercel
- `example/` - Django application containing the main functionality
  - `views.py` - Contains a simple view that displays current time
  - `urls.py` - Application-specific URL patterns
- `manage.py` - Django management script pointing to `api.settings`
- `vercel.json` - Vercel deployment configuration routing all requests to `api/wsgi.py`

### Key Configuration Details

**WSGI Configuration**: The WSGI application uses a custom variable name `app` instead of the standard `application` to comply with Vercel's serverless function requirements (api/wsgi.py:16).

**Settings Configuration**: 
- Uses `api.settings` as the settings module (manage.py:9)
- Configured for Vercel deployment with allowed hosts including `.vercel.app` domains (api/settings.py:28)
- Database configuration is empty as databases are not supported in Vercel's serverless environment (api/settings.py:79)

**URL Routing**: The root URLs in `api/urls.py` include the `example` app URLs at the root path, making the main application accessible at the domain root.

## Deployment

This application is configured for Vercel deployment. The `vercel.json` configuration routes all requests to the WSGI application at `api/wsgi.py`.

## Dependencies

- Django 4.1.3 (specified in requirements.txt)
- No database dependencies (configured for serverless deployment)