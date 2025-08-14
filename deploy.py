#!/usr/bin/env python3
"""
Deployment script for Django application
Run this script on the production server to ensure proper setup
"""

import os
import sys
import subprocess

def run_command(command, description):
    """Run a command and print the result"""
    print(f"\n[*] {description}...")
    try:
        result = subprocess.run(command, shell=True, capture_output=True, text=True)
        if result.returncode == 0:
            print(f"[+] {description} - Success")
            if result.stdout:
                print(f"Output: {result.stdout.strip()}")
        else:
            print(f"[-] {description} - Failed")
            print(f"Error: {result.stderr.strip()}")
            return False
    except Exception as e:
        print(f"[-] {description} - Exception: {e}")
        return False
    return True

def main():
    print("Django Production Deployment Script")
    print("===================================")
    
    # Check if we're in the right directory
    if not os.path.exists('manage.py'):
        print("[-] Error: manage.py not found. Please run this script from the Django project root.")
        sys.exit(1)
    
    # Run deployment commands
    commands = [
        ("python manage.py collectstatic --noinput", "Collecting static files"),
        ("python manage.py migrate", "Running database migrations"),
        ("python manage.py check --deploy", "Running deployment checks"),
    ]
    
    success = True
    for command, description in commands:
        if not run_command(command, description):
            success = False
    
    if success:
        print("\n[+] Deployment completed successfully!")
        print("\nManual steps for production server:")
        print("1. Ensure the web server serves static files from 'staticfiles' directory")
        print("2. Configure the web server to serve /static/ URL from STATIC_ROOT")
        print("3. Restart the Django application server")
        print("4. Test static file access: https://participant.devci.net/static/vite.svg")
        print("5. Use production settings: DJANGO_SETTINGS_MODULE=api.production_settings")
    else:
        print("\n[-] Deployment failed. Please check the errors above.")
        sys.exit(1)

if __name__ == "__main__":
    main()