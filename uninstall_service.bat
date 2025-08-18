@echo off
echo Uninstalling Django Application Service...

REM Check if running as administrator
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo Error: This script must be run as Administrator
    echo Right-click and select "Run as administrator"
    pause
    exit /b 1
)

set SERVICE_NAME=DjangoParticipantService

echo Stopping service: %SERVICE_NAME%
nssm stop %SERVICE_NAME%

echo Removing service: %SERVICE_NAME%
nssm remove %SERVICE_NAME% confirm

if %errorLevel% equ 0 (
    echo Service removed successfully!
) else (
    echo Failed to remove service or service was not installed.
)

pause