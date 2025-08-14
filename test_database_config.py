#!/usr/bin/env python
"""
Script de test pour démontrer la configuration flexible de base de données
"""
import os
import django
from django.conf import settings

# Configuration de Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'api.settings')
django.setup()

def test_database_config():
    """Test de la configuration de base de données actuelle"""
    
    print("=== Configuration de Base de Données ===")
    print(f"DATABASE_TYPE: {os.getenv('DATABASE_TYPE', 'sqlite (défaut)')}")
    print(f"DATABASE_URL: {os.getenv('DATABASE_URL', 'Non défini')}")
    print()
    
    # Affichage de la configuration Django
    db_config = settings.DATABASES['default']
    print("Configuration Django DATABASES['default']:")
    print(f"  ENGINE: {db_config['ENGINE']}")
    print(f"  NAME: {db_config['NAME']}")
    
    if 'USER' in db_config and db_config['USER']:
        print(f"  USER: {db_config['USER']}")
        print(f"  HOST: {db_config['HOST']}")
        print(f"  PORT: {db_config['PORT']}")
    
    print()
    
    # Test de connexion
    from django.db import connection
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
            result = cursor.fetchone()
            print("✅ Connexion à la base de données: SUCCÈS")
            print(f"   Test query result: {result}")
    except Exception as e:
        print(f"❌ Erreur de connexion: {e}")
    
    print()
    print("=== Pour changer de base de données ===")
    print("1. Modifiez la variable DATABASE_TYPE dans .env:")
    print("   - DATABASE_TYPE=sqlite (pour SQLite)")
    print("   - DATABASE_TYPE=postgresql (pour PostgreSQL)")
    print()
    print("2. Pour PostgreSQL, ajoutez aussi:")
    print("   DATABASE_URL=postgresql://user:password@host:port/dbname")
    print("   ou les variables individuelles (DB_NAME, DB_USER, etc.)")

if __name__ == '__main__':
    test_database_config()