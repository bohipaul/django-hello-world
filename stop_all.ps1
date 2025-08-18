#!/usr/bin/env powershell
# Script PowerShell pour arrêter PostgreSQL et l'application Django

Write-Host "Arrêt de PostgreSQL..." -ForegroundColor Yellow

try {
    pg_ctl -D C:\Users\bohipaul\scoop\apps\postgresql\17.4\data stop
    Write-Host "PostgreSQL arrêté avec succès!" -ForegroundColor Green
}
catch {
    Write-Host "Erreur lors de l'arrêt de PostgreSQL: $_" -ForegroundColor Red
}

Write-Host "Terminé." -ForegroundColor Green