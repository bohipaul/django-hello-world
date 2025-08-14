#!/usr/bin/env python
"""
Script de test pour vérifier la configuration SQLite simplifiée
"""
import os
import django
from django.conf import settings

# Configuration de Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'api.settings')
django.setup()

def test_database_config():
    """Test de la configuration de base de données SQLite"""
    
    print("=== Configuration de Base de Données SQLite ===")
    print("✨ Configuration simplifiée - Aucune variable d'environnement requise")
    print()
    
    # Affichage de la configuration Django
    db_config = settings.DATABASES['default']
    print("Configuration Django DATABASES['default']:")
    print(f"  ENGINE: {db_config['ENGINE']}")
    print(f"  NAME: {db_config['NAME']}")
    print()
    
    # Test de connexion
    from django.db import connection
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
            result = cursor.fetchone()
            print("✅ Connexion à la base de données: SUCCÈS")
            print(f"   Test query result: {result}")
            
            # Info sur le fichier SQLite
            db_path = db_config['NAME']
            if os.path.exists(db_path):
                size = os.path.getsize(db_path)
                print(f"   Fichier SQLite: {db_path}")
                print(f"   Taille: {size} bytes")
            else:
                print(f"   Fichier SQLite sera créé: {db_path}")
                
    except Exception as e:
        print(f"❌ Erreur de connexion: {e}")
    
    print()
    print("=== Avantages de SQLite ===")
    print("✅ Aucune configuration requise")
    print("✅ Aucune dépendance externe")
    print("✅ Parfait pour développement et production simple")
    print("✅ Sauvegarde facile (un seul fichier)")
    print("✅ Déploiement simplifié")

if __name__ == '__main__':
    test_database_config()