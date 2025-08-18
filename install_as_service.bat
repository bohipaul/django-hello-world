@echo off
echo Installing Django Application as Windows Service...

REM Check if running as administrator
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo Error: This script must be run as Administrator
    echo Right-click and select "Run as administrator"
    pause
    exit /b 1
)

REM Variables
set SERVICE_NAME=DjangoParticipantService
set DISPLAY_NAME=Django Participant Application
set DESCRIPTION=Django application for participant management
set CURRENT_DIR=%~dp0
set PYTHON_EXE=python.exe
set WAITRESS_CMD=waitress-serve --host=127.0.0.1 --port=8000 --threads=4 api.wsgi:app

REM Check if NSSM is available
nssm version >nul 2>&1
if %errorLevel% neq 0 (
    echo NSSM is not installed or not in PATH
    echo Please download NSSM from https://nssm.cc/download
    echo Extract nssm.exe to a folder in your PATH or to this directory
    pause
    exit /b 1
)

REM Stop and remove existing service if it exists
nssm stop %SERVICE_NAME% >nul 2>&1
nssm remove %SERVICE_NAME% confirm >nul 2>&1

echo Installing service: %SERVICE_NAME%

REM Install the service
nssm install %SERVICE_NAME% cmd.exe
nssm set %SERVICE_NAME% AppParameters /c "cd /d \"%CURRENT_DIR%\" && if exist venv\Scripts\activate.bat call venv\Scripts\activate.bat && %WAITRESS_CMD%"
nssm set %SERVICE_NAME% DisplayName "%DISPLAY_NAME%"
nssm set %SERVICE_NAME% Description "%DESCRIPTION%"
nssm set %SERVICE_NAME% Start SERVICE_AUTO_START
nssm set %SERVICE_NAME% AppStdout "%CURRENT_DIR%service.log"
nssm set %SERVICE_NAME% AppStderr "%CURRENT_DIR%service_error.log"
nssm set %SERVICE_NAME% AppDirectory "%CURRENT_DIR%"

REM Set environment variables for the service
nssm set %SERVICE_NAME% AppEnvironmentExtra "DJANGO_SETTINGS_MODULE=api.settings"

echo Service installed successfully!
echo.
echo To start the service: nssm start %SERVICE_NAME%
echo To stop the service: nssm stop %SERVICE_NAME%
echo To remove the service: nssm remove %SERVICE_NAME% confirm
echo.
echo Starting service now...
nssm start %SERVICE_NAME%

if %errorLevel% equ 0 (
    echo Service started successfully!
    echo Your Django application should be available at http://127.0.0.1:8000
) else (
    echo Failed to start service. Check service.log and service_error.log for details.
)

pause