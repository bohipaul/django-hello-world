import { apiClient } from './api.js';

// Component pour afficher la liste des participants
export class ParticipantList {
  constructor(container) {
    this.container = container;
    this.participants = [];
    this.loading = false;
  }

  async load() {
    console.log('🔄 Chargement de la liste des participants...');
    this.loading = true;
    this.render();
    
    try {
      const response = await apiClient.getParticipants();
      console.log('📥 Réponse API reçue:', response);
      this.participants = response.results || response;
      console.log('👥 Participants traités:', this.participants);
      console.log('🔢 Nombre de participants:', this.participants.length);
    } catch (error) {
      console.error('❌ Erreur lors du chargement des participants:', error);
      this.renderError(error.message);
      return; // Sortir ici en cas d'erreur
    } finally {
      this.loading = false;
      console.log('🏁 Chargement terminé, rendu final...');
      this.render(); // Toujours faire le rendu final
    }
  }

  render() {
    console.log('🎨 Rendu de la liste, état:', { loading: this.loading, count: this.participants.length });
    
    if (this.loading) {
      this.container.innerHTML = `
        <div class="card">
          <div style="padding: 20px; text-align: center;">
            <div style="animation: pulse 2s infinite;">⏳ Chargement des participants...</div>
          </div>
        </div>
      `;
      return;
    }

    console.log('📋 Rendu de', this.participants.length, 'participants');

    this.container.innerHTML = `
      <div class="card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
          <h2 style="font-size: 1.5rem; font-weight: bold; color: #111827; margin: 0;">Liste des Participants</h2>
          <span style="background-color: #dbeafe; color: #1e40af; padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.875rem; font-weight: 500;">
            ${this.participants.length} participant(s)
          </span>
        </div>
        
        ${this.participants.length === 0 ? `
          <div style="text-align: center; padding: 2rem;">
            <div style="color: #9ca3af; margin-bottom: 1rem; font-size: 3rem;">👥</div>
            <h3 style="font-size: 1.125rem; font-weight: 500; color: #111827; margin-bottom: 0.5rem;">Aucun participant</h3>
            <p style="color: #6b7280;">Commencez par ajouter votre premier participant.</p>
          </div>
        ` : `
          <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background-color: #f9fafb;">
                  <th style="padding: 0.75rem 1.5rem; text-align: left; font-size: 0.75rem; font-weight: 500; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #e5e7eb;">Participant</th>
                  <th style="padding: 0.75rem 1.5rem; text-align: left; font-size: 0.75rem; font-weight: 500; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #e5e7eb;">Email</th>
                  <th style="padding: 0.75rem 1.5rem; text-align: left; font-size: 0.75rem; font-weight: 500; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #e5e7eb;">Entreprise</th>
                  <th style="padding: 0.75rem 1.5rem; text-align: left; font-size: 0.75rem; font-weight: 500; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #e5e7eb;">Statut</th>
                  <th style="padding: 0.75rem 1.5rem; text-align: left; font-size: 0.75rem; font-weight: 500; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #e5e7eb;">Actions</th>
                </tr>
              </thead>
              <tbody style="background-color: white;">
                ${this.participants.map((participant, index) => `
                  <tr style="border-bottom: 1px solid #e5e7eb;" onmouseover="this.style.backgroundColor='#f9fafb'" onmouseout="this.style.backgroundColor='white'">
                    <td style="padding: 1rem 1.5rem; white-space: nowrap;">
                      <div style="display: flex; align-items: center;">
                        <div style="width: 2.5rem; height: 2.5rem; border-radius: 50%; background-color: #dbeafe; display: flex; align-items: center; justify-content: center; margin-right: 1rem;">
                          <span style="color: #2563eb; font-weight: 500; font-size: 0.875rem;">
                            ${participant.prenom.charAt(0)}${participant.nom.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div style="font-size: 0.875rem; font-weight: 500; color: #111827;">${participant.nom_complet || `${participant.prenom} ${participant.nom}`}</div>
                          <div style="font-size: 0.875rem; color: #6b7280;">${participant.poste || 'Non spécifié'}</div>
                        </div>
                      </div>
                    </td>
                    <td style="padding: 1rem 1.5rem; white-space: nowrap; font-size: 0.875rem; color: #111827;">${participant.email}</td>
                    <td style="padding: 1rem 1.5rem; white-space: nowrap; font-size: 0.875rem; color: #6b7280;">${participant.entreprise || 'Non spécifiée'}</td>
                    <td style="padding: 1rem 1.5rem; white-space: nowrap;">
                      <span style="display: inline-flex; padding: 0.25rem 0.5rem; font-size: 0.75rem; font-weight: 600; border-radius: 9999px; ${participant.actif ? 'background-color: #dcfce7; color: #166534;' : 'background-color: #fee2e2; color: #991b1b;'}">
                        ${participant.actif ? '✅ Actif' : '❌ Inactif'}
                      </span>
                    </td>
                    <td style="padding: 1rem 1.5rem; white-space: nowrap; font-size: 0.875rem; font-weight: 500;">
                      <button onclick="deleteParticipant(${participant.id})" style="color: #dc2626; background: none; border: none; cursor: pointer; text-decoration: underline;" onmouseover="this.style.color='#7f1d1d'" onmouseout="this.style.color='#dc2626'">
                        Supprimer
                      </button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `}
      </div>
    `;
    
    console.log('✅ Rendu terminé, HTML injecté dans le conteneur');
  }

  renderError(message) {
    this.container.innerHTML = `
      <div class="card">
        <div class="text-center py-8">
          <div class="text-red-400 mb-4">
            <svg class="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">Erreur de chargement</h3>
          <p class="text-gray-500">${message}</p>
          <button onclick="window.participantList.load()" class="mt-4 btn-primary">
            Réessayer
          </button>
        </div>
      </div>
    `;
  }
}

// Component pour le formulaire d'ajout de participant
export class ParticipantForm {
  constructor(container, onSuccess) {
    this.container = container;
    this.onSuccess = onSuccess;
    this.loading = false;
    this.errors = {};
  }

  render() {
    this.container.innerHTML = `
      <div class="card">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Ajouter un Participant</h2>
        
        <form id="participant-form" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="prenom" class="block text-sm font-medium text-gray-700 mb-1">Prénom *</label>
              <input type="text" id="prenom" name="prenom" required 
                     class="input-field ${this.errors.prenom ? 'border-red-500' : ''}"
                     placeholder="Jean">
              ${this.errors.prenom ? `<p class="form-error">${this.errors.prenom}</p>` : ''}
            </div>
            
            <div>
              <label for="nom" class="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
              <input type="text" id="nom" name="nom" required 
                     class="input-field ${this.errors.nom ? 'border-red-500' : ''}"
                     placeholder="Dupont">
              ${this.errors.nom ? `<p class="form-error">${this.errors.nom}</p>` : ''}
            </div>
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input type="email" id="email" name="email" required 
                   class="input-field ${this.errors.email ? 'border-red-500' : ''}"
                   placeholder="jean.dupont@exemple.com">
            ${this.errors.email ? `<p class="form-error">${this.errors.email}</p>` : ''}
          </div>

          <div>
            <label for="telephone" class="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
            <input type="tel" id="telephone" name="telephone" 
                   class="input-field ${this.errors.telephone ? 'border-red-500' : ''}"
                   placeholder="+33 1 23 45 67 89">
            ${this.errors.telephone ? `<p class="form-error">${this.errors.telephone}</p>` : ''}
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="entreprise" class="block text-sm font-medium text-gray-700 mb-1">Entreprise</label>
              <input type="text" id="entreprise" name="entreprise" 
                     class="input-field ${this.errors.entreprise ? 'border-red-500' : ''}"
                     placeholder="ACME Corp">
              ${this.errors.entreprise ? `<p class="form-error">${this.errors.entreprise}</p>` : ''}
            </div>
            
            <div>
              <label for="poste" class="block text-sm font-medium text-gray-700 mb-1">Poste</label>
              <input type="text" id="poste" name="poste" 
                     class="input-field ${this.errors.poste ? 'border-red-500' : ''}"
                     placeholder="Développeur">
              ${this.errors.poste ? `<p class="form-error">${this.errors.poste}</p>` : ''}
            </div>
          </div>

          <div class="flex items-center">
            <input type="checkbox" id="actif" name="actif" checked 
                   class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded">
            <label for="actif" class="ml-2 block text-sm text-gray-700">Participant actif</label>
          </div>

          <div class="pt-4">
            <button type="submit" ${this.loading ? 'disabled' : ''} 
                    class="w-full btn-primary ${this.loading ? 'opacity-50 cursor-not-allowed' : ''}">
              ${this.loading ? 'Ajout en cours...' : 'Ajouter le Participant'}
            </button>
          </div>
        </form>
      </div>
    `;

    this.attachEventListeners();
  }

  attachEventListeners() {
    const form = document.getElementById('participant-form');
    form.addEventListener('submit', this.handleSubmit.bind(this));
  }

  async handleSubmit(event) {
    event.preventDefault();
    
    if (this.loading) return;

    this.loading = true;
    this.errors = {};
    this.render();

    const formData = new FormData(event.target);
    const data = {
      prenom: formData.get('prenom'),
      nom: formData.get('nom'),
      email: formData.get('email'),
      telephone: formData.get('telephone') || null,
      entreprise: formData.get('entreprise') || null,
      poste: formData.get('poste') || null,
      actif: formData.has('actif'),
    };

    try {
      await apiClient.createParticipant(data);
      
      // Reset form
      event.target.reset();
      
      // Show success message
      this.showSuccess();
      
      // Callback pour recharger la liste
      if (this.onSuccess) {
        this.onSuccess();
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout:', error);
      
      if (error.message.includes('email')) {
        this.errors = { email: 'Cet email est déjà utilisé' };
      } else {
        this.errors = { general: error.message };
      }
    } finally {
      this.loading = false;
      this.render();
    }
  }

  showSuccess() {
    const successDiv = document.createElement('div');
    successDiv.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    successDiv.textContent = 'Participant ajouté avec succès !';
    document.body.appendChild(successDiv);

    setTimeout(() => {
      successDiv.remove();
    }, 3000);
  }
}