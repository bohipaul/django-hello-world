from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from django.db import IntegrityError
import os

#Utilisation :
  # Mode interactif (demande le mot de passe)
# Utilisation :
# Mode interactif (demande le mot de passe)
# python manage.py create_admin

# Avec paramètres complets
# python manage.py create_admin --username admin --email admin@example.com --password monpassword

# Remplacer un utilisateur existant
# python manage.py create_admin --username admin --password nouveaupass --force

# Fonctionnalités :
# - Création automatique d'un superutilisateur
# - Paramètres personnalisables (nom, email, mot de passe)
# - Mode interactif pour saisir le mot de passe en sécurité
# - Option --force pour remplacer un utilisateur existant
# - Messages d'erreur et de succès en français

class Command(BaseCommand):
    help = 'Créer un utilisateur administrateur'

    def add_arguments(self, parser):
        parser.add_argument(
            '--username',
            type=str,
            default='admin',
            help='Nom d\'utilisateur (défaut: admin)'
        )
        parser.add_argument(
            '--email',
            type=str,
            default='admin@example.com',
            help='Adresse email (défaut: admin@example.com)'
        )
        parser.add_argument(
            '--password',
            type=str,
            help='Mot de passe (si non fourni, sera demandé)'
        )
        parser.add_argument(
            '--force',
            action='store_true',
            help='Remplacer l\'utilisateur s\'il existe déjà'
        )

    def handle(self, *args, **options):
        username = options['username']
        email = options['email']
        password = options['password']
        force = options['force']

        # Vérifier si l'utilisateur existe déjà
        if User.objects.filter(username=username).exists():
            if force:
                User.objects.filter(username=username).delete()
                self.stdout.write(
                    self.style.WARNING(f'Utilisateur existant "{username}" supprimé')
                )
            else:
                self.stdout.write(
                    self.style.ERROR(
                        f'L\'utilisateur "{username}" existe déjà. '
                        'Utilisez --force pour le remplacer.'
                    )
                )
                return

        # Demander le mot de passe si non fourni
        if not password:
            import getpass
            password = getpass.getpass('Mot de passe pour l\'administrateur: ')
            if not password:
                self.stdout.write(
                    self.style.ERROR('Le mot de passe est requis')
                )
                return

        try:
            # Créer l'utilisateur administrateur
            user = User.objects.create_superuser(
                username=username,
                email=email,
                password=password
            )
            
            self.stdout.write(
                self.style.SUCCESS(
                    f'Utilisateur administrateur "{username}" créé avec succès!'
                )
            )
            self.stdout.write(f'Email: {email}')
            self.stdout.write('Vous pouvez maintenant vous connecter à /admin/')
            
        except IntegrityError as e:
            self.stdout.write(
                self.style.ERROR(f'Erreur lors de la création: {e}')
            )
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f'Erreur inattendue: {e}')
            )