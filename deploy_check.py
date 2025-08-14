#!/usr/bin/env python
"""
Script de vérification avant déploiement
"""
import subprocess
import sys
import os

def check_requirements():
    """Vérifier que requirements.txt est valide"""
    print("📦 Vérification de requirements.txt...")
    
    try:
        with open('requirements.txt', 'r') as f:
            requirements = f.read().strip().split('\n')
        
        print(f"✅ {len(requirements)} dépendances trouvées:")
        for req in requirements:
            if req.strip():
                print(f"   - {req}")
        
        return True
    except Exception as e:
        print(f"❌ Erreur requirements.txt: {e}")
        return False

def check_django_config():
    """Vérifier la configuration Django"""
    print("\n🔧 Vérification de la configuration Django...")
    
    try:
        # Test Django check
        result = subprocess.run(['python', 'manage.py', 'check'], 
                              capture_output=True, text=True)
        
        if result.returncode == 0:
            print("✅ Configuration Django OK")
            return True
        else:
            print(f"❌ Erreur Django check: {result.stderr}")
            return False
    except Exception as e:
        print(f"❌ Erreur lors du check Django: {e}")
        return False

def check_database_config():
    """Vérifier la configuration de base de données"""
    print("\n🗄️ Vérification de la configuration de base de données...")
    
    try:
        result = subprocess.run(['python', 'test_database_config.py'], 
                              capture_output=True, text=True)
        
        if result.returncode == 0:
            print("✅ Configuration base de données OK")
            print("   " + result.stdout.split('\n')[0])  # Première ligne
            return True
        else:
            print(f"❌ Erreur base de données: {result.stderr}")
            return False
    except Exception as e:
        print(f"❌ Erreur test base de données: {e}")
        return False

def check_dockerfile():
    """Vérifier le Dockerfile"""
    print("\n🐳 Vérification du Dockerfile...")
    
    try:
        with open('Dockerfile', 'r') as f:
            content = f.read()
        
        # Vérifier que le healthcheck n'utilise plus requests
        if 'import requests' in content:
            print("❌ Le Dockerfile utilise encore 'requests' dans le healthcheck")
            return False
        
        if 'urllib.request' in content:
            print("✅ Healthcheck utilise urllib.request (bibliothèque standard)")
            return True
        else:
            print("⚠️ Pas de healthcheck trouvé")
            return True
            
    except Exception as e:
        print(f"❌ Erreur lecture Dockerfile: {e}")
        return False

def main():
    """Fonction principale"""
    print("🚀 Vérification avant déploiement\n")
    
    checks = [
        check_requirements,
        check_django_config,
        check_database_config,
        check_dockerfile
    ]
    
    all_ok = True
    for check in checks:
        if not check():
            all_ok = False
    
    print("\n" + "="*50)
    if all_ok:
        print("✅ Toutes les vérifications sont OK - Prêt pour le déploiement!")
        sys.exit(0)
    else:
        print("❌ Des problèmes ont été détectés - Corrigez avant déploiement")
        sys.exit(1)

if __name__ == '__main__':
    main()