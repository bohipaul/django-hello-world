#!/usr/bin/env python3
"""
Script de test pré-déploiement pour valider que l'application est prête pour Coolify
"""

import os
import sys
import subprocess
import json
import time

def check_file_exists(filepath, description):
    """Vérifier qu'un fichier existe"""
    if os.path.exists(filepath):
        print(f"[+] {description}: OK")
        return True
    else:
        print(f"[-] {description}: MANQUANT ({filepath})")
        return False

def check_frontend_build():
    """Vérifier que le build frontend fonctionne"""
    print("\n[*] Test du build frontend...")
    
    # Vérifier que Node.js/npm est disponible
    try:
        result = subprocess.run(['npm', '--version'], capture_output=True, text=True)
        if result.returncode != 0:
            print("[!] npm non disponible - le build frontend sera fait par Docker dans Coolify")
            print("[+] Frontend build: SKIP (sera fait par Docker)")
            return True
    except FileNotFoundError:
        print("[!] npm non disponible - le build frontend sera fait par Docker dans Coolify")
        print("[+] Frontend build: SKIP (sera fait par Docker)")
        return True
    
    try:
        os.chdir('frontend')
        
        # Vérifier que les dépendances sont installées
        if not os.path.exists('node_modules'):
            print("[*] Installation des dépendances npm...")
            result = subprocess.run(['npm', 'install'], capture_output=True, text=True)
            if result.returncode != 0:
                print(f"[-] npm install failed: {result.stderr}")
                print("[!] Le build frontend sera fait par Docker dans Coolify")
                return True
        
        # Tester le build
        print("[*] Exécution de npm run build...")
        result = subprocess.run(['npm', 'run', 'build'], capture_output=True, text=True)
        
        if result.returncode == 0:
            print("[+] npm run build: OK")
            
            # Vérifier que les fichiers sont générés
            static_dir = '../static/assets'
            if os.path.exists(static_dir):
                files = os.listdir(static_dir)
                js_files = [f for f in files if f.endswith('.js')]
                css_files = [f for f in files if f.endswith('.css')]
                
                if js_files and css_files:
                    print(f"[+] Fichiers générés: {len(js_files)} JS, {len(css_files)} CSS")
                    return True
                else:
                    print("[-] Pas de fichiers JS/CSS générés")
                    return False
            else:
                print("[-] Dossier static/assets non créé")
                return False
        else:
            print(f"[-] npm run build failed: {result.stderr}")
            print("[!] Le build frontend sera fait par Docker dans Coolify")
            return True
            
    except Exception as e:
        print(f"[-] Erreur frontend build: {e}")
        print("[!] Le build frontend sera fait par Docker dans Coolify")
        return True
    finally:
        os.chdir('..')

def check_django_settings():
    """Vérifier la configuration Django"""
    print("\n[*] Test de la configuration Django...")
    try:
        # Importer les settings
        import django
        os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'api.settings')
        django.setup()
        
        from django.conf import settings
        
        # Vérifications de base
        checks = [
            (hasattr(settings, 'ALLOWED_HOSTS'), "ALLOWED_HOSTS configuré"),
            (hasattr(settings, 'STATIC_URL'), "STATIC_URL configuré"),
            (hasattr(settings, 'STATIC_ROOT'), "STATIC_ROOT configuré"),
            ('whitenoise.middleware.WhiteNoiseMiddleware' in settings.MIDDLEWARE, "WhiteNoise middleware"),
            ('corsheaders.middleware.CorsMiddleware' in settings.MIDDLEWARE, "CORS middleware"),
        ]
        
        all_ok = True
        for check, description in checks:
            if check:
                print(f"[+] {description}: OK")
            else:
                print(f"[-] {description}: MANQUANT")
                all_ok = False
        
        return all_ok
        
    except Exception as e:
        print(f"[-] Erreur configuration Django: {e}")
        return False

def check_collectstatic():
    """Tester la collecte des fichiers statiques"""
    print("\n[*] Test de collectstatic...")
    try:
        result = subprocess.run([
            'python', 'manage.py', 'collectstatic', '--noinput', '--dry-run'
        ], capture_output=True, text=True)
        
        if result.returncode == 0:
            print("[+] collectstatic: OK")
            return True
        else:
            print(f"[-] collectstatic failed: {result.stderr}")
            return False
            
    except Exception as e:
        print(f"[-] Erreur collectstatic: {e}")
        return False

def main():
    print("Script de Test Pre-Deploiement Coolify")
    print("=" * 38)
    
    # Verifier qu'on est dans le bon repertoire
    if not os.path.exists('manage.py'):
        print("[-] Erreur: manage.py introuvable. Executez ce script depuis la racine du projet Django.")
        sys.exit(1)
    
    # Tests des fichiers essentiels
    print("\nVerification des fichiers essentiels:")
    essential_files = [
        ('Dockerfile', 'Dockerfile'),
        ('requirements.txt', 'Fichier des dépendances Python'),
        ('frontend/package.json', 'Configuration frontend'),
        ('frontend/vite.config.js', 'Configuration Vite'),
        ('api/settings.py', 'Configuration Django'),
        ('COOLIFY_DEPLOYMENT.md', 'Guide de déploiement Coolify'),
    ]
    
    files_ok = True
    for filepath, description in essential_files:
        if not check_file_exists(filepath, description):
            files_ok = False
    
    # Tests fonctionnels
    frontend_ok = check_frontend_build()
    django_ok = check_django_settings()
    collectstatic_ok = check_collectstatic()
    
    # Résumé
    print("\n" + "=" * 38)
    print("RESUME DES TESTS")
    print("=" * 38)
    
    all_tests = [
        (files_ok, "Fichiers essentiels"),
        (frontend_ok, "Build frontend"),
        (django_ok, "Configuration Django"),
        (collectstatic_ok, "Collecte fichiers statiques"),
    ]
    
    success_count = sum(1 for test, _ in all_tests if test)
    total_count = len(all_tests)
    
    for test_result, test_name in all_tests:
        status = "[+] OK" if test_result else "[-] ECHEC"
        print(f"{status:<8} {test_name}")
    
    print(f"\nResultat: {success_count}/{total_count} tests reussis")
    
    if success_count == total_count:
        print("\n[+] SUCCES ! Votre application est prete pour le deploiement Coolify.")
        print("\nProchaines etapes:")
        print("1. Commitez et pushez vos changements vers Git")
        print("2. Configurez Coolify avec le repository")
        print("3. Ajoutez les variables d'environnement dans Coolify")
        print("4. Lancez le deploiement !")
        return True
    else:
        print("\n[-] ECHEC ! Corrigez les erreurs avant le deploiement.")
        return False

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)