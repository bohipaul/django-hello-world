#!/usr/bin/env powershell
# Script PowerShell pour démarrer PostgreSQL et l'application Django

# Contourner les restrictions d'exécution PowerShell
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process -Force

Write-Host "Démarrage de PostgreSQL et de l'application Django..." -ForegroundColor Green

# Démarrer PostgreSQL
Write-Host "Démarrage de PostgreSQL..." -ForegroundColor Yellow
try {
    pg_ctl -D C:\Users\bohipaul\scoop\apps\postgresql\17.4\data start
    Write-Host "PostgreSQL démarré avec succès!" -ForegroundColor Green
}
catch {
    Write-Host "Erreur lors du démarrage de PostgreSQL: $_" -ForegroundColor Red
    Write-Host "Vérifiez que PostgreSQL est installé et que le chemin est correct." -ForegroundColor Yellow
    exit 1
}

# Attendre un peu pour que PostgreSQL soit complètement démarré
Start-Sleep -Seconds 3

# Démarrer l'application Django
Write-Host "Démarrage de l'application Django..." -ForegroundColor Yellow
try {
    python C:\AVSEC\python\django-hello-world\run_server.py
}
catch {
    Write-Host "Erreur lors du démarrage de Django: $_" -ForegroundColor Red
    Write-Host "Vérifiez que Python et les dépendances sont installés." -ForegroundColor Yellow
    exit 1
}

Write-Host "Application arrêtée." -ForegroundColor Yellow