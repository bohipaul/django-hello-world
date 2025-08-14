# Configuration Base de Données Coolify

## 🚀 Configuration Automatique (Recommandée)

L'application détecte automatiquement PostgreSQL si `DATABASE_URL` est définie.

### Étapes dans Coolify :

1. **Ajoutez un service PostgreSQL** :
   - Dans votre projet Coolify
   - Créez un nouveau service PostgreSQL
   - Notez les informations de connexion

2. **Configurez DATABASE_URL dans votre application** :
   ```
   DATABASE_URL=postgresql://username:password@postgres_host:5432/database_name
   ```

3. **C'est tout !** 
   - ✅ PostgreSQL sera automatiquement détecté
   - ✅ Aucune autre variable nécessaire
   - ✅ Les logs montreront : `📦 Database: PostgreSQL auto-detected via DATABASE_URL`

## 🔧 Configuration Manuelle (Alternative)

Si vous préférez contrôler manuellement :

### Variables d'environnement dans Coolify :

```env
DATABASE_TYPE=postgresql
DB_NAME=your_database_name
DB_USER=your_username
DB_PASSWORD=your_password
DB_HOST=postgres_service_host
DB_PORT=5432
```

## 🏠 Développement Local

Pour le développement local, l'application utilise SQLite par défaut :

```env
DATABASE_TYPE=sqlite  # ou omettez cette variable
```

## 🔍 Vérification

Les logs de démarrage Django afficheront :
- `📦 Database: PostgreSQL auto-detected via DATABASE_URL` (Coolify)
- `📦 Database: PostgreSQL via individual variables` (Manuel)
- `📦 Database: SQLite (default)` (Local)

## ⚠️ Résolution de Problèmes

### Si DATABASE_TYPE n'apparaît pas dans Coolify :
- ✅ **Normal !** Utilisez `DATABASE_URL` à la place
- ✅ L'auto-détection est plus robuste
- ✅ Une seule variable vs plusieurs

### Migration des données :
```bash
# Dans Coolify, exécutez via terminal :
python manage.py migrate
python manage.py create_admin --username admin --password yourpassword
```

## 📊 Avantages de cette Configuration

| Méthode | Variables | Auto-détection | Coolify-friendly |
|---------|-----------|----------------|------------------|
| DATABASE_URL | 1 | ✅ | ✅ |
| DATABASE_TYPE | 5+ | ❌ | ⚠️ |
| Par défaut | 0 | ✅ (SQLite) | ✅ |

**Recommandation : Utilisez DATABASE_URL dans Coolify pour une configuration simple et robuste.**