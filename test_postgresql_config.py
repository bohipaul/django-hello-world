#!/usr/bin/env python
"""
Script de test pour vérifier la configuration PostgreSQL
"""
import os
import django
from django.conf import settings

# Configuration de Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'api.settings')
django.setup()

def test_database_config():
    """Test de la configuration de base de données PostgreSQL"""
    
    print("=== Configuration de Base de Données PostgreSQL ===")
    print()
    
    # Vérification des variables d'environnement
    database_url = os.getenv('DATABASE_URL')
    if database_url:
        print("✅ DATABASE_URL configuré")
        print(f"   URL: {database_url[:20]}...")
    else:
        print("❌ DATABASE_URL non configuré")
        print("Variables manuelles:")
        print(f"   DB_NAME: {os.getenv('DB_NAME', 'django_app')}")
        print(f"   DB_USER: {os.getenv('DB_USER', 'postgres')}")
        print(f"   DB_PASSWORD: {'***' if os.getenv('DB_PASSWORD') else 'NON CONFIGURÉ'}")
        print(f"   DB_HOST: {os.getenv('DB_HOST', 'localhost')}")
        print(f"   DB_PORT: {os.getenv('DB_PORT', '5432')}")
    
    print()
    
    # Affichage de la configuration Django
    db_config = settings.DATABASES['default']
    print("Configuration Django DATABASES['default']:")
    print(f"  ENGINE: {db_config['ENGINE']}")
    print(f"  NAME: {db_config.get('NAME', 'N/A')}")
    print(f"  HOST: {db_config.get('HOST', 'N/A')}")
    print(f"  PORT: {db_config.get('PORT', 'N/A')}")
    print(f"  USER: {db_config.get('USER', 'N/A')}")
    print()
    
    # Test de connexion
    from django.db import connection
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT version()")
            result = cursor.fetchone()
            print("✅ Connexion à PostgreSQL: SUCCÈS")
            print(f"   Version: {result[0]}")
            
            # Statistiques de la base
            cursor.execute("SELECT current_database(), current_user")
            db_info = cursor.fetchone()
            print(f"   Base de données: {db_info[0]}")
            print(f"   Utilisateur: {db_info[1]}")
            
    except Exception as e:
        print(f"❌ Erreur de connexion PostgreSQL: {e}")
        print()
        print("=== Instructions de Configuration ===")
        
        if not database_url:
            print("Option 1: Installer PostgreSQL localement")
            print("  brew install postgresql")
            print("  brew services start postgresql")
            print("  createdb django_app")
            print()
            print("Option 2: Utiliser Docker PostgreSQL")
            print("  docker run --name postgres-django \\")
            print("    -e POSTGRES_DB=django_app \\")
            print("    -e POSTGRES_USER=postgres \\")
            print("    -e POSTGRES_PASSWORD=password \\")
            print("    -p 5432:5432 -d postgres:13")
            print()
            print("Puis configurer dans .env:")
            print("  DB_PASSWORD=password")
        else:
            print("Vérifiez que DATABASE_URL est correct et que le serveur PostgreSQL est accessible.")
    
    print()
    print("=== Services PostgreSQL Cloud Recommandés ===")
    print("✅ Supabase (gratuit): https://supabase.com")
    print("✅ Neon (gratuit): https://neon.tech")
    print("✅ Railway (gratuit avec limites): https://railway.app")
    print("✅ ElephantSQL (gratuit avec limites): https://www.elephantsql.com")

if __name__ == '__main__':
    test_database_config()