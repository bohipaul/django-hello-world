@echo off
echo Démarrage de PostgreSQL et de l'application Django...

REM Démarrer PostgreSQL
echo Démarrage de PostgreSQL...
pg_ctl -D C:\Users\bohipaul\scoop\apps\postgresql\17.4\data start

REM Attendre un peu pour que PostgreSQL soit complètement démarré
timeout /t 3 /nobreak >nul

REM Démarrer l'application Django
echo Démarrage de l'application Django...
python C:\AVSEC\python\django-hello-world\run_server.py

pause