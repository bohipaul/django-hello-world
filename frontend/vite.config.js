import { defineConfig } from 'vite'

export default defineConfig({
  // Configuration pour la production
  build: {
    // Définir le dossier de sortie vers les staticfiles de Django
    outDir: '../static',
    // Vider le dossier de sortie avant la construction
    emptyOutDir: false, // Ne pas vider car Django a d'autres fichiers statiques
    // Configuration des assets
    assetsDir: 'assets',
    // Générer les fichiers avec des noms hachés pour le cache busting
    rollupOptions: {
      output: {
        // Structure des fichiers de sortie
        assetFileNames: 'assets/[name].[hash][extname]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js'
      }
    }
  },
  // Configuration du serveur de développement
  server: {
    port: 3000,
    host: true,
    // Proxy vers Django pour l'API
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        secure: false
      }
    }
  },
  // Configuration de base
  base: '/static/',
  // Optimiser les dépendances
  optimizeDeps: {
    include: []
  }
})