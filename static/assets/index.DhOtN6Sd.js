(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function s(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(t){if(t.ep)return;t.ep=!0;const r=s(t);fetch(t.href,r)}})();const d=window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1"?"http://127.0.0.1:8000/api":"/api";class p{constructor(e=d){this.baseURL=e}async request(e,s={}){const a=`${this.baseURL}${e}`,t={headers:{"Content-Type":"application/json",...s.headers},...s};t.body&&typeof t.body=="object"&&(t.body=JSON.stringify(t.body));try{const r=await fetch(a,t);if(!r.ok){const n=await r.json().catch(()=>({}));throw new Error(n.detail||`HTTP ${r.status}: ${r.statusText}`)}return await r.json()}catch(r){throw console.error("API Request Error:",r),r}}async getParticipants(){return this.request("/participants/")}async getParticipant(e){return this.request(`/participants/${e}/`)}async createParticipant(e){return this.request("/participants/",{method:"POST",body:e})}async updateParticipant(e,s){return this.request(`/participants/${e}/`,{method:"PUT",body:s})}async deleteParticipant(e){return this.request(`/participants/${e}/`,{method:"DELETE"})}async getStats(){return this.request("/stats/")}}const l=new p;class m{constructor(e){this.container=e,this.participants=[],this.loading=!1}async load(){this.loading=!0,this.render();try{const e=await l.getParticipants();this.participants=e.results||e,this.render()}catch(e){console.error("Erreur lors du chargement des participants:",e),this.renderError(e.message)}finally{this.loading=!1}}render(){if(this.loading){this.container.innerHTML=`
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
      `;return}this.container.innerHTML=`
      <div class="card">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-900">Liste des Participants</h2>
          <span class="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
            ${this.participants.length} participant(s)
          </span>
        </div>
        
        ${this.participants.length===0?`
          <div class="text-center py-8">
            <div class="text-gray-400 mb-4">
              <svg class="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.196-2.032M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.849M7 20H2v-2a3 3 0 015.196-2.032M7 20v-2c0-.656.126-1.283.356-1.849m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">Aucun participant</h3>
            <p class="text-gray-500">Commencez par ajouter votre premier participant.</p>
          </div>
        `:`
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
                ${this.participants.map(e=>`
                  <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10">
                          <div class="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                            <span class="text-primary-600 font-medium text-sm">
                              ${e.prenom.charAt(0)}${e.nom.charAt(0)}
                            </span>
                          </div>
                        </div>
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">${e.nom_complet}</div>
                          <div class="text-sm text-gray-500">${e.poste||"Non spécifié"}</div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${e.email}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${e.entreprise||"Non spécifiée"}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${e.actif?"bg-green-100 text-green-800":"bg-red-100 text-red-800"}">
                        ${e.actif?"Actif":"Inactif"}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button onclick="deleteParticipant(${e.id})" class="text-red-600 hover:text-red-900">
                        Supprimer
                      </button>
                    </td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        `}
      </div>
    `}renderError(e){this.container.innerHTML=`
      <div class="card">
        <div class="text-center py-8">
          <div class="text-red-400 mb-4">
            <svg class="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">Erreur de chargement</h3>
          <p class="text-gray-500">${e}</p>
          <button onclick="window.participantList.load()" class="mt-4 btn-primary">
            Réessayer
          </button>
        </div>
      </div>
    `}}class u{constructor(e,s){this.container=e,this.onSuccess=s,this.loading=!1,this.errors={}}render(){this.container.innerHTML=`
      <div class="card">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Ajouter un Participant</h2>
        
        <form id="participant-form" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="prenom" class="block text-sm font-medium text-gray-700 mb-1">Prénom *</label>
              <input type="text" id="prenom" name="prenom" required 
                     class="input-field ${this.errors.prenom?"border-red-500":""}"
                     placeholder="Jean">
              ${this.errors.prenom?`<p class="form-error">${this.errors.prenom}</p>`:""}
            </div>
            
            <div>
              <label for="nom" class="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
              <input type="text" id="nom" name="nom" required 
                     class="input-field ${this.errors.nom?"border-red-500":""}"
                     placeholder="Dupont">
              ${this.errors.nom?`<p class="form-error">${this.errors.nom}</p>`:""}
            </div>
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input type="email" id="email" name="email" required 
                   class="input-field ${this.errors.email?"border-red-500":""}"
                   placeholder="jean.dupont@exemple.com">
            ${this.errors.email?`<p class="form-error">${this.errors.email}</p>`:""}
          </div>

          <div>
            <label for="telephone" class="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
            <input type="tel" id="telephone" name="telephone" 
                   class="input-field ${this.errors.telephone?"border-red-500":""}"
                   placeholder="+33 1 23 45 67 89">
            ${this.errors.telephone?`<p class="form-error">${this.errors.telephone}</p>`:""}
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="entreprise" class="block text-sm font-medium text-gray-700 mb-1">Entreprise</label>
              <input type="text" id="entreprise" name="entreprise" 
                     class="input-field ${this.errors.entreprise?"border-red-500":""}"
                     placeholder="ACME Corp">
              ${this.errors.entreprise?`<p class="form-error">${this.errors.entreprise}</p>`:""}
            </div>
            
            <div>
              <label for="poste" class="block text-sm font-medium text-gray-700 mb-1">Poste</label>
              <input type="text" id="poste" name="poste" 
                     class="input-field ${this.errors.poste?"border-red-500":""}"
                     placeholder="Développeur">
              ${this.errors.poste?`<p class="form-error">${this.errors.poste}</p>`:""}
            </div>
          </div>

          <div class="flex items-center">
            <input type="checkbox" id="actif" name="actif" checked 
                   class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded">
            <label for="actif" class="ml-2 block text-sm text-gray-700">Participant actif</label>
          </div>

          <div class="pt-4">
            <button type="submit" ${this.loading?"disabled":""} 
                    class="w-full btn-primary ${this.loading?"opacity-50 cursor-not-allowed":""}">
              ${this.loading?"Ajout en cours...":"Ajouter le Participant"}
            </button>
          </div>
        </form>
      </div>
    `,this.attachEventListeners()}attachEventListeners(){document.getElementById("participant-form").addEventListener("submit",this.handleSubmit.bind(this))}async handleSubmit(e){if(e.preventDefault(),this.loading)return;this.loading=!0,this.errors={},this.render();const s=new FormData(e.target),a={prenom:s.get("prenom"),nom:s.get("nom"),email:s.get("email"),telephone:s.get("telephone")||null,entreprise:s.get("entreprise")||null,poste:s.get("poste")||null,actif:s.has("actif")};try{await l.createParticipant(a),e.target.reset(),this.showSuccess(),this.onSuccess&&this.onSuccess()}catch(t){console.error("Erreur lors de l'ajout:",t),t.message.includes("email")?this.errors={email:"Cet email est déjà utilisé"}:this.errors={general:t.message}}finally{this.loading=!1,this.render()}}showSuccess(){const e=document.createElement("div");e.className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50",e.textContent="Participant ajouté avec succès !",document.body.appendChild(e),setTimeout(()=>{e.remove()},3e3)}}let o,c;window.deleteParticipant=async i=>{if(confirm("Êtes-vous sûr de vouloir supprimer ce participant ?"))try{await l.deleteParticipant(i),o.load()}catch(e){alert("Erreur lors de la suppression : "+e.message)}};document.addEventListener("DOMContentLoaded",()=>{const i=document.querySelector("#app");i.innerHTML=`
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
  `;const e=document.getElementById("participant-form-container"),s=document.getElementById("participant-list-container");c=new u(e,()=>{o.load()}),o=new m(s),window.participantList=o,window.participantForm=c,c.render(),o.load()});
