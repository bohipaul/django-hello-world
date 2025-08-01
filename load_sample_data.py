#!/usr/bin/env python
"""Script pour charger des données d'exemple"""
import os
import sys
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'api.settings')
django.setup()

from example.models import Participant

def load_sample_data():
    """Charge des données d'exemple dans la base de données"""
    
    # Supprimer les données existantes
    Participant.objects.all().delete()
    
    # Données d'exemple
    participants_data = [
        {
            'nom': 'Dupont',
            'prenom': 'Jean',
            'email': 'jean.dupont@exemple.com',
            'telephone': '+33 1 23 45 67 89',
            'entreprise': 'TechCorp',
            'poste': 'Développeur Senior',
            'actif': True
        },
        {
            'nom': 'Martin',
            'prenom': 'Marie',
            'email': 'marie.martin@startup.fr',
            'telephone': '+33 6 78 90 12 34',
            'entreprise': 'StartupInnovante',
            'poste': 'Product Manager',
            'actif': True
        },
        {
            'nom': 'Leroy',
            'prenom': 'Pierre',
            'email': 'pierre.leroy@consulting.com',
            'telephone': '+33 1 45 67 89 01',
            'entreprise': 'ConseilTech',
            'poste': 'Consultant',
            'actif': True
        },
        {
            'nom': 'Dubois',
            'prenom': 'Sophie',
            'email': 'sophie.dubois@agency.fr',
            'telephone': '+33 6 12 34 56 78',
            'entreprise': 'DigitalAgency',
            'poste': 'UX Designer',
            'actif': True
        },
        {
            'nom': 'Moreau',
            'prenom': 'Lucas',
            'email': 'lucas.moreau@freelance.dev',
            'telephone': None,
            'entreprise': 'Freelance',
            'poste': 'Développeur Full-Stack',
            'actif': True
        },
        {
            'nom': 'Bernard',
            'prenom': 'Emma',
            'email': 'emma.bernard@bigcorp.com',
            'telephone': '+33 1 98 76 54 32',
            'entreprise': 'BigCorp Industries',
            'poste': 'Chef de Projet',
            'actif': False
        },
        {
            'nom': 'Petit',
            'prenom': 'Thomas',
            'email': 'thomas.petit@tech.io',
            'telephone': '+33 7 11 22 33 44',
            'entreprise': 'TechIO',
            'poste': 'DevOps Engineer',
            'actif': True
        },
        {
            'nom': 'Roux',
            'prenom': 'Claire',
            'email': 'claire.roux@design.studio',
            'telephone': '+33 6 55 44 33 22',
            'entreprise': 'Design Studio',
            'poste': 'Directrice Artistique',
            'actif': True
        }
    ]
    
    # Créer les participants
    participants_created = []
    for data in participants_data:
        participant = Participant.objects.create(**data)
        participants_created.append(participant)
        print(f"✅ Créé: {participant.nom_complet} ({participant.email})")
    
    print(f"\n🎉 {len(participants_created)} participants créés avec succès!")
    print(f"📊 Total participants actifs: {Participant.objects.filter(actif=True).count()}")
    print(f"📊 Total participants inactifs: {Participant.objects.filter(actif=False).count()}")

if __name__ == '__main__':
    load_sample_data()