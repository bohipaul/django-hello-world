# Script PowerShell simple pour démarrer PostgreSQL et Django
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process -Force
pg_ctl -D C:\Users\bohipaul\scoop\apps\postgresql\17.4\data start
python C:\AVSEC\python\django-hello-world\run_server.py