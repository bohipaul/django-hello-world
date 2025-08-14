import './style.css'
import { ParticipantList, ParticipantForm } from './components.js'
import { ParticipantChatbot } from './chatbot.js'
import { apiClient } from './api.js'
import { HeroIcons } from './heroicons.js'
import { Motion, ScrollAnimations } from './animations.js'

console.log('🚀 Chargement du module principal...');

// Variables globales pour les composants
let participantList;
let participantForm;
let chatbot;

// Fonction pour supprimer un participant (accessible globalement)
window.deleteParticipant = async (id) => {
  console.log(`🗑️ Suppression du participant ${id}`);
  if (!confirm('Êtes-vous sûr de vouloir supprimer ce participant ?')) return;
  
  try {
    await apiClient.deleteParticipant(id);
    participantList.load(); // Recharger la liste
    
    // Mettre à jour le dashboard
    if (window.updateDashboard) {
      window.updateDashboard();
    }
    
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
      <div style="min-height: 100vh; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
        <!-- Header -->
        <header style="background: rgba(255,255,255,0.95); backdrop-filter: blur(10px); border-bottom: 1px solid rgba(255,255,255,0.2); padding: 1rem 0; box-shadow: 0 1px 20px rgba(0,0,0,0.1);">
          <div style="max-width: 1200px; margin: 0 auto; padding: 0 1rem; display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center;">
              <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-right: 12px; color: white;">
                ${HeroIcons.userGroup}
              </div>
              <div>
                <h1 style="margin: 0; font-size: 1.5rem; font-weight: 700; color: #1f2937;">Gestion des Participants</h1>
                <p style="margin: 0; font-size: 0.875rem; color: #6b7280;">Interface moderne et intuitive</p>
              </div>
            </div>
            <div style="display: flex; align-items: center; gap: 1rem;">
              <div style="background: #f3f4f6; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.75rem; color: #374151; display: flex; align-items: center; gap: 0.5rem;">
                ${HeroIcons.users.replace('w-6 h-6', 'w-4 h-4')}
                <span id="participants-count">Chargement...</span>
              </div>
              <div style="background: #10b981; color: white; padding: 0.5rem 0.75rem; border-radius: 6px; font-size: 0.75rem; font-weight: 500; display: flex; align-items: center; gap: 0.375rem;">
                ${HeroIcons.wifi.replace('w-6 h-6', 'w-4 h-4')}
                En ligne
              </div>
            </div>
          </div>
        </header>

        <!-- Main Content -->
        <main style="max-width: 1400px; margin: 0 auto; padding: 2rem 1rem;">
          <!-- Dashboard Cards -->
          <div id="dashboard-cards" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
            <div class="card dashboard-card" style="text-align: center; background: rgba(255,255,255,0.95); backdrop-filter: blur(10px); position: relative; overflow: hidden;" data-animation="fadeIn" data-delay="0">
              <div style="position: absolute; top: -10px; right: -10px; width: 60px; height: 60px; background: linear-gradient(135deg, #3b82f6, #1d4ed8); border-radius: 50%; opacity: 0.1;"></div>
              <div style="color: #3b82f6; margin-bottom: 0.5rem; position: relative; z-index: 1;">
                ${HeroIcons.userGroup.replace('w-6 h-6', 'w-8 h-8').replace('stroke-width="2"', 'stroke-width="1.5"')}
              </div>
              <h3 style="margin: 0; font-size: 0.875rem; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em;">Total Participants</h3>
              <p style="margin: 0.25rem 0 0 0; font-size: 1.5rem; font-weight: 700; color: #1f2937;" id="total-count">-</p>
            </div>
            <div class="card dashboard-card" style="text-align: center; background: rgba(255,255,255,0.95); backdrop-filter: blur(10px); position: relative; overflow: hidden;" data-animation="fadeIn" data-delay="0.1">
              <div style="position: absolute; top: -10px; right: -10px; width: 60px; height: 60px; background: linear-gradient(135deg, #10b981, #059669); border-radius: 50%; opacity: 0.1;"></div>
              <div style="color: #10b981; margin-bottom: 0.5rem; position: relative; z-index: 1;">
                ${HeroIcons.checkCircle.replace('w-6 h-6', 'w-8 h-8').replace('stroke-width="2"', 'stroke-width="1.5"')}
              </div>
              <h3 style="margin: 0; font-size: 0.875rem; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em;">Actifs</h3>
              <p style="margin: 0.25rem 0 0 0; font-size: 1.5rem; font-weight: 700; color: #1f2937;" id="active-count">-</p>
            </div>
            <div class="card dashboard-card" style="text-align: center; background: rgba(255,255,255,0.95); backdrop-filter: blur(10px); position: relative; overflow: hidden;" data-animation="fadeIn" data-delay="0.2">
              <div style="position: absolute; top: -10px; right: -10px; width: 60px; height: 60px; background: linear-gradient(135deg, #f59e0b, #d97706); border-radius: 50%; opacity: 0.1;"></div>
              <div style="color: #f59e0b; margin-bottom: 0.5rem; position: relative; z-index: 1;">
                ${HeroIcons.buildingOffice2.replace('w-6 h-6', 'w-8 h-8').replace('stroke-width="2"', 'stroke-width="1.5"')}
              </div>
              <h3 style="margin: 0; font-size: 0.875rem; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em;">Entreprises</h3>
              <p style="margin: 0.25rem 0 0 0; font-size: 1.5rem; font-weight: 700; color: #1f2937;" id="companies-count">-</p>
            </div>
            <div class="card dashboard-card" style="text-align: center; background: rgba(255,255,255,0.95); backdrop-filter: blur(10px); position: relative; overflow: hidden;" data-animation="fadeIn" data-delay="0.3">
              <div style="position: absolute; top: -10px; right: -10px; width: 60px; height: 60px; background: linear-gradient(135deg, #8b5cf6, #7c3aed); border-radius: 50%; opacity: 0.1;"></div>
              <div style="color: #8b5cf6; margin-bottom: 0.5rem; position: relative; z-index: 1;">
                ${HeroIcons.calendar.replace('w-6 h-6', 'w-8 h-8').replace('stroke-width="2"', 'stroke-width="1.5"')}
              </div>
              <h3 style="margin: 0; font-size: 0.875rem; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em;">Aujourd'hui</h3>
              <p style="margin: 0.25rem 0 0 0; font-size: 1.5rem; font-weight: 700; color: #1f2937;" id="today-count">-</p>
            </div>
          </div>

          <!-- Main Grid -->
          <div style="display: grid; grid-template-columns: 1fr 400px; gap: 2rem;" class="responsive-grid">
            <div id="participant-list-container"></div>
            <div id="participant-form-container"></div>
          </div>
          
          <!-- Chatbot Container -->
          <div id="chatbot-container"></div>
        </main>
      </div>
      
      <style>
        @media (max-width: 1024px) {
          .responsive-grid {
            grid-template-columns: 1fr !important;
          }
        }
      </style>
    `;

    // Vérifier que les conteneurs existent
    const formContainer = document.getElementById('participant-form-container');
    const listContainer = document.getElementById('participant-list-container');
    const chatbotContainer = document.getElementById('chatbot-container');
    
    if (!formContainer || !listContainer || !chatbotContainer) {
      console.error('❌ Conteneurs non trouvés !', { formContainer, listContainer, chatbotContainer });
      return;
    }

    // Initialiser les animations pour les cartes du dashboard
    const scrollAnimations = new ScrollAnimations();
    const dashboardCards = document.querySelectorAll('.dashboard-card');
    dashboardCards.forEach((card, index) => {
      Motion.hover(card, { scale: 1.03, shadow: true });
      scrollAnimations.observe(card, 'fadeIn', index * 0.1);
    });
    
    console.log('📦 Initialisation des composants...');

    // Initialiser les composants
    participantForm = new ParticipantForm(formContainer, () => {
      console.log('🔄 Rechargement après ajout...');
      participantList.load();
    });

    participantList = new ParticipantList(listContainer);
    
    // Initialiser le chatbot
    chatbot = new ParticipantChatbot(chatbotContainer);

    // Rendre les composants accessibles globalement pour debug
    window.participantList = participantList;
    window.participantForm = participantForm;
    window.chatbot = chatbot;
    window.apiClient = apiClient;

    console.log('🎯 Rendu des composants...');
    
    // Initialiser l'affichage
    try {
      participantForm.render();
      console.log('✅ Formulaire rendu');
      
      chatbot.render();
      console.log('✅ Chatbot rendu');
    } catch (error) {
      console.error('❌ Erreur rendu composants:', error);
    }
    
    // Fonction pour mettre à jour les statistiques du dashboard
    async function updateDashboard() {
      try {
        const data = await apiClient.getParticipants();
        const participants = data.results || data;
        
        // Calculs des statistiques
        const total = participants.length;
        const active = participants.filter(p => p.actif).length;
        const companies = new Set(participants.filter(p => p.entreprise).map(p => p.entreprise)).size;
        
        // Participants inscrits aujourd'hui
        const today = new Date().toISOString().split('T')[0];
        const todayCount = participants.filter(p => 
          p.date_inscription && p.date_inscription.startsWith(today)
        ).length;
        
        // Mise à jour des éléments avec animations
        const counters = {
          'total-count': total,
          'active-count': active,
          'companies-count': companies,
          'today-count': todayCount
        };
        
        // Animer les compteurs numériques
        Object.entries(counters).forEach(([id, value]) => {
          const element = document.getElementById(id);
          if (element) {
            const currentValue = parseInt(element.textContent) || 0;
            if (currentValue !== value) {
              Motion.bounceCount(element, value, { startValue: currentValue });
            }
          }
        });
        
        // Mettre à jour le compteur du header
        const participantsCountElement = document.getElementById('participants-count');
        if (participantsCountElement) {
          participantsCountElement.textContent = `${total} participant${total > 1 ? 's' : ''}`;
          Motion.fadeIn(participantsCountElement, { duration: 0.2 });
        }
        
        console.log('📊 Dashboard mis à jour:', counters);
      } catch (error) {
        console.error('❌ Erreur mise à jour dashboard:', error);
      }
    }

    // Test API et chargement de la liste
    console.log('🔍 Test de l\'API et chargement de la liste...');
    
    // Charger les statistiques en premier
    updateDashboard();
    
    // Puis charger la liste
    participantList.load()
      .then(() => {
        console.log('✅ Liste chargée avec succès');
        // Rendre la fonction updateDashboard accessible globalement
        window.updateDashboard = updateDashboard;
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