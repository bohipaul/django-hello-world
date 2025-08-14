#!/usr/bin/env python3
"""
Script de build frontend pour préparer le déploiement
À exécuter avant chaque commit/déploiement
"""

import os
import sys
import subprocess
import shutil

def run_command(command, description, cwd=None):
    """Exécuter une commande et afficher le résultat"""
    print(f"\n[*] {description}...")
    try:
        result = subprocess.run(
            command, 
            shell=True, 
            capture_output=True, 
            text=True,
            cwd=cwd
        )
        if result.returncode == 0:
            print(f"[+] {description} - Succes")
            if result.stdout.strip():
                print(f"    {result.stdout.strip()}")
            return True
        else:
            print(f"[-] {description} - Echec")
            if result.stderr.strip():
                print(f"    Erreur: {result.stderr.strip()}")
            return False
    except Exception as e:
        print(f"[-] {description} - Exception: {e}")
        return False

def check_prerequisites():
    """Vérifier les prérequis"""
    print("Vérification des prérequis...")
    
    # Vérifier que nous sommes dans le bon répertoire
    if not os.path.exists('manage.py'):
        print("[-] Erreur: manage.py introuvable. Exécutez ce script depuis la racine du projet Django.")
        return False
    
    if not os.path.exists('frontend'):
        print("[-] Erreur: Dossier frontend introuvable.")
        return False
        
    # Vérifier que Node.js/npm est disponible
    if not run_command('npm --version', 'Vérification npm'):
        print("[-] npm n'est pas installé. Installez Node.js d'abord.")
        return False
        
    return True

def clean_previous_build():
    """Nettoyer les builds précédents"""
    print("\n[*] Nettoyage des builds precedents...")
    
    paths_to_clean = [
        'static/assets',
        'staticfiles',
        'frontend/dist'
    ]
    
    for path in paths_to_clean:
        if os.path.exists(path):
            try:
                shutil.rmtree(path)
                print(f"[+] Supprime: {path}")
            except Exception as e:
                print(f"[!] Impossible de supprimer {path}: {e}")
                
    return True  # Toujours retourner True car le nettoyage est optionnel

def build_frontend():
    """Builder le frontend"""
    print("\n[*] Build du frontend...")
    
    # Aller dans le dossier frontend
    if not os.path.exists('frontend/node_modules'):
        print("[*] Installation des dépendances npm...")
        if not run_command('npm install', 'Installation npm', cwd='frontend'):
            return False
    
    # Builder le frontend
    if not run_command('npm run build', 'Build Vite', cwd='frontend'):
        return False
        
    # Vérifier que les fichiers ont été générés
    static_assets = 'static/assets'
    if os.path.exists(static_assets):
        files = os.listdir(static_assets)
        js_files = [f for f in files if f.endswith('.js')]
        css_files = [f for f in files if f.endswith('.css')]
        
        print(f"[+] Fichiers générés: {len(js_files)} JS, {len(css_files)} CSS")
        
        # Afficher les noms des fichiers principaux
        for js_file in js_files:
            if 'index.' in js_file:
                print(f"    JS: {js_file}")
        for css_file in css_files:
            if 'index.' in css_file:
                print(f"    CSS: {css_file}")
        
        return True
    else:
        print("[-] Aucun fichier généré dans static/assets")
        return False

def collect_static():
    """Collecter les fichiers statiques Django"""
    print("\n[*] Collection des fichiers statiques Django...")
    return run_command(
        'python manage.py collectstatic --noinput', 
        'Collectstatic Django'
    )

def verify_build():
    """Vérifier que le build est correct"""
    print("\n[*] Vérification du build...")
    
    required_files = [
        'static/index.html',
        'staticfiles/index.html'
    ]
    
    # Vérifier les fichiers requis
    missing_files = []
    for file_path in required_files:
        if not os.path.exists(file_path):
            missing_files.append(file_path)
    
    if missing_files:
        print("[-] Fichiers manquants:")
        for missing in missing_files:
            print(f"    - {missing}")
        return False
    
    # Vérifier qu'il y a des assets
    if os.path.exists('staticfiles/assets'):
        assets = os.listdir('staticfiles/assets')
        if assets:
            print(f"[+] {len(assets)} fichiers assets dans staticfiles")
            return True
        else:
            print("[-] Aucun fichier asset dans staticfiles")
            return False
    else:
        print("[-] Dossier staticfiles/assets manquant")
        return False

def main():
    print("Build Frontend pour Deploiement Coolify")
    print("=" * 40)
    
    # Vérifications préalables
    if not check_prerequisites():
        sys.exit(1)
    
    # Étapes de build
    steps = [
        (clean_previous_build, "Nettoyage"),
        (build_frontend, "Build Frontend"),
        (collect_static, "Collection Static"),
        (verify_build, "Vérification")
    ]
    
    for step_func, step_name in steps:
        try:
            if not step_func():
                print(f"\n[-] Echec a l'etape: {step_name}")
                sys.exit(1)
        except Exception as e:
            print(f"\n[-] Erreur a l'etape {step_name}: {e}")
            sys.exit(1)
    
    print("\n" + "=" * 40)
    print("[+] Build termine avec succes !")
    print("\nFichiers prets pour le deploiement Coolify :")
    print("- Frontend compile dans static/")
    print("- Fichiers statiques collectes dans staticfiles/")
    print("\nProchaines etapes :")
    print("1. git add .")
    print("2. git commit -m 'Update frontend build'")
    print("3. git push")
    print("4. Deployer sur Coolify")

if __name__ == "__main__":
    main()