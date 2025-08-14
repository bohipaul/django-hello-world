# 🚀 Application Django avec Chatbot - Déploiement Coolify

## 📱 Fonctionnalités de l'Application

✅ **Interface moderne** avec design glassmorphism  
✅ **Dashboard** avec statistiques temps réel des participants  
✅ **Gestion des participants** (ajout, suppression, modification)  
✅ **Chatbot intelligent** avec traitement de langage naturel en français  
✅ **API REST** complète avec Django REST Framework  
✅ **Frontend React+Vite+Tailwind** intégré  
✅ **Animations** Heroicons + Motion personnalisées  
✅ **Responsive design** pour tous les écrans  

## 🤖 Fonctionnalités du Chatbot

Le chatbot comprend ces types de questions :
- **"Combien de participants ?"** - Statistiques générales
- **"Liste des participants actifs"** - Filtrer par statut
- **"Qui travaille chez [entreprise] ?"** - Recherche par entreprise
- **"Emails de tous les participants"** - Export d'informations
- **"Participants récents"** - Dernières inscriptions
- **"Statistiques"** - Résumé complet avec top entreprises
- **"aide"** - Affiche toutes les commandes disponibles

## 🐳 Configuration Docker pour Coolify

### Dockerfile Optimisé
- **Multi-stage build** avec Node.js + Python
- **Build automatique** du frontend dans le conteneur
- **Collection automatique** des fichiers statiques
- **Utilisateur non-root** pour la sécurité
- **Health check** intégré
- **Logs structurés** avec Gunicorn

### Variables d'Environnement Requises

```env
# Configuration Django
DJANGO_SETTINGS_MODULE=api.settings
SECRET_KEY=your-super-secret-key-here
DEBUG=False
ALLOWED_HOSTS=participant.devci.net

# Configuration CORS
CORS_ALLOWED_ORIGINS=https://participant.devci.net

# Configuration Gunicorn
PORT=3000
WEB_CONCURRENCY=4
```

## 🎯 Configuration Coolify

### 1. Repository
- **URL**: Votre repository Git
- **Branch**: `main`
- **Build Type**: `Docker`
- **Port**: `3000`

### 2. Domain
- **Domain**: `participant.devci.net`
- **SSL**: Automatique

### 3. Build Process
Le Dockerfile exécute automatiquement :
```bash
# Installation des dépendances
npm ci --only=production
pip install -r requirements.txt

# Build du frontend
npm run build

# Collection des fichiers statiques  
python manage.py collectstatic --noinput --clear

# Démarrage avec Gunicorn
gunicorn --bind 0.0.0.0:3000 --workers 4 api.wsgi:app
```

## 📁 Structure des Fichiers Statiques

```
/app/staticfiles/  (servis par WhiteNoise)
├── assets/
│   ├── index.ug5QH7_2.css    # Styles compilés
│   ├── index.CmE-1LrM.js     # JavaScript compilé (avec chatbot)
│   └── ...
├── admin/                     # Interface admin Django
├── rest_framework/            # API browsable
└── vite.svg                   # Favicon
```

## 🔧 Résolution des Problèmes

### Fichiers Statiques 404
- ✅ WhiteNoise configuré automatiquement
- ✅ MIME types configurés pour CSS/JS
- ✅ Fichiers collectés dans le build Docker

### Erreurs CORS
- ✅ CORS configuré pour `participant.devci.net`
- ✅ Headers de sécurité activés

### Build Failed
- ✅ Health check avec délai de démarrage
- ✅ Logs accessibles dans Coolify
- ✅ Script de test pré-déploiement

## 🧪 Test Pré-Déploiement

Avant de déployer, exécutez :
```bash
python test_deployment.py
```

Ce script vérifie :
- ✅ Tous les fichiers nécessaires
- ✅ Configuration Django
- ✅ Collecte des fichiers statiques
- ✅ Build frontend (si npm disponible)

## 🌐 URLs Post-Déploiement

Une fois déployé, testez ces URLs :

### Application
- `https://participant.devci.net/` - Interface principale
- `https://participant.devci.net/admin/` - Administration Django
- `https://participant.devci.net/api/participants/` - API REST

### Fichiers Statiques
- `https://participant.devci.net/static/vite.svg`
- `https://participant.devci.net/static/assets/index.ug5QH7_2.css`
- `https://participant.devci.net/static/assets/index.CmE-1LrM.js`

### Test du Chatbot
1. Ouvrir l'application
2. Cliquer sur le bouton chatbot (coin bas-droite)
3. Taper "aide" pour voir les commandes
4. Essayer "Combien de participants ?" 

## 🎉 Fonctionnalités Prêtes

L'application déployée inclut :
- **Interface utilisateur** complète et moderne
- **Chatbot fonctionnel** avec IA conversationnelle
- **API REST** pour intégrations futures  
- **Admin Django** pour gestion avancée
- **Animations fluides** et expérience utilisateur optimale
- **Performance optimisée** avec cache et compression
- **Sécurité** renforcée (HTTPS, headers, CORS)

---

**🚀 Votre application est maintenant prête pour la production avec Coolify !**