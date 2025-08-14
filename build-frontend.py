#!/usr/bin/env python
"""
Script pour construire automatiquement le frontend et l'intégrer dans Django
"""

import os
import subprocess
import sys
from pathlib import Path

def run_command(cmd, cwd=None):
    """Exécuter une commande et afficher la sortie"""
    try:
        result = subprocess.run(
            cmd, 
            cwd=cwd, 
            shell=True, 
            check=True, 
            capture_output=True, 
            text=True
        )
        print(result.stdout)
        return True
    except subprocess.CalledProcessError as e:
        print(f"Erreur lors de l'exécution de: {cmd}")
        print(f"Code de retour: {e.returncode}")
        print(f"Stderr: {e.stderr}")
        return False

def main():
    # Chemin du projet
    project_root = Path(__file__).parent
    frontend_dir = project_root / "frontend"
    static_dir = project_root / "static"
    
    print("🚀 Construction du frontend pour Django...")
    
    # Vérifier que le dossier frontend existe
    if not frontend_dir.exists():
        print("❌ Le dossier frontend n'existe pas!")
        sys.exit(1)
    
    # Installer les dépendances si nécessaire
    print("📦 Vérification des dépendances npm...")
    if not (frontend_dir / "node_modules").exists():
        print("Installation des dépendances npm...")
        if not run_command("npm install", frontend_dir):
            print("❌ Échec de l'installation des dépendances")
            sys.exit(1)
    
    # Construire le frontend
    print("🔨 Construction du frontend...")
    if not run_command("npm run build", frontend_dir):
        print("❌ Échec de la construction du frontend")
        sys.exit(1)
    
    # Vérifier que les fichiers ont été créés
    if not static_dir.exists() or not (static_dir / "index.html").exists():
        print("❌ Les fichiers de construction n'ont pas été créés")
        sys.exit(1)
    
    print("✅ Frontend construit avec succès!")
    print(f"📁 Fichiers créés dans: {static_dir}")
    
    # Lister les fichiers créés
    print("\n📋 Fichiers générés:")
    for file in static_dir.rglob("*"):
        if file.is_file():
            relative_path = file.relative_to(static_dir)
            print(f"  - {relative_path}")
    
    print("\n🎯 Prêt pour Django!")
    print("Vous pouvez maintenant démarrer le serveur Django:")
    print("  python manage.py runserver")

if __name__ == "__main__":
    main()