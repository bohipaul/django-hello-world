# Configuration Réseau Docker pour Coolify

## Options de Communication entre Conteneurs

### Option 1: Réseau Externe (Actuel)
```yaml
networks:
  - default
  - postgres-network

networks:
  postgres-network:
    name: postgres-network
    external: true
```

**Prérequis**: Le réseau `postgres-network` doit exister avant le déploiement.

### Option 2: Créer le Réseau via Docker Command
```bash
# Créer le réseau avant le déploiement
docker network create postgres-network
```

### Option 3: Réseau Interne (Alternative)
```yaml
networks:
  - postgres-network

networks:
  postgres-network:
    driver: bridge
```

### Option 4: Utiliser le Réseau par Défaut de Coolify
```yaml
# Pas de configuration réseau spécifique
# Coolify utilise son réseau par défaut
```

## Configuration pour PostgreSQL

Dans votre `.env` pour Coolify:
```bash
# Utilisation du nom du service ou de l'IP du conteneur
DB_HOST=postgres-service-name
# ou
DB_HOST=postgres-hck40w8c84gk4cko8cw44wwc-115504903581
```

## Troubleshooting

Si l'erreur "network not found" persiste:
1. Vérifier que le réseau existe: `docker network ls`
2. Créer le réseau: `docker network create postgres-network`
3. Ou utiliser l'option sans réseau externe