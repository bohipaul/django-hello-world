# 🚀 Déploiement Coolify pour participant.devci.net

## 📋 Configuration Coolify

### 1. Variables d'environnement dans Coolify

Configurez ces variables d'environnement dans l'interface Coolify :

```bash
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

# Configuration des fichiers statiques
STATIC_URL=/static/
STATIC_ROOT=/app/staticfiles
```

### 2. Configuration Coolify

#### Repository Git
- **Repository**: `https://github.com/votre-username/django-hello-world.git`
- **Branch**: `main`
- **Build Type**: `Docker`

#### Build Configuration
- **Dockerfile**: `Dockerfile` (racine du projet)
- **Build Context**: `.` (racine)
- **Port**: `3000`

#### Domain Configuration
- **Domain**: `participant.devci.net`
- **SSL**: Activé automatiquement par Coolify

### 3. Configuration avancée

#### Health Check
Coolify utilisera automatiquement le health check défini dans le Dockerfile :
```bash
curl http://localhost:3000/api/participants/
```

#### Resources
- **CPU**: 1 core minimum
- **RAM**: 512MB minimum
- **Storage**: 1GB minimum

## 🔧 Workflow de Build

**Important** : Le frontend N'EST PAS compilé dans Docker. Vous devez le builder localement :

### Avant chaque déploiement :
```bash
# 1. Builder le frontend localement
python build_frontend.py

# 2. Commiter les fichiers générés
git add .
git commit -m "Update frontend build"
git push

# 3. Coolify déploiera automatiquement
```

### Structure des fichiers après build :
```
static/
├── assets/
│   ├── index.ug5QH7_2.css    # CSS compilé
│   ├── index.CmE-1LrM.js     # JS compilé (avec chatbot)
│   └── ...
└── index.html                # Page principale

staticfiles/ (généré par collectstatic)
├── assets/
├── admin/
├── rest_framework/
└── ...
```

### Le Dockerfile fait seulement :
1. **Installation des dépendances Python**
2. **Copie du code** (avec frontend pré-compilé)
3. **Collection des fichiers statiques** (`collectstatic`)
4. **Configuration de sécurité** (utilisateur non-root)
5. **Health check** intégré

## ✅ Points de vérification post-déploiement

Après le déploiement, vérifiez ces URLs :

1. **Application principale** : `https://participant.devci.net/`
2. **API Participants** : `https://participant.devci.net/api/participants/`
3. **Fichiers statiques** :
   - `https://participant.devci.net/static/vite.svg`
   - `https://participant.devci.net/static/assets/index.ug5QH7_2.css`
   - `https://participant.devci.net/static/assets/index.CmE-1LrM.js`
4. **Admin Django** : `https://participant.devci.net/admin/`

## 🐛 Troubleshooting

### Erreurs courantes et solutions

#### 1. Fichiers statiques 404
```bash
# Dans les logs Coolify, vérifiez que ces commandes ont réussi :
npm run build
python manage.py collectstatic --noinput --clear
```

#### 2. CORS Errors
Vérifiez que `CORS_ALLOWED_ORIGINS` contient `https://participant.devci.net`

#### 3. Health Check Failed
L'application prend ~30-40 secondes à démarrer (build frontend + Django setup)

#### 4. Database Errors
Si vous utilisez une base de données externe, configurez `DATABASE_URL`

### Logs utiles
```bash
# Dans l'interface Coolify, consultez :
- Build logs (pour voir npm run build)
- Container logs (pour voir gunicorn)
- Health check logs
```

## 🔄 Redéploiement

Pour redéployer après des modifications :
1. Push vers le repository Git
2. Coolify redéploiera automatiquement
3. Le nouveau build inclura automatiquement :
   - Frontend recompilé 
   - Fichiers statiques collectés
   - Chatbot avec toutes les fonctionnalités

## 📱 Fonctionnalités disponibles après déploiement

✅ **Interface moderne** avec glassmorphism  
✅ **Dashboard** avec statistiques en temps réel  
✅ **Gestion des participants** (ajout, suppression, liste)  
✅ **Chatbot intelligent** avec questions en français  
✅ **Animations** Heroicons + Motion  
✅ **API REST** complète  
✅ **Responsive design**  

## 🛡️ Sécurité

Le conteneur Docker inclut :
- Utilisateur non-root pour l'exécution
- Variables d'environnement sécurisées
- Headers de sécurité configurés
- SSL automatique via Coolify
- CORS restreint au domaine de production

---

**🎉 Votre application Django avec chatbot est prête pour la production sur Coolify !**