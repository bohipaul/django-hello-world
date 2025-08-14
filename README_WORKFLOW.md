# 🚀 Workflow de Développement et Déploiement

## 📋 Workflow Principal

### 🔧 Développement Local

1. **Développer le frontend** :
   ```bash
   cd frontend
   npm run dev    # Serveur de développement Vite
   ```

2. **Développer le backend** :
   ```bash
   python manage.py runserver    # Serveur Django
   ```

3. **Tester l'intégration** :
   - Frontend : `http://localhost:5173`
   - Backend : `http://localhost:8000`

### 📦 Préparation pour le Déploiement

**Avant chaque déploiement** sur Coolify :

```bash
# 1. Builder le frontend
python build_frontend.py

# 2. Committer les changements
git add .
git commit -m "feat: Update frontend build with new features"
git push origin main

# 3. Coolify déploiera automatiquement
```

### 🐳 Déploiement Coolify

Le Dockerfile **ne compile PAS** le frontend. Il :
- ✅ Installe les dépendances Python
- ✅ Copie le code (avec frontend pré-compilé)
- ✅ Collecte les fichiers statiques Django
- ✅ Configure la sécurité et le health check

## 📁 Structure des Fichiers

```
django-hello-world/
├── frontend/
│   ├── src/                    # Code source React/Vue
│   ├── package.json
│   └── vite.config.js
├── static/                     # Frontend compilé (à committer)
│   ├── assets/
│   │   ├── index.CmE-1LrM.js  # JS avec chatbot
│   │   └── index.ug5QH7_2.css # CSS compilé
│   └── index.html
├── staticfiles/               # Django collectstatic (gitignore)
├── api/
│   └── settings.py
├── Dockerfile                 # Sans compilation frontend
├── build_frontend.py          # Script de build local
└── .dockerignore              # Exclut frontend/src
```

## 🎯 Commandes Utiles

### Frontend
```bash
# Développement
cd frontend && npm run dev

# Build pour production
python build_frontend.py

# Installation des dépendances
cd frontend && npm install
```

### Django
```bash
# Serveur de développement
python manage.py runserver

# Collection manuelle des statiques
python manage.py collectstatic

# Migrations
python manage.py makemigrations
python manage.py migrate
```

### Tests et Validation
```bash
# Test pré-déploiement complet
python test_deployment.py

# Test build frontend seulement
python build_frontend.py
```

## 🚀 Fonctionnalités de l'Application

### 📱 Frontend
- **Interface moderne** glassmorphism
- **Dashboard** avec statistiques temps réel
- **Chatbot intelligent** avec NLP français
- **Animations** Heroicons + Motion
- **Responsive design**

### 🤖 Chatbot
- Questions en langage naturel français
- Statistiques des participants
- Recherche par entreprise
- Export d'informations
- Interface floating moderne

### 🔧 Backend
- **API REST** Django REST Framework
- **Admin Django** interface complète
- **Base de données** SQLite (dev) / PostgreSQL (prod)
- **CORS** configuré pour production
- **Sécurité** headers et SSL

## 🎯 Configuration Coolify

### Variables d'Environnement
```env
DJANGO_SETTINGS_MODULE=api.settings
SECRET_KEY=your-secret-key
DEBUG=False
ALLOWED_HOSTS=participant.devci.net
CORS_ALLOWED_ORIGINS=https://participant.devci.net
PORT=3000
```

### Vérifications Post-Déploiement
- ✅ `https://participant.devci.net/` - Application
- ✅ `https://participant.devci.net/api/participants/` - API
- ✅ `https://participant.devci.net/admin/` - Admin
- ✅ `https://participant.devci.net/static/vite.svg` - Statiques

## 🔄 Cycles de Développement

### Nouvelles Fonctionnalités
1. Développer en local (`npm run dev` + `python manage.py runserver`)
2. Tester l'intégration
3. Builder : `python build_frontend.py`
4. Committer et pusher
5. Déployer automatiquement sur Coolify

### Corrections Rapides
1. Modifier le code
2. Tester localement
3. Builder et déployer

### Mises à Jour du Chatbot
1. Modifier `frontend/src/chatbot.js`
2. Tester les interactions
3. `python build_frontend.py`
4. Committer et déployer

## ⚡ Avantages de ce Workflow

- ✅ **Build rapide** en production (pas de npm dans Docker)
- ✅ **Déploiement léger** (image Docker plus petite)
- ✅ **Contrôle total** sur le build frontend
- ✅ **Debug facile** (build local = build prod)
- ✅ **Sécurité** (pas d'outils de build en production)

---

**🎉 Votre application Django avec chatbot est optimisée pour Coolify !**