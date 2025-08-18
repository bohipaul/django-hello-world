# Configuration de l'Application Django comme Service Windows

## Prérequis

1. **NSSM (Non-Sucking Service Manager)** (pour service automatique)
   - Télécharger depuis : https://nssm.cc/download
   - Extraire `nssm.exe` dans le dossier du projet ou dans le PATH système
   - NSSM permet de créer facilement des services Windows

2. **Python et dépendances installées**
   - Environnement virtuel Python configuré (optionnel mais recommandé)
   - Tous les packages du requirements.txt installés
   - **waitress** installé (serveur WSGI compatible Windows)

## Installation comme Service

### Méthode 1 : Installation automatique avec NSSM

1. **Télécharger NSSM**
   - Aller sur https://nssm.cc/download
   - Télécharger la version appropriée (32 ou 64-bit)
   - Extraire `nssm.exe` dans ce dossier

2. **Installer le service**
   ```cmd
   # Clic droit sur install_as_service.bat -> "Exécuter en tant qu'administrateur"
   install_as_service.bat
   ```

3. **Vérifier l'installation**
   - Le service "Django Participant Application" apparaîtra dans `services.msc`
   - L'application sera accessible sur http://127.0.0.1:8000

### Méthode 2 : Démarrage manuel

Si vous préférez ne pas installer de service système :

```cmd
# Option 1: Script batch avec waitress
start_service.bat

# Option 2: Script Python simple
start_simple.bat

# Option 3: Commande directe
python run_server.py
```

## Gestion du Service

### Commandes de gestion
```cmd
# Démarrer le service
nssm start DjangoParticipantService

# Arrêter le service
nssm stop DjangoParticipantService

# Redémarrer le service
nssm restart DjangoParticipantService

# Voir le statut
nssm status DjangoParticipantService
```

### Désinstallation
```cmd
# Clic droit sur uninstall_service.bat -> "Exécuter en tant qu'administrateur"
uninstall_service.bat
```

## Configuration

### Ports et accès
- **Port par défaut** : 8000
- **Adresse locale** : http://127.0.0.1:8000
- **Workers** : 4 (configurable dans les scripts)

### Logs
- **Logs normaux** : `service.log`
- **Logs d'erreurs** : `service_error.log`

### Variables d'environnement
Le service utilise les variables définies dans `.env` :
- `DEBUG=True` pour le développement local
- `ALLOWED_HOSTS` inclut localhost et 127.0.0.1
- Base de données PostgreSQL configurée

## Dépannage

### Le service ne démarre pas
1. Vérifier les logs : `service_error.log`
2. Vérifier que PostgreSQL est disponible
3. Vérifier que tous les packages sont installés
4. Tester manuellement avec `start_service.bat`

### Erreur de permissions
- S'assurer d'exécuter les scripts d'installation en tant qu'administrateur
- Vérifier que NSSM est bien accessible

### Port déjà utilisé
- Modifier le port dans les scripts (remplacer 8000 par un autre port)
- Redémarrer le service après modification

## Sécurité

⚠️ **Important** : Cette configuration est pour le développement local.
Pour la production :
- Changer `DEBUG=False`
- Utiliser HTTPS
- Configurer un reverse proxy (nginx/Apache)
- Utiliser des secrets sécurisés