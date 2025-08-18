@echo off
echo Starting Django Application (Simple Mode)...

REM Change to application directory
cd /d "%~dp0"

REM Activate virtual environment if it exists
if exist "venv\Scripts\activate.bat" (
    echo Activating virtual environment...
    call venv\Scripts\activate.bat
)

REM Set environment variables
set DJANGO_SETTINGS_MODULE=api.settings

REM Start with Python script
echo Starting server on http://127.0.0.1:8000
echo Press Ctrl+C to stop...
python run_server.py

pause