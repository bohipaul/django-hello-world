// Script de démonstration pour tester les données
import { apiClient } from './api.js';

async function testAPI() {
  console.log('🚀 Test de l\'API Django...\n');
  
  try {
    // Test de récupération des participants
    const participants = await apiClient.getParticipants();
    console.log(`✅ ${participants.results.length} participants récupérés:`);
    
    participants.results.forEach((p, index) => {
      console.log(`${index + 1}. ${p.nom_complet} (${p.email})`);
      console.log(`   📍 ${p.entreprise} - ${p.poste}`);
      console.log(`   📞 ${p.telephone || 'Non renseigné'}`);
      console.log(`   ${p.actif ? '🟢 Actif' : '🔴 Inactif'}\n`);
    });

    // Test des statistiques
    const stats = await apiClient.getStats();
    console.log('📊 Statistiques:');
    console.log(`   Total: ${stats.total}`);
    console.log(`   Actifs: ${stats.actifs}`);
    console.log(`   Inactifs: ${stats.inactifs}`);
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

// Exporter pour utilisation dans la console
window.testAPI = testAPI;

export { testAPI };