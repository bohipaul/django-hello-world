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
      this.render();
    } catch (error) {
      console.error('❌ Erreur lors du chargement des participants:', error);
      this.renderError(error.message);
    } finally {
      this.loading = false;
    }
  }

  render() {
    if (this.loading) {
      this.container.innerHTML = `
        <div class="card loading">
          <div class="animate-pulse">
            <div class="h-6 bg-gray-200 rounded mb-4"></div>
            <div class="space-y-3">
              <div class="h-4 bg-gray-200 rounded"></div>
              <div class="h-4 bg-gray-200 rounded w-3/4"></div>
              <div class="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      `;
      return;
    }

    this.container.innerHTML = `
      <div class="card">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-900">Liste des Participants</h2>
          <span class="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
            ${this.participants.length} participant(s)
          </span>
        </div>
        
        ${this.participants.length === 0 ? `
          <div class="text-center py-8">
            <div class="text-gray-400 mb-4">
              <svg class="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.196-2.032M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.849M7 20H2v-2a3 3 0 015.196-2.032M7 20v-2c0-.656.126-1.283.356-1.849m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">Aucun participant</h3>
            <p class="text-gray-500">Commencez par ajouter votre premier participant.</p>
          </div>
        ` : `
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Participant</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entreprise</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                ${this.participants.map(participant => `
                  <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10">
                          <div class="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                            <span class="text-primary-600 font-medium text-sm">
                              ${participant.prenom.charAt(0)}${participant.nom.charAt(0)}
                            </span>
                          </div>
                        </div>
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">${participant.nom_complet}</div>
                          <div class="text-sm text-gray-500">${participant.poste || 'Non spécifié'}</div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${participant.email}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${participant.entreprise || 'Non spécifiée'}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${participant.actif ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                        ${participant.actif ? 'Actif' : 'Inactif'}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button onclick="deleteParticipant(${participant.id})" class="text-red-600 hover:text-red-900">
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