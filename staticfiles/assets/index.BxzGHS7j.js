(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) return;
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) processPreload(link);
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") continue;
      for (const node of mutation.addedNodes) if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
    }
  }).observe(document, {
    childList: true,
    subtree: true
  });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep) return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const API_BASE_URL = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" ? "http://127.0.0.1:8000/api" : "/api";
class ApiClient {
  constructor(baseURL = API_BASE_URL) {
    this.baseURL = baseURL;
  }
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers
      },
      ...options
    };
    if (config.body && typeof config.body === "object") {
      config.body = JSON.stringify(config.body);
    }
    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `HTTP ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("API Request Error:", error);
      throw error;
    }
  }
  // Participants endpoints
  async getParticipants() {
    return this.request("/participants/");
  }
  async getParticipant(id) {
    return this.request(`/participants/${id}/`);
  }
  async createParticipant(data) {
    return this.request("/participants/", {
      method: "POST",
      body: data
    });
  }
  async updateParticipant(id, data) {
    return this.request(`/participants/${id}/`, {
      method: "PUT",
      body: data
    });
  }
  async deleteParticipant(id) {
    return this.request(`/participants/${id}/`, {
      method: "DELETE"
    });
  }
  async getStats() {
    return this.request("/stats/");
  }
}
const apiClient = new ApiClient();
class ParticipantList {
  constructor(container) {
    this.container = container;
    this.participants = [];
    this.loading = false;
    this.avatarColors = [
      "#3b82f6, #1d4ed8",
      "#10b981, #059669",
      "#f59e0b, #d97706",
      "#ef4444, #dc2626",
      "#8b5cf6, #7c3aed",
      "#06b6d4, #0891b2",
      "#84cc16, #65a30d",
      "#f97316, #ea580c"
    ];
  }
  getAvatarColor(id) {
    return this.avatarColors[id % this.avatarColors.length];
  }
  async load() {
    console.log("🔄 Chargement de la liste des participants...");
    this.loading = true;
    this.render();
    try {
      const response = await apiClient.getParticipants();
      console.log("📥 Réponse API reçue:", response);
      this.participants = response.results || response;
      console.log("👥 Participants traités:", this.participants);
      console.log("🔢 Nombre de participants:", this.participants.length);
    } catch (error) {
      console.error("❌ Erreur lors du chargement des participants:", error);
      this.renderError(error.message);
      return;
    } finally {
      this.loading = false;
      console.log("🏁 Chargement terminé, rendu final...");
      this.render();
    }
  }
  render() {
    console.log("🎨 Rendu de la liste, état:", { loading: this.loading, count: this.participants.length });
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
    console.log("📋 Rendu de", this.participants.length, "participants");
    this.container.innerHTML = `
      <div class="card" style="background: rgba(255,255,255,0.95); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.2);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; border-bottom: 1px solid #f3f4f6; padding-bottom: 1rem;">
          <div>
            <h2 style="font-size: 1.125rem; font-weight: 600; color: #111827; margin: 0;">👥 Participants</h2>
            <p style="font-size: 0.75rem; color: #6b7280; margin: 0; margin-top: 0.25rem;">Gérez votre liste de participants</p>
          </div>
          <div style="display: flex; gap: 0.5rem; align-items: center;">
            <button onclick="window.updateDashboard && window.updateDashboard()" style="background: #f3f4f6; border: none; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.75rem; color: #6b7280; cursor: pointer;" onmouseover="this.style.background='#e5e7eb'" onmouseout="this.style.background='#f3f4f6'">
              🔄 Actualiser
            </button>
          </div>
        </div>
        
        ${this.participants.length === 0 ? `
          <div style="text-align: center; padding: 2rem 1rem;">
            <div style="color: #d1d5db; margin-bottom: 1rem; font-size: 2.5rem;">👥</div>
            <h3 style="font-size: 1rem; font-weight: 500; color: #111827; margin-bottom: 0.5rem;">Aucun participant</h3>
            <p style="color: #6b7280; font-size: 0.875rem;">Utilisez le formulaire ci-contre pour ajouter votre premier participant.</p>
          </div>
        ` : `
          <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; font-size: 0.813rem;">
              <thead>
                <tr style="background: linear-gradient(90deg, #f8fafc, #f1f5f9);">
                  <th style="padding: 0.5rem 0.75rem; text-align: left; font-size: 0.688rem; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.025em; border-bottom: 2px solid #e2e8f0;">Participant</th>
                  <th style="padding: 0.5rem 0.75rem; text-align: left; font-size: 0.688rem; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.025em; border-bottom: 2px solid #e2e8f0;">Contact</th>
                  <th style="padding: 0.5rem 0.75rem; text-align: left; font-size: 0.688rem; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.025em; border-bottom: 2px solid #e2e8f0;">Entreprise</th>
                  <th style="padding: 0.5rem 0.75rem; text-align: left; font-size: 0.688rem; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.025em; border-bottom: 2px solid #e2e8f0;">Statut</th>
                  <th style="padding: 0.5rem 0.75rem; text-align: center; font-size: 0.688rem; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.025em; border-bottom: 2px solid #e2e8f0; width: 80px;">Actions</th>
                </tr>
              </thead>
              <tbody style="background-color: white;">
                ${this.participants.map((participant, index) => `
                  <tr style="border-bottom: 1px solid #f1f5f9; transition: all 0.2s ease;" onmouseover="this.style.backgroundColor='#f8fafc'; this.style.transform='translateY(-1px)'; this.style.boxShadow='0 2px 4px rgba(0,0,0,0.05)'" onmouseout="this.style.backgroundColor='white'; this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                    <td style="padding: 0.75rem; white-space: nowrap;">
                      <div style="display: flex; align-items: center;">
                        <div style="width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, ${this.getAvatarColor(participant.id)}); display: flex; align-items: center; justify-content: center; margin-right: 0.75rem; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                          <span style="color: white; font-weight: 600; font-size: 0.75rem;">
                            ${participant.prenom.charAt(0)}${participant.nom.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div style="font-size: 0.813rem; font-weight: 500; color: #1e293b;">${participant.nom_complet || `${participant.prenom} ${participant.nom}`}</div>
                          ${participant.poste ? `<div style="font-size: 0.688rem; color: #64748b;">${participant.poste}</div>` : ""}
                        </div>
                      </div>
                    </td>
                    <td style="padding: 0.75rem;">
                      <div style="font-size: 0.75rem; color: #3730a3; font-weight: 500;">${participant.email}</div>
                      ${participant.telephone ? `<div style="font-size: 0.688rem; color: #64748b; margin-top: 0.125rem;">${participant.telephone}</div>` : ""}
                    </td>
                    <td style="padding: 0.75rem;">
                      <div style="font-size: 0.75rem; color: #374151; font-weight: 500;">${participant.entreprise || "Indépendant"}</div>
                    </td>
                    <td style="padding: 0.75rem;">
                      <span style="display: inline-flex; align-items: center; padding: 0.125rem 0.5rem; font-size: 0.688rem; font-weight: 500; border-radius: 12px; ${participant.actif ? "background: linear-gradient(90deg, #dcfce7, #bbf7d0); color: #166534; border: 1px solid #86efac;" : "background: linear-gradient(90deg, #fee2e2, #fecaca); color: #991b1b; border: 1px solid #fca5a5;"}">
                        <span style="width: 6px; height: 6px; border-radius: 50%; background: currentColor; margin-right: 0.375rem;"></span>
                        ${participant.actif ? "Actif" : "Inactif"}
                      </span>
                    </td>
                    <td style="padding: 0.75rem; text-align: center;">
                      <button onclick="deleteParticipant(${participant.id})" style="background: linear-gradient(135deg, #fee2e2, #fecaca); color: #dc2626; border: 1px solid #fca5a5; padding: 0.25rem 0.5rem; border-radius: 6px; font-size: 0.688rem; cursor: pointer; transition: all 0.2s ease;" onmouseover="this.style.background='linear-gradient(135deg, #fecaca, #f87171)'; this.style.color='#7f1d1d'" onmouseout="this.style.background='linear-gradient(135deg, #fee2e2, #fecaca)'; this.style.color='#dc2626'" title="Supprimer ${participant.prenom} ${participant.nom}">
                        🗑️
                      </button>
                    </td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        `}
      </div>
    `;
    console.log("✅ Rendu terminé, HTML injecté dans le conteneur");
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
class ParticipantForm {
  constructor(container, onSuccess) {
    this.container = container;
    this.onSuccess = onSuccess;
    this.loading = false;
    this.errors = {};
  }
  render() {
    this.container.innerHTML = `
      <div class="card" style="background: rgba(255,255,255,0.95); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.2); position: sticky; top: 2rem;">
        <div style="margin-bottom: 1rem; border-bottom: 1px solid #f3f4f6; padding-bottom: 1rem;">
          <h2 style="font-size: 1.125rem; font-weight: 600; color: #111827; margin: 0;">➕ Nouveau Participant</h2>
          <p style="font-size: 0.75rem; color: #6b7280; margin: 0; margin-top: 0.25rem;">Ajoutez un nouveau participant</p>
        </div>
        
        <form id="participant-form" style="display: flex; flex-direction: column; gap: 0.875rem;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
            <div>
              <label for="prenom" style="display: block; font-size: 0.75rem; font-weight: 500; color: #374151; margin-bottom: 0.25rem;">Prénom *</label>
              <input type="text" id="prenom" name="prenom" required 
                     class="input-field" style="padding: 0.5rem; font-size: 0.813rem; border-radius: 6px; ${this.errors.prenom ? "border-color: #ef4444;" : ""}"
                     placeholder="Jean">
              ${this.errors.prenom ? `<p style="color: #ef4444; font-size: 0.688rem; margin-top: 0.25rem;">${this.errors.prenom}</p>` : ""}
            </div>
            
            <div>
              <label for="nom" style="display: block; font-size: 0.75rem; font-weight: 500; color: #374151; margin-bottom: 0.25rem;">Nom *</label>
              <input type="text" id="nom" name="nom" required 
                     class="input-field" style="padding: 0.5rem; font-size: 0.813rem; border-radius: 6px; ${this.errors.nom ? "border-color: #ef4444;" : ""}"
                     placeholder="Dupont">
              ${this.errors.nom ? `<p style="color: #ef4444; font-size: 0.688rem; margin-top: 0.25rem;">${this.errors.nom}</p>` : ""}
            </div>
          </div>

          <div>
            <label for="email" style="display: block; font-size: 0.75rem; font-weight: 500; color: #374151; margin-bottom: 0.25rem;">Email *</label>
            <input type="email" id="email" name="email" required 
                   class="input-field" style="padding: 0.5rem; font-size: 0.813rem; border-radius: 6px; ${this.errors.email ? "border-color: #ef4444;" : ""}"
                   placeholder="jean.dupont@exemple.com">
            ${this.errors.email ? `<p style="color: #ef4444; font-size: 0.688rem; margin-top: 0.25rem;">${this.errors.email}</p>` : ""}
          </div>

          <div>
            <label for="telephone" style="display: block; font-size: 0.75rem; font-weight: 500; color: #374151; margin-bottom: 0.25rem;">Téléphone</label>
            <input type="tel" id="telephone" name="telephone" 
                   class="input-field" style="padding: 0.5rem; font-size: 0.813rem; border-radius: 6px; ${this.errors.telephone ? "border-color: #ef4444;" : ""}"
                   placeholder="+33 1 23 45 67 89">
            ${this.errors.telephone ? `<p style="color: #ef4444; font-size: 0.688rem; margin-top: 0.25rem;">${this.errors.telephone}</p>` : ""}
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
            <div>
              <label for="entreprise" style="display: block; font-size: 0.75rem; font-weight: 500; color: #374151; margin-bottom: 0.25rem;">Entreprise</label>
              <input type="text" id="entreprise" name="entreprise" 
                     class="input-field" style="padding: 0.5rem; font-size: 0.813rem; border-radius: 6px; ${this.errors.entreprise ? "border-color: #ef4444;" : ""}"
                     placeholder="ACME Corp">
              ${this.errors.entreprise ? `<p style="color: #ef4444; font-size: 0.688rem; margin-top: 0.25rem;">${this.errors.entreprise}</p>` : ""}
            </div>
            
            <div>
              <label for="poste" style="display: block; font-size: 0.75rem; font-weight: 500; color: #374151; margin-bottom: 0.25rem;">Poste</label>
              <input type="text" id="poste" name="poste" 
                     class="input-field" style="padding: 0.5rem; font-size: 0.813rem; border-radius: 6px; ${this.errors.poste ? "border-color: #ef4444;" : ""}"
                     placeholder="Développeur">
              ${this.errors.poste ? `<p style="color: #ef4444; font-size: 0.688rem; margin-top: 0.25rem;">${this.errors.poste}</p>` : ""}
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 0.5rem; padding: 0.75rem; background: #f8fafc; border-radius: 6px; border: 1px solid #e2e8f0;">
            <input type="checkbox" id="actif" name="actif" checked 
                   style="width: 16px; height: 16px; accent-color: #3b82f6;">
            <label for="actif" style="font-size: 0.75rem; color: #374151; font-weight: 500;">Participant actif</label>
          </div>

          <div style="padding-top: 0.5rem; border-top: 1px solid #f3f4f6; margin-top: 0.5rem;">
            <button type="submit" ${this.loading ? "disabled" : ""} 
                    style="width: 100%; background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; border: none; padding: 0.625rem 1rem; border-radius: 8px; font-size: 0.813rem; font-weight: 600; cursor: ${this.loading ? "not-allowed" : "pointer"}; opacity: ${this.loading ? "0.6" : "1"}; transition: all 0.2s ease; box-shadow: 0 2px 4px rgba(59, 130, 246, 0.3);"
                    onmouseover="if(!this.disabled) { this.style.background='linear-gradient(135deg, #2563eb, #1e40af)'; this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 8px rgba(59, 130, 246, 0.4)'; }"
                    onmouseout="if(!this.disabled) { this.style.background='linear-gradient(135deg, #3b82f6, #1d4ed8)'; this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 4px rgba(59, 130, 246, 0.3)'; }">
              ${this.loading ? "⏳ Ajout en cours..." : "✨ Ajouter le Participant"}
            </button>
          </div>

          ${this.errors.general ? `
            <div style="background: linear-gradient(90deg, #fee2e2, #fecaca); color: #991b1b; padding: 0.75rem; border-radius: 6px; border: 1px solid #fca5a5; font-size: 0.75rem;">
              ⚠️ ${this.errors.general}
            </div>
          ` : ""}
        </form>
      </div>
    `;
    this.attachEventListeners();
  }
  attachEventListeners() {
    const form = document.getElementById("participant-form");
    form.addEventListener("submit", this.handleSubmit.bind(this));
  }
  async handleSubmit(event) {
    event.preventDefault();
    if (this.loading) return;
    this.loading = true;
    this.errors = {};
    this.render();
    const formData = new FormData(event.target);
    const data = {
      prenom: formData.get("prenom"),
      nom: formData.get("nom"),
      email: formData.get("email"),
      telephone: formData.get("telephone") || null,
      entreprise: formData.get("entreprise") || null,
      poste: formData.get("poste") || null,
      actif: formData.has("actif")
    };
    try {
      await apiClient.createParticipant(data);
      event.target.reset();
      this.showSuccess();
      if (this.onSuccess) {
        this.onSuccess();
      }
      if (window.updateDashboard) {
        window.updateDashboard();
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout:", error);
      if (error.message.includes("email")) {
        this.errors = { email: "Cet email est déjà utilisé" };
      } else {
        this.errors = { general: error.message };
      }
    } finally {
      this.loading = false;
      this.render();
    }
  }
  showSuccess() {
    const successDiv = document.createElement("div");
    successDiv.className = "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50";
    successDiv.textContent = "Participant ajouté avec succès !";
    document.body.appendChild(successDiv);
    setTimeout(() => {
      successDiv.remove();
    }, 3e3);
  }
}
console.log("🚀 Chargement du module principal...");
let participantList;
let participantForm;
window.deleteParticipant = async (id) => {
  console.log(`🗑️ Suppression du participant ${id}`);
  if (!confirm("Êtes-vous sûr de vouloir supprimer ce participant ?")) return;
  try {
    await apiClient.deleteParticipant(id);
    participantList.load();
    if (window.updateDashboard) {
      window.updateDashboard();
    }
    console.log(`✅ Participant ${id} supprimé`);
  } catch (error) {
    console.error("❌ Erreur suppression:", error);
    alert("Erreur lors de la suppression : " + error.message);
  }
};
document.addEventListener("DOMContentLoaded", () => {
  console.log("📄 DOM chargé, initialisation...");
  try {
    const app = document.querySelector("#app");
    if (!app) {
      console.error("❌ Element #app non trouvé !");
      return;
    }
    console.log("🎨 Rendu de l'interface...");
    app.innerHTML = `
      <div style="min-height: 100vh; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
        <!-- Header -->
        <header style="background: rgba(255,255,255,0.95); backdrop-filter: blur(10px); border-bottom: 1px solid rgba(255,255,255,0.2); padding: 1rem 0; box-shadow: 0 1px 20px rgba(0,0,0,0.1);">
          <div style="max-width: 1200px; margin: 0 auto; padding: 0 1rem; display: flex; align-items: center; justify-content: between;">
            <div style="display: flex; align-items: center;">
              <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                <span style="color: white; font-weight: bold; font-size: 18px;">👥</span>
              </div>
              <div>
                <h1 style="margin: 0; font-size: 1.5rem; font-weight: 700; color: #1f2937;">Gestion des Participants</h1>
                <p style="margin: 0; font-size: 0.875rem; color: #6b7280;">Interface moderne et intuitive</p>
              </div>
            </div>
            <div style="display: flex; align-items: center; gap: 1rem;">
              <div style="background: #f3f4f6; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.75rem; color: #374151;">
                <span id="participants-count">Chargement...</span>
              </div>
              <div style="background: #10b981; color: white; padding: 0.5rem 0.75rem; border-radius: 6px; font-size: 0.75rem; font-weight: 500;">
                ✨ En ligne
              </div>
            </div>
          </div>
        </header>

        <!-- Main Content -->
        <main style="max-width: 1400px; margin: 0 auto; padding: 2rem 1rem;">
          <!-- Dashboard Cards -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
            <div class="card" style="text-align: center; background: rgba(255,255,255,0.95); backdrop-filter: blur(10px);">
              <div style="color: #3b82f6; font-size: 2rem; margin-bottom: 0.5rem;">👤</div>
              <h3 style="margin: 0; font-size: 0.875rem; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em;">Total Participants</h3>
              <p style="margin: 0.25rem 0 0 0; font-size: 1.5rem; font-weight: 700; color: #1f2937;" id="total-count">-</p>
            </div>
            <div class="card" style="text-align: center; background: rgba(255,255,255,0.95); backdrop-filter: blur(10px);">
              <div style="color: #10b981; font-size: 2rem; margin-bottom: 0.5rem;">✅</div>
              <h3 style="margin: 0; font-size: 0.875rem; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em;">Actifs</h3>
              <p style="margin: 0.25rem 0 0 0; font-size: 1.5rem; font-weight: 700; color: #1f2937;" id="active-count">-</p>
            </div>
            <div class="card" style="text-align: center; background: rgba(255,255,255,0.95); backdrop-filter: blur(10px);">
              <div style="color: #f59e0b; font-size: 2rem; margin-bottom: 0.5rem;">📊</div>
              <h3 style="margin: 0; font-size: 0.875rem; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em;">Entreprises</h3>
              <p style="margin: 0.25rem 0 0 0; font-size: 1.5rem; font-weight: 700; color: #1f2937;" id="companies-count">-</p>
            </div>
            <div class="card" style="text-align: center; background: rgba(255,255,255,0.95); backdrop-filter: blur(10px);">
              <div style="color: #8b5cf6; font-size: 2rem; margin-bottom: 0.5rem;">📅</div>
              <h3 style="margin: 0; font-size: 0.875rem; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em;">Aujourd'hui</h3>
              <p style="margin: 0.25rem 0 0 0; font-size: 1.5rem; font-weight: 700; color: #1f2937;" id="today-count">-</p>
            </div>
          </div>

          <!-- Main Grid -->
          <div style="display: grid; grid-template-columns: 1fr 400px; gap: 2rem;" class="responsive-grid">
            <div id="participant-list-container"></div>
            <div id="participant-form-container"></div>
          </div>
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
    const formContainer = document.getElementById("participant-form-container");
    const listContainer = document.getElementById("participant-list-container");
    if (!formContainer || !listContainer) {
      console.error("❌ Conteneurs non trouvés !", { formContainer, listContainer });
      return;
    }
    console.log("📦 Initialisation des composants...");
    participantForm = new ParticipantForm(formContainer, () => {
      console.log("🔄 Rechargement après ajout...");
      participantList.load();
    });
    participantList = new ParticipantList(listContainer);
    window.participantList = participantList;
    window.participantForm = participantForm;
    window.apiClient = apiClient;
    console.log("🎯 Rendu des composants...");
    try {
      participantForm.render();
      console.log("✅ Formulaire rendu");
    } catch (error) {
      console.error("❌ Erreur rendu formulaire:", error);
    }
    async function updateDashboard() {
      try {
        const data = await apiClient.getParticipants();
        const participants = data.results || data;
        const total = participants.length;
        const active = participants.filter((p) => p.actif).length;
        const companies = new Set(participants.filter((p) => p.entreprise).map((p) => p.entreprise)).size;
        const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
        const todayCount = participants.filter(
          (p) => p.date_inscription && p.date_inscription.startsWith(today)
        ).length;
        const elements = {
          "total-count": total,
          "active-count": active,
          "companies-count": companies,
          "today-count": todayCount,
          "participants-count": `${total} participant${total > 1 ? "s" : ""}`
        };
        Object.entries(elements).forEach(([id, value]) => {
          const element = document.getElementById(id);
          if (element) {
            element.textContent = value;
            element.style.opacity = "0.5";
            setTimeout(() => {
              element.style.opacity = "1";
              element.style.transition = "opacity 0.3s ease";
            }, 100);
          }
        });
        console.log("📊 Dashboard mis à jour:", elements);
      } catch (error) {
        console.error("❌ Erreur mise à jour dashboard:", error);
      }
    }
    console.log("🔍 Test de l'API et chargement de la liste...");
    updateDashboard();
    participantList.load().then(() => {
      console.log("✅ Liste chargée avec succès");
      window.updateDashboard = updateDashboard;
    }).catch((error) => {
      console.error("❌ Erreur chargement liste:", error);
    });
  } catch (error) {
    console.error("❌ Erreur fatale lors de l'initialisation:", error);
    document.getElementById("app").innerHTML = `
      <div style="padding: 20px; text-align: center; color: red;">
        <h1>Erreur d'initialisation</h1>
        <p>${error.message}</p>
        <pre>${error.stack}</pre>
      </div>
    `;
  }
});
console.log("📝 Module principal chargé");
