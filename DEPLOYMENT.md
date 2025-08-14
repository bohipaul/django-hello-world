# Deployment Instructions for participant.devci.net

## 🚀 Production Deployment Steps

### 1. Server Setup
Ensure the production server has:
- Python 3.8+
- Django dependencies from `requirements.txt`
- Web server (Nginx/Apache) configured

### 2. Deploy Application Code
```bash
# Upload the entire Django project to the server
# Ensure all files including staticfiles are present
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Run Deployment Script
```bash
python deploy.py
```

### 5. Configure Web Server

#### For Nginx:
```nginx
server {
    listen 443 ssl;
    server_name participant.devci.net;
    
    # SSL configuration
    ssl_certificate /path/to/ssl/certificate.crt;
    ssl_certificate_key /path/to/ssl/private.key;
    
    # Static files
    location /static/ {
        alias /path/to/django/staticfiles/;
        expires 1y;
        add_header Cache-Control "public, immutable";
        
        # Correct MIME types
        location ~* \\.css$ {
            add_header Content-Type text/css;
        }
        location ~* \\.js$ {
            add_header Content-Type application/javascript;
        }
    }
    
    # Django application
    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

#### For Apache:
```apache
<VirtualHost *:443>
    ServerName participant.devci.net
    
    # SSL configuration
    SSLEngine on
    SSLCertificateFile /path/to/ssl/certificate.crt
    SSLCertificateKeyFile /path/to/ssl/private.key
    
    # Static files
    Alias /static/ /path/to/django/staticfiles/
    <Directory /path/to/django/staticfiles/>
        Require all granted
        ExpiresActive On
        ExpiresDefault "access plus 1 year"
        
        # Correct MIME types
        <Files *.css>
            ForceType text/css
        </Files>
        <Files *.js>
            ForceType application/javascript
        </Files>
    </Directory>
    
    # Django application
    ProxyPass /static/ !
    ProxyPass / http://127.0.0.1:8000/
    ProxyPassReverse / http://127.0.0.1:8000/
    ProxyPreserveHost On
</VirtualHost>
```

### 6. Start Django with Production Settings
```bash
# Set environment variable
export DJANGO_SETTINGS_MODULE=api.production_settings

# Start Django (use gunicorn for production)
gunicorn api.wsgi:app --bind 127.0.0.1:8000
```

### 7. Test Deployment
After deployment, test these URLs:
- `https://participant.devci.net/` - Main application
- `https://participant.devci.net/static/vite.svg` - Static file test
- `https://participant.devci.net/static/assets/index.CmE-1LrM.js` - JavaScript file
- `https://participant.devci.net/static/assets/index.ug5QH7_2.css` - CSS file

## 🔧 Troubleshooting

### Static Files 404 Error
If you get 404 errors for static files:

1. **Check static files are collected:**
   ```bash
   python manage.py collectstatic --noinput
   ```

2. **Verify file permissions:**
   ```bash
   chmod -R 755 staticfiles/
   ```

3. **Check web server configuration:**
   - Ensure `/static/` location points to `staticfiles/` directory
   - Verify MIME types are correctly configured

4. **Test with Django development server:**
   ```bash
   DJANGO_SETTINGS_MODULE=api.production_settings python manage.py runserver
   ```

### MIME Type Issues
If CSS/JS files are served with wrong MIME types:
- Check web server MIME type configuration
- Ensure WhiteNoise is properly configured
- Verify file extensions in WHITENOISE_MIMETYPES

## 📁 File Structure
```
/path/to/django/
├── api/
│   ├── settings.py (development)
│   ├── production_settings.py (production)
│   └── ...
├── staticfiles/ (production static files)
├── static/ (source static files)
├── deploy.py (deployment script)
└── manage.py
```

## 🎯 Key Points
- Use `api.production_settings` for production
- Static files are served from `staticfiles/` directory
- WhiteNoise handles static file serving with correct MIME types
- CORS is configured for `https://participant.devci.net`
- All security settings are enabled in production mode