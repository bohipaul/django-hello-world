@echo off
echo Starting Django Application as Service...

REM Change to application directory
cd /d "%~dp0"

REM Activate virtual environment if it exists
if exist "venv\Scripts\activate.bat" (
    echo Activating virtual environment...
    call venv\Scripts\activate.bat
)

REM Set environment variables
set DJANGO_SETTINGS_MODULE=api.settings

REM Start the Django server with waitress (Windows compatible)
echo Starting server with waitress on port 8000...
waitress-serve --host=127.0.0.1 --port=8000 --threads=4 api.wsgi:app

pause