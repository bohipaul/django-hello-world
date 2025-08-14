"""
Production settings for Django application
Override settings.py with production-specific configurations
"""
from .settings import *

# Production security settings
DEBUG = False
ALLOWED_HOSTS = ['participant.devci.net']

# CORS configuration for production
CORS_ALLOWED_ORIGINS = [
    "https://participant.devci.net",
]
CORS_ALLOW_ALL_ORIGINS = False

# Static files configuration for production
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# Force WhiteNoise to be enabled in production
MIDDLEWARE.insert(1, 'whitenoise.middleware.WhiteNoiseMiddleware')
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# WhiteNoise configuration
WHITENOISE_USE_FINDERS = False  # Use collected static files only
WHITENOISE_AUTOREFRESH = False
WHITENOISE_STATIC_PREFIX = '/static/'

# Security settings for production
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = 'DENY'

# Additional MIME types for static files
WHITENOISE_MIMETYPES = {
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.svg': 'image/svg+xml',
    '.html': 'text/html',
}

print("🚀 Production settings loaded")
print(f"📁 STATIC_ROOT: {STATIC_ROOT}")
print(f"🌐 ALLOWED_HOSTS: {ALLOWED_HOSTS}")