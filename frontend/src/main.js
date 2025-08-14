import './style.css'
import { ParticipantList, ParticipantForm } from './components.js'
import { apiClient } from './api.js'

console.log('🚀 Chargement du module principal...');

// Variables globales pour les composants
let participantList;
let participantForm;

// Fonction pour supprimer un participant (accessible globalement)
window.deleteParticipant = async (id) => {
  console.log(`🗑️ Suppression du participant ${id}`);
  if (!confirm('Êtes-vous sûr de vouloir supprimer ce participant ?')) return;
  
  try {
    await apiClient.deleteParticipant(id);
    participantList.load(); // Recharger la liste
    console.log(`✅ Participant ${id} supprimé`);
  } catch (error) {
    console.error('❌ Erreur suppression:', error);
    alert('Erreur lors de la suppression : ' + error.message);
  }
};

// Initialisation de l'application
document.addEventListener('DOMContentLoaded', () => {
  console.log('📄 DOM chargé, initialisation...');
  
  try {
    const app = document.querySelector('#app');
    
    if (!app) {
      console.error('❌ Element #app non trouvé !');
      return;
    }
    
    console.log('🎨 Rendu de l\'interface...');
    app.innerHTML = `
      <div class="min-h-screen py-8" style="background-color: #f9fafb;">
        <div class="max-w-7xl mx-auto px-4">
          <div class="text-center mb-8">
            <h1 class="text-4xl font-bold mb-4" style="color: #111827;">
              🎯 Gestion des Participants
            </h1>
            <p class="text-xl" style="color: #4b5563;">
              Interface moderne avec Django + Vite + Tailwind CSS
            </p>
          </div>
          
          <div class="grid grid-cols-1 gap-8" style="display: grid; gap: 2rem;">
            <div id="participant-list-container" style="order: 2;"></div>
            <div id="participant-form-container" style="order: 1;"></div>
          </div>
        </div>
      </div>
    `;

    // Vérifier que les conteneurs existent
    const formContainer = document.getElementById('participant-form-container');
    const listContainer = document.getElementById('participant-list-container');
    
    if (!formContainer || !listContainer) {
      console.error('❌ Conteneurs non trouvés !', { formContainer, listContainer });
      return;
    }
    
    console.log('📦 Initialisation des composants...');

    // Initialiser les composants
    participantForm = new ParticipantForm(formContainer, () => {
      console.log('🔄 Rechargement après ajout...');
      participantList.load();
    });

    participantList = new ParticipantList(listContainer);

    // Rendre les composants accessibles globalement pour debug
    window.participantList = participantList;
    window.participantForm = participantForm;
    window.apiClient = apiClient;

    console.log('🎯 Rendu des composants...');
    
    // Initialiser l'affichage
    try {
      participantForm.render();
      console.log('✅ Formulaire rendu');
    } catch (error) {
      console.error('❌ Erreur rendu formulaire:', error);
    }
    
    // Test API et chargement de la liste
    console.log('🔍 Test de l\'API et chargement de la liste...');
    participantList.load()
      .then(() => {
        console.log('✅ Liste chargée avec succès');
      })
      .catch(error => {
        console.error('❌ Erreur chargement liste:', error);
      });
    
  } catch (error) {
    console.error('❌ Erreur fatale lors de l\'initialisation:', error);
    document.getElementById('app').innerHTML = `
      <div style="padding: 20px; text-align: center; color: red;">
        <h1>Erreur d'initialisation</h1>
        <p>${error.message}</p>
        <pre>${error.stack}</pre>
      </div>
    `;
  }
});

console.log('📝 Module principal chargé');