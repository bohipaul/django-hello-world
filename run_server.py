#!/usr/bin/env python
"""
Script pour démarrer l'application Django avec waitress sur Windows
"""

import os
import sys
from pathlib import Path

# Add the project directory to the Python path
BASE_DIR = Path(__file__).resolve().parent
sys.path.insert(0, str(BASE_DIR))

# Set Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'api.settings')

def main():
    """Démarre le serveur waitress"""
    try:
        from waitress import serve
        from api.wsgi import app
        
        print("Starting Django application with Waitress...")
        print("Server running on http://127.0.0.1:8800")
        print("Press Ctrl+C to stop the server")
        
        # Démarrer le serveur
        serve(
            app,
            host='127.0.0.1',
            port=8800,
            threads=4,
            connection_limit=1000,
            cleanup_interval=30,
            channel_timeout=120
        )
        
    except ImportError:
        print("Error: waitress is not installed.")
        print("Please run: pip install waitress")
        sys.exit(1)
    except KeyboardInterrupt:
        print("\nServer stopped.")
    except Exception as e:
        print(f"Error starting server: {e}")
        sys.exit(1)

if __name__ == '__main__':
    main()