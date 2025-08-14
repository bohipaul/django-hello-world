import './style.css'
import { ParticipantList, ParticipantForm } from './components.js'
import { apiClient } from './api.js'

// Variables globales pour les composants
let participantList;
let participantForm;

// Fonction pour supprimer un participant (accessible globalement)
window.deleteParticipant = async (id) => {
  if (!confirm('Êtes-vous sûr de vouloir supprimer ce participant ?')) return;
  
  try {
    await apiClient.deleteParticipant(id);
    participantList.load(); // Recharger la liste
  } catch (error) {
    alert('Erreur lors de la suppression : ' + error.message);
  }
};

// Initialisation de l'application
document.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector('#app');
  
  app.innerHTML = `
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-8">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">
            🎯 Gestion des Participants
          </h1>
          <p class="text-xl text-gray-600">
            Interface moderne avec Django + Vite + Tailwind CSS
          </p>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div id="participant-form-container"></div>
          <div id="participant-list-container"></div>
        </div>
      </div>
    </div>
  `;

  // Initialiser les composants
  const formContainer = document.getElementById('participant-form-container');
  const listContainer = document.getElementById('participant-list-container');

  participantForm = new ParticipantForm(formContainer, () => {
    participantList.load(); // Recharger la liste après ajout
  });

  participantList = new ParticipantList(listContainer);

  // Rendre les composants accessibles globalement pour debug
  window.participantList = participantList;
  window.participantForm = participantForm;

  // Initialiser l'affichage
  participantForm.render();
  
  // Debug: tester l'API directement
  console.log('🔍 Test de l\'API...');
  apiClient.getParticipants()
    .then(data => {
      console.log('✅ API Response:', data);
      console.log('📊 Nombre de participants:', data.results?.length || data.length);
    })
    .catch(error => {
      console.error('❌ Erreur API:', error);
    });
  
  participantList.load();
});