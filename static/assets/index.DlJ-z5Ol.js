const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index.CySMn7W7.js","assets/index.GUmXO0j9.js","assets/index.B2x03apL.js"])))=>i.map(i=>d[i]);
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
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
const HeroIcons = {
  // Dashboard icons
  users: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m3 5.197H9m3 0a4 4 0 01-3.87-3.2M9 12h3.75M9 15h3.75M9 18h3.75m3-8.59V5a2 2 0 00-2-2H6a2 2 0 00-2 2v4.59l3.69-3.69a1 1 0 011.42 0L9 10l2.69 2.69a1 1 0 001.42 0L17 9v.41z"></path>
  </svg>`,
  userGroup: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.196-2.032M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.849M7 20H2v-2a3 3 0 015.196-2.032M7 20v-2c0-.656.126-1.283.356-1.849m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
  </svg>`,
  checkCircle: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>`,
  buildingOffice2: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
  </svg>`,
  calendar: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
  </svg>`,
  // Action icons
  plus: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
  </svg>`,
  trash: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
  </svg>`,
  refresh: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
  </svg>`,
  // Status icons
  wifi: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"></path>
  </svg>`,
  // Form icons
  envelope: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
  </svg>`,
  phone: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
  </svg>`,
  briefcase: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0H8m8 0v1a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0V4"></path>
  </svg>`,
  // Navigation icons
  home: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
  </svg>`,
  sparkles: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
  </svg>`
};
class Motion {
  // Animation de fade in
  static fadeIn(element, options = {}) {
    const {
      duration = 0.3,
      delay = 0,
      ease = "ease-out",
      from = { opacity: 0, y: 20 },
      to = { opacity: 1, y: 0 }
    } = options;
    element.style.opacity = from.opacity;
    if (from.y) element.style.transform = `translateY(${from.y}px)`;
    if (from.x) element.style.transform = `translateX(${from.x}px)`;
    if (from.scale) element.style.transform += ` scale(${from.scale})`;
    element.style.transition = `all ${duration}s ${ease} ${delay}s`;
    setTimeout(() => {
      element.style.opacity = to.opacity;
      let transform = "";
      if (to.y !== void 0) transform += `translateY(${to.y}px) `;
      if (to.x !== void 0) transform += `translateX(${to.x}px) `;
      if (to.scale !== void 0) transform += `scale(${to.scale}) `;
      element.style.transform = transform.trim();
    }, delay * 1e3);
    return element;
  }
  // Animation de scale
  static scale(element, options = {}) {
    const {
      duration = 0.2,
      from = 1,
      to = 1.05,
      ease = "ease-out"
    } = options;
    element.style.transition = `transform ${duration}s ${ease}`;
    element.style.transform = `scale(${to})`;
    return element;
  }
  // Animation de bounce pour les compteurs
  static bounceCount(element, targetValue, options = {}) {
    const {
      duration = 1e3,
      startValue = 0,
      easing = (t) => t * t * (3 - 2 * t)
      // smooth step
    } = options;
    let startTime = null;
    const initialValue = parseInt(element.textContent) || startValue;
    function animate(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easing(progress);
      const currentValue = Math.round(initialValue + (targetValue - initialValue) * easedProgress);
      element.textContent = currentValue;
      const bounceScale = 1 + Math.sin(progress * Math.PI) * 0.1;
      element.style.transform = `scale(${bounceScale})`;
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        element.style.transform = "scale(1)";
      }
    }
    requestAnimationFrame(animate);
  }
  // Animation de pulsation
  static pulse(element, options = {}) {
    const {
      duration = 2,
      intensity = 0.05
    } = options;
    element.style.animation = `pulse-custom ${duration}s ease-in-out infinite`;
    if (!document.getElementById("pulse-keyframes")) {
      const style = document.createElement("style");
      style.id = "pulse-keyframes";
      style.textContent = `
        @keyframes pulse-custom {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(${1 + intensity}); }
        }
      `;
      document.head.appendChild(style);
    }
    return element;
  }
  // Animation de slide in
  static slideIn(element, direction = "up", options = {}) {
    const {
      duration = 0.4,
      distance = 30,
      delay = 0,
      ease = "ease-out"
    } = options;
    const transforms = {
      up: `translateY(${distance}px)`,
      down: `translateY(-${distance}px)`,
      left: `translateX(${distance}px)`,
      right: `translateX(-${distance}px)`
    };
    element.style.opacity = "0";
    element.style.transform = transforms[direction];
    element.style.transition = `all ${duration}s ${ease} ${delay}s`;
    setTimeout(() => {
      element.style.opacity = "1";
      element.style.transform = "translate(0, 0)";
    }, delay * 1e3);
    return element;
  }
  // Animation de hover avec spring
  static hover(element, options = {}) {
    const {
      scale = 1.02,
      duration = 0.2,
      shadow = true
    } = options;
    element.style.transition = `all ${duration}s cubic-bezier(0.4, 0, 0.2, 1)`;
    element.style.cursor = "pointer";
    element.addEventListener("mouseenter", () => {
      element.style.transform = `scale(${scale})`;
      if (shadow) {
        element.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.1)";
      }
    });
    element.addEventListener("mouseleave", () => {
      element.style.transform = "scale(1)";
      if (shadow) {
        element.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
      }
    });
    return element;
  }
  // Animation de stagger pour les listes
  static stagger(elements, animation = "fadeIn", options = {}) {
    const { delay = 0.1 } = options;
    elements.forEach((element, index) => {
      const animationOptions = {
        ...options,
        delay: delay * index
      };
      switch (animation) {
        case "fadeIn":
          Motion.fadeIn(element, animationOptions);
          break;
        case "slideIn":
          Motion.slideIn(element, "up", animationOptions);
          break;
        default:
          Motion.fadeIn(element, animationOptions);
      }
    });
    return elements;
  }
  // Animation de loading spinner
  static spinner(element, options = {}) {
    const {
      size = 20,
      color = "#3b82f6",
      duration = 1
    } = options;
    element.innerHTML = `
      <div style="
        width: ${size}px;
        height: ${size}px;
        border: 2px solid #f3f4f6;
        border-top-color: ${color};
        border-radius: 50%;
        animation: spin ${duration}s linear infinite;
      "></div>
    `;
    if (!document.getElementById("spin-keyframes")) {
      const style = document.createElement("style");
      style.id = "spin-keyframes";
      style.textContent = `
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `;
      document.head.appendChild(style);
    }
    return element;
  }
  // Animation de success checkmark
  static successCheck(element, options = {}) {
    const {
      size = 24,
      color = "#10b981",
      duration = 0.6
    } = options;
    element.innerHTML = `
      <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2">
        <path d="m9 12 2 2 4-4" stroke-dasharray="10" stroke-dashoffset="10" style="animation: draw-check ${duration}s ease-out forwards;"/>
        <circle cx="12" cy="12" r="9" stroke-dasharray="57" stroke-dashoffset="57" style="animation: draw-circle ${duration}s ease-out forwards;"/>
      </svg>
    `;
    if (!document.getElementById("success-keyframes")) {
      const style = document.createElement("style");
      style.id = "success-keyframes";
      style.textContent = `
        @keyframes draw-circle {
          to { stroke-dashoffset: 0; }
        }
        @keyframes draw-check {
          to { stroke-dashoffset: 0; }
        }
      `;
      document.head.appendChild(style);
    }
    return element;
  }
}
class ScrollAnimations {
  constructor() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const animation = element.dataset.animation || "fadeIn";
          const delay = parseFloat(element.dataset.delay || "0");
          Motion[animation](element, { delay });
          this.observer.unobserve(element);
        }
      });
    }, { threshold: 0.1 });
  }
  observe(element, animation = "fadeIn", delay = 0) {
    element.dataset.animation = animation;
    element.dataset.delay = delay.toString();
    this.observer.observe(element);
  }
}
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
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div style="color: #3b82f6;">
              ${HeroIcons.userGroup.replace("w-6 h-6", "w-5 h-5")}
            </div>
            <div>
              <h2 style="font-size: 1.125rem; font-weight: 600; color: #111827; margin: 0;">Participants</h2>
              <p style="font-size: 0.75rem; color: #6b7280; margin: 0; margin-top: 0.25rem;">Gérez votre liste de participants</p>
            </div>
          </div>
          <div style="display: flex; gap: 0.5rem; align-items: center;">
            <button id="refresh-btn" onclick="window.updateDashboard && window.updateDashboard()" style="background: #f3f4f6; border: none; padding: 0.375rem 0.75rem; border-radius: 6px; font-size: 0.75rem; color: #6b7280; cursor: pointer; display: flex; align-items: center; gap: 0.375rem; transition: all 0.2s ease;" onmouseover="this.style.background='#e5e7eb'; this.style.transform='scale(1.02)'" onmouseout="this.style.background='#f3f4f6'; this.style.transform='scale(1)'">
              ${HeroIcons.refresh.replace("w-6 h-6", "w-3 h-3")}
              Actualiser
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
                      <button onclick="deleteParticipant(${participant.id})" style="background: linear-gradient(135deg, #fee2e2, #fecaca); color: #dc2626; border: 1px solid #fca5a5; padding: 0.375rem; border-radius: 6px; cursor: pointer; transition: all 0.2s ease; display: inline-flex; align-items: center; justify-content: center;" onmouseover="this.style.background='linear-gradient(135deg, #fecaca, #f87171)'; this.style.color='#7f1d1d'; this.style.transform='scale(1.1)'" onmouseout="this.style.background='linear-gradient(135deg, #fee2e2, #fecaca)'; this.style.color='#dc2626'; this.style.transform='scale(1)'" title="Supprimer ${participant.prenom} ${participant.nom}">
                        ${HeroIcons.trash.replace("w-6 h-6", "w-4 h-4")}
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
          <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.25rem;">
            <div style="color: #10b981;">
              ${HeroIcons.plus.replace("w-6 h-6", "w-5 h-5")}
            </div>
            <h2 style="font-size: 1.125rem; font-weight: 600; color: #111827; margin: 0;">Nouveau Participant</h2>
          </div>
          <p style="font-size: 0.75rem; color: #6b7280; margin: 0;">Ajoutez un nouveau participant</p>
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
                    style="width: 100%; background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; border: none; padding: 0.625rem 1rem; border-radius: 8px; font-size: 0.813rem; font-weight: 600; cursor: ${this.loading ? "not-allowed" : "pointer"}; opacity: ${this.loading ? "0.6" : "1"}; transition: all 0.2s ease; box-shadow: 0 2px 4px rgba(59, 130, 246, 0.3); display: flex; align-items: center; justify-content: center; gap: 0.5rem;"
                    onmouseover="if(!this.disabled) { this.style.background='linear-gradient(135deg, #2563eb, #1e40af)'; this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 8px rgba(59, 130, 246, 0.4)'; }"
                    onmouseout="if(!this.disabled) { this.style.background='linear-gradient(135deg, #3b82f6, #1d4ed8)'; this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 4px rgba(59, 130, 246, 0.3)'; }">
              ${this.loading ? `${HeroIcons.refresh.replace("w-6 h-6", "w-4 h-4").replace('stroke="currentColor"', 'stroke="currentColor" style="animation: spin 1s linear infinite"')} Ajout en cours...` : `${HeroIcons.sparkles.replace("w-6 h-6", "w-4 h-4")} Ajouter le Participant`}
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
    successDiv.style.cssText = `
      position: fixed;
      top: 1rem;
      right: 1rem;
      background: linear-gradient(135deg, #10b981, #059669);
      color: white;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
      z-index: 1000;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      font-weight: 500;
      opacity: 0;
      transform: translateY(-20px) scale(0.9);
      transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    `;
    successDiv.innerHTML = `
      ${HeroIcons.checkCircle.replace("w-6 h-6", "w-5 h-5")}
      Participant ajouté avec succès !
    `;
    document.body.appendChild(successDiv);
    setTimeout(() => {
      successDiv.style.opacity = "1";
      successDiv.style.transform = "translateY(0) scale(1)";
    }, 10);
    setTimeout(() => {
      successDiv.style.opacity = "0";
      successDiv.style.transform = "translateY(-20px) scale(0.9)";
      setTimeout(() => successDiv.remove(), 300);
    }, 3e3);
  }
}
const scriptRel = "modulepreload";
const assetsURL = function(dep) {
  return "/static/" + dep;
};
const seen = {};
const __vitePreload = function preload(baseModule, deps, importerUrl) {
  let promise = Promise.resolve();
  if (deps && deps.length > 0) {
    let allSettled2 = function(promises) {
      return Promise.all(
        promises.map(
          (p) => Promise.resolve(p).then(
            (value) => ({ status: "fulfilled", value }),
            (reason) => ({ status: "rejected", reason })
          )
        )
      );
    };
    document.getElementsByTagName("link");
    const cspNonceMeta = document.querySelector(
      "meta[property=csp-nonce]"
    );
    const cspNonce = (cspNonceMeta == null ? void 0 : cspNonceMeta.nonce) || (cspNonceMeta == null ? void 0 : cspNonceMeta.getAttribute("nonce"));
    promise = allSettled2(
      deps.map((dep) => {
        dep = assetsURL(dep);
        if (dep in seen) return;
        seen[dep] = true;
        const isCss = dep.endsWith(".css");
        const cssSelector = isCss ? '[rel="stylesheet"]' : "";
        if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
          return;
        }
        const link = document.createElement("link");
        link.rel = isCss ? "stylesheet" : scriptRel;
        if (!isCss) {
          link.as = "script";
        }
        link.crossOrigin = "";
        link.href = dep;
        if (cspNonce) {
          link.setAttribute("nonce", cspNonce);
        }
        document.head.appendChild(link);
        if (isCss) {
          return new Promise((res, rej) => {
            link.addEventListener("load", res);
            link.addEventListener(
              "error",
              () => rej(new Error(`Unable to preload CSS for ${dep}`))
            );
          });
        }
      })
    );
  }
  function handlePreloadError(err) {
    const e = new Event("vite:preloadError", {
      cancelable: true
    });
    e.payload = err;
    window.dispatchEvent(e);
    if (!e.defaultPrevented) {
      throw err;
    }
  }
  return promise.then((res) => {
    for (const item of res || []) {
      if (item.status !== "rejected") continue;
      handlePreloadError(item.reason);
    }
    return baseModule().catch(handlePreloadError);
  });
};
class ParticipantChatbot {
  constructor(container) {
    this.container = container;
    this.messages = [];
    this.participants = [];
    this.isTyping = false;
    this.isMinimized = false;
    this.nlpManager = null;
    this.isNlpTrained = false;
    this.initializeNLP();
    this.responses = {
      greeting: [
        "👋 Salut ! Je suis votre assistant pour les participants. Comment puis-je vous aider ?",
        "🤖 Bonjour ! Je peux vous renseigner sur vos participants. Que souhaitez-vous savoir ?",
        "✨ Hello ! Posez-moi des questions sur vos participants !"
      ],
      help: `🎯 **Voici ce que je peux faire :**

• **"Combien de participants ?"** - Statistiques générales
• **"Qui travaille chez [entreprise] ?"** - Recherche par entreprise  
• **"Liste des participants actifs"** - Filtrer par statut
• **"Emails de tous les participants"** - Export d'informations
• **"Statistiques"** - Résumé complet
• **"Participants récents"** - Dernières inscriptions

💡 *Tapez simplement votre question en langage naturel !*`
    };
  }
  async initializeNLP() {
    try {
      const { Nlp } = await __vitePreload(async () => {
        const { Nlp: Nlp2 } = await import("./index.CySMn7W7.js").then((n) => n.i);
        return { Nlp: Nlp2 };
      }, true ? __vite__mapDeps([0,1]) : void 0);
      const { LangFr } = await __vitePreload(async () => {
        const { LangFr: LangFr2 } = await import("./index.B2x03apL.js").then((n) => n.i);
        return { LangFr: LangFr2 };
      }, true ? __vite__mapDeps([2,1]) : void 0);
      this.nlpManager = new Nlp({ languages: ["fr"], forceNER: true });
      this.nlpManager.use(LangFr);
      console.log("🤖 NLP.js chargé avec succès dans le navigateur");
    } catch (error) {
      console.warn("🤖 NLP.js non disponible, fallback vers patterns manuels:", error);
      this.nlpManager = null;
      this.isNlpTrained = true;
      return;
    }
    this.nlpManager.addDocument("fr", "salut", "greeting");
    this.nlpManager.addDocument("fr", "hello", "greeting");
    this.nlpManager.addDocument("fr", "hi", "greeting");
    this.nlpManager.addDocument("fr", "bonjour", "greeting");
    this.nlpManager.addDocument("fr", "bonsoir", "greeting");
    this.nlpManager.addDocument("fr", "salut tout le monde", "greeting");
    this.nlpManager.addDocument("fr", "coucou", "greeting");
    this.nlpManager.addDocument("fr", "yo", "greeting");
    this.nlpManager.addDocument("fr", "hey", "greeting");
    this.nlpManager.addDocument("fr", "bonne journée", "greeting");
    this.nlpManager.addDocument("fr", "bonne soirée", "greeting");
    this.nlpManager.addDocument("fr", "comment allez vous", "greeting");
    this.nlpManager.addDocument("fr", "comment ça va", "greeting");
    this.nlpManager.addDocument("fr", "salut assistant", "greeting");
    this.nlpManager.addDocument("fr", "bonjour chatbot", "greeting");
    this.nlpManager.addDocument("fr", "aide", "help");
    this.nlpManager.addDocument("fr", "help", "help");
    this.nlpManager.addDocument("fr", "commandes", "help");
    this.nlpManager.addDocument("fr", "que peux tu faire", "help");
    this.nlpManager.addDocument("fr", "comment ça marche", "help");
    this.nlpManager.addDocument("fr", "à quoi tu sers", "help");
    this.nlpManager.addDocument("fr", "quelles sont tes fonctions", "help");
    this.nlpManager.addDocument("fr", "que sais tu faire", "help");
    this.nlpManager.addDocument("fr", "montre moi les commandes", "help");
    this.nlpManager.addDocument("fr", "liste des fonctionnalités", "help");
    this.nlpManager.addDocument("fr", "mode emploi", "help");
    this.nlpManager.addDocument("fr", "instruction", "help");
    this.nlpManager.addDocument("fr", "guide utilisation", "help");
    this.nlpManager.addDocument("fr", "comment je peux te parler", "help");
    this.nlpManager.addDocument("fr", "comment utiliser", "help");
    this.nlpManager.addDocument("fr", "combien de participants", "count");
    this.nlpManager.addDocument("fr", "nombre de participants", "count");
    this.nlpManager.addDocument("fr", "total participants", "count");
    this.nlpManager.addDocument("fr", "combien il y a de participants", "count");
    this.nlpManager.addDocument("fr", "quel est le nombre de participants", "count");
    this.nlpManager.addDocument("fr", "combien sont ils", "count");
    this.nlpManager.addDocument("fr", "combien de personnes", "count");
    this.nlpManager.addDocument("fr", "nombre total", "count");
    this.nlpManager.addDocument("fr", "effectif total", "count");
    this.nlpManager.addDocument("fr", "quantité participants", "count");
    this.nlpManager.addDocument("fr", "combien avez vous de participants", "count");
    this.nlpManager.addDocument("fr", "combien y a t il de membres", "count");
    this.nlpManager.addDocument("fr", "nombre de membres", "count");
    this.nlpManager.addDocument("fr", "compte participants", "count");
    this.nlpManager.addDocument("fr", "décompte", "count");
    this.nlpManager.addDocument("fr", "statistiques", "stats");
    this.nlpManager.addDocument("fr", "stats", "stats");
    this.nlpManager.addDocument("fr", "résumé", "stats");
    this.nlpManager.addDocument("fr", "bilan", "stats");
    this.nlpManager.addDocument("fr", "aperçu général", "stats");
    this.nlpManager.addDocument("fr", "rapport complet", "stats");
    this.nlpManager.addDocument("fr", "vue d ensemble", "stats");
    this.nlpManager.addDocument("fr", "synthèse", "stats");
    this.nlpManager.addDocument("fr", "données complètes", "stats");
    this.nlpManager.addDocument("fr", "informations détaillées", "stats");
    this.nlpManager.addDocument("fr", "tableau de bord", "stats");
    this.nlpManager.addDocument("fr", "dashboard", "stats");
    this.nlpManager.addDocument("fr", "analyse", "stats");
    this.nlpManager.addDocument("fr", "métriques", "stats");
    this.nlpManager.addDocument("fr", "indicateurs", "stats");
    this.nlpManager.addDocument("fr", "participants actifs", "active");
    this.nlpManager.addDocument("fr", "liste des actifs", "active");
    this.nlpManager.addDocument("fr", "qui est actif", "active");
    this.nlpManager.addDocument("fr", "participants activés", "active");
    this.nlpManager.addDocument("fr", "membres actifs", "active");
    this.nlpManager.addDocument("fr", "personnes actives", "active");
    this.nlpManager.addDocument("fr", "utilisateurs actifs", "active");
    this.nlpManager.addDocument("fr", "comptes activés", "active");
    this.nlpManager.addDocument("fr", "profils actifs", "active");
    this.nlpManager.addDocument("fr", "participants en activité", "active");
    this.nlpManager.addDocument("fr", "membres en ligne", "active");
    this.nlpManager.addDocument("fr", "qui participe activement", "active");
    this.nlpManager.addDocument("fr", "liste participants opérationnels", "active");
    this.nlpManager.addDocument("fr", "montre moi les actifs", "active");
    this.nlpManager.addDocument("fr", "affiche les membres actifs", "active");
    this.nlpManager.addDocument("fr", "qui travaille chez %company%", "company");
    this.nlpManager.addDocument("fr", "participants de %company%", "company");
    this.nlpManager.addDocument("fr", "employés de %company%", "company");
    this.nlpManager.addDocument("fr", "membres de %company%", "company");
    this.nlpManager.addDocument("fr", "personnes chez %company%", "company");
    this.nlpManager.addDocument("fr", "équipe de %company%", "company");
    this.nlpManager.addDocument("fr", "collaborateurs de %company%", "company");
    this.nlpManager.addDocument("fr", "salariés de %company%", "company");
    this.nlpManager.addDocument("fr", "staff de %company%", "company");
    this.nlpManager.addDocument("fr", "personnel de %company%", "company");
    this.nlpManager.addDocument("fr", "liste %company%", "company");
    this.nlpManager.addDocument("fr", "cherche %company%", "company");
    this.nlpManager.addDocument("fr", "trouve %company%", "company");
    this.nlpManager.addDocument("fr", "montre %company%", "company");
    this.nlpManager.addDocument("fr", "affiche %company%", "company");
    this.nlpManager.addDocument("fr", "participants entreprise %company%", "company");
    this.nlpManager.addDocument("fr", "qui est dans %company%", "company");
    this.nlpManager.addDocument("fr", "personnes de la société %company%", "company");
    this.nlpManager.addDocument("fr", "liste des emails", "email");
    this.nlpManager.addDocument("fr", "adresses emails", "email");
    this.nlpManager.addDocument("fr", "tous les emails", "email");
    this.nlpManager.addDocument("fr", "export emails", "email");
    this.nlpManager.addDocument("fr", "emails des participants", "email");
    this.nlpManager.addDocument("fr", "adresses mail", "email");
    this.nlpManager.addDocument("fr", "courriels", "email");
    this.nlpManager.addDocument("fr", "contacts email", "email");
    this.nlpManager.addDocument("fr", "listes de diffusion", "email");
    this.nlpManager.addDocument("fr", "carnet adresses", "email");
    this.nlpManager.addDocument("fr", "répertoire email", "email");
    this.nlpManager.addDocument("fr", "annuaire mail", "email");
    this.nlpManager.addDocument("fr", "exporter adresses", "email");
    this.nlpManager.addDocument("fr", "télécharger emails", "email");
    this.nlpManager.addDocument("fr", "récupérer emails", "email");
    this.nlpManager.addDocument("fr", "participants récents", "recent");
    this.nlpManager.addDocument("fr", "derniers participants", "recent");
    this.nlpManager.addDocument("fr", "nouveaux participants", "recent");
    this.nlpManager.addDocument("fr", "inscriptions récentes", "recent");
    this.nlpManager.addDocument("fr", "dernières inscriptions", "recent");
    this.nlpManager.addDocument("fr", "nouveaux arrivants", "recent");
    this.nlpManager.addDocument("fr", "derniers inscrits", "recent");
    this.nlpManager.addDocument("fr", "nouveaux membres", "recent");
    this.nlpManager.addDocument("fr", "récentes adhésions", "recent");
    this.nlpManager.addDocument("fr", "dernières arrivées", "recent");
    this.nlpManager.addDocument("fr", "nouveautés", "recent");
    this.nlpManager.addDocument("fr", "qui vient de s inscrire", "recent");
    this.nlpManager.addDocument("fr", "participants du jour", "recent");
    this.nlpManager.addDocument("fr", "inscriptions du jour", "recent");
    this.nlpManager.addDocument("fr", "ajouts récents", "recent");
    this.nlpManager.addDocument("fr", "cherche %name%", "search");
    this.nlpManager.addDocument("fr", "trouve %name%", "search");
    this.nlpManager.addDocument("fr", "qui est %name%", "search");
    this.nlpManager.addDocument("fr", "recherche %name%", "search");
    this.nlpManager.addDocument("fr", "localise %name%", "search");
    this.nlpManager.addDocument("fr", "où est %name%", "search");
    this.nlpManager.addDocument("fr", "montre moi %name%", "search");
    this.nlpManager.addDocument("fr", "affiche %name%", "search");
    this.nlpManager.addDocument("fr", "infos sur %name%", "search");
    this.nlpManager.addDocument("fr", "informations %name%", "search");
    this.nlpManager.addDocument("fr", "détails %name%", "search");
    this.nlpManager.addDocument("fr", "profil de %name%", "search");
    this.nlpManager.addDocument("fr", "fiche %name%", "search");
    this.nlpManager.addDocument("fr", "contact %name%", "search");
    this.nlpManager.addDocument("fr", "je cherche %name%", "search");
    this.nlpManager.addDocument("fr", "peux tu trouver %name%", "search");
    await this.nlpManager.train();
    this.isNlpTrained = true;
    console.log("🤖 Modèle NLP entraîné avec succès");
  }
  async loadParticipants() {
    try {
      const response = await apiClient.getParticipants();
      this.participants = response.results || response;
      console.log("🤖 Chatbot: Participants chargés:", this.participants.length);
    } catch (error) {
      console.error("🤖 Erreur chargement participants:", error);
    }
  }
  async processMessage(userMessage) {
    console.log("🤖 Début processMessage avec:", userMessage);
    try {
      await this.loadParticipants();
    } catch (error) {
      console.error("🤖 Erreur lors du chargement des participants:", error);
    }
    console.log("🤖 NLP Manager disponible:", !!this.nlpManager, "NLP entraîné:", this.isNlpTrained);
    if (!this.isNlpTrained) {
      console.log("🤖 Attente de l'entraînement NLP...");
      await new Promise((resolve) => {
        const checkInterval = setInterval(() => {
          if (this.isNlpTrained) {
            console.log("🤖 NLP maintenant entraîné !");
            clearInterval(checkInterval);
            resolve();
          }
        }, 100);
      });
    }
    let intent, entities = [], response = { score: 0 };
    if (this.nlpManager) {
      console.log("🤖 Traitement avec NLP.js...");
      try {
        response = await this.nlpManager.process("fr", userMessage);
        intent = response.intent;
        entities = response.entities || [];
        console.log("🤖 Réponse NLP complète:", response);
        console.log("🤖 Intent détecté:", intent, "Confiance:", response.score);
        console.log("🤖 Entités:", entities);
      } catch (error) {
        console.error("🤖 Erreur NLP, fallback manuel:", error);
        intent = this.detectIntentManually(userMessage);
        console.log("🤖 Intent détecté (manuel après erreur):", intent);
      }
    } else {
      console.log("🤖 Traitement avec patterns manuels...");
      intent = this.detectIntentManually(userMessage);
      console.log("🤖 Intent détecté (manuel):", intent);
    }
    console.log("🤖 Traitement de l'intent:", intent);
    try {
      let finalResponse;
      switch (intent) {
        case "greeting":
          finalResponse = this.getRandomResponse(this.responses.greeting);
          break;
        case "help":
          finalResponse = this.responses.help;
          break;
        case "count":
          finalResponse = this.getCountResponse();
          break;
        case "stats":
          finalResponse = this.getStatsResponse();
          break;
        case "active":
          finalResponse = this.getActiveParticipantsResponse();
          break;
        case "company":
          finalResponse = this.getCompanySearchResponseNLP(userMessage, entities);
          break;
        case "email":
          finalResponse = this.getEmailsResponse();
          break;
        case "recent":
          finalResponse = this.getRecentParticipantsResponse();
          break;
        case "search":
          finalResponse = this.searchParticipantsNLP(userMessage, entities);
          break;
        default:
          console.log("🤖 Intent non reconnu ou confiance faible:", intent, "Score:", response.score);
          finalResponse = this.getDefaultResponse();
          break;
      }
      console.log("🤖 Réponse générée:", (finalResponse == null ? void 0 : finalResponse.substring(0, 100)) + "...");
      return finalResponse;
    } catch (error) {
      console.error("🤖 Erreur lors du traitement de l'intent:", error);
      return "😅 Désolé, j'ai rencontré une erreur. Pouvez-vous réessayer ?";
    }
  }
  detectIntentManually(message) {
    const msg = message.toLowerCase().trim();
    const patterns = {
      greeting: /^(salut|hello|hi|bonjour|bonsoir)/i,
      help: /(aide|help|commandes?)/i,
      count: /(combien|nombre).*participants?/i,
      stats: /(statistiques?|stats|résumé)/i,
      active: /(actifs?|activés?)/i,
      company: /(entreprises?|sociétés?|compagnies?|chez)/i,
      email: /(emails?|mails?|adresses?)/i,
      recent: /(récents?|derniers?|nouveaux)/i,
      search: /(qui|quel|trouve|cherche|liste).*(?:participants?|personne)/i
    };
    for (const [intent, pattern] of Object.entries(patterns)) {
      if (pattern.test(msg)) {
        return intent;
      }
    }
    return "None";
  }
  getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
  }
  getCountResponse() {
    const total = this.participants.length;
    const active = this.participants.filter((p) => p.actif).length;
    const inactive = total - active;
    return `📊 **Résumé des participants :**

• **Total :** ${total} participant${total > 1 ? "s" : ""}
• **Actifs :** ${active} 
• **Inactifs :** ${inactive}

${this.getMotivationalMessage()}`;
  }
  getStatsResponse() {
    const total = this.participants.length;
    const active = this.participants.filter((p) => p.actif).length;
    const companies = new Set(this.participants.filter((p) => p.entreprise).map((p) => p.entreprise)).size;
    const withPhone = this.participants.filter((p) => p.telephone).length;
    const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    const todayCount = this.participants.filter(
      (p) => p.date_inscription && p.date_inscription.startsWith(today)
    ).length;
    return `📈 **Statistiques complètes :**

👥 **${total}** participants au total
✅ **${active}** participants actifs  
🏢 **${companies}** entreprises représentées
📞 **${withPhone}** ont un numéro de téléphone
📅 **${todayCount}** inscrits aujourd'hui

${this.getTopCompanies()}`;
  }
  getActiveParticipantsResponse() {
    const activeParticipants = this.participants.filter((p) => p.actif);
    if (activeParticipants.length === 0) {
      return "😔 Aucun participant actif pour le moment.";
    }
    let response = `✅ **${activeParticipants.length} participants actifs :**

`;
    activeParticipants.slice(0, 10).forEach((p, index) => {
      response += `${index + 1}. **${p.nom_complet}** - ${p.entreprise || "Indépendant"}
`;
    });
    if (activeParticipants.length > 10) {
      response += `
*... et ${activeParticipants.length - 10} autres*`;
    }
    return response;
  }
  getCompanySearchResponseNLP(message, entities) {
    let companyName = "";
    const companyPatterns = [
      /(?:chez|entreprise|société|compagnie|boite|firme)\s+([a-zA-Z0-9\s\-\.]+)/i,
      /(?:de\s+la?\s+)?(?:société|entreprise|compagnie)\s+([a-zA-Z0-9\s\-\.]+)/i,
      /(?:participants?|employés?|membres?)\s+(?:de|chez)\s+([a-zA-Z0-9\s\-\.]+)/i
    ];
    for (const pattern of companyPatterns) {
      const match = message.match(pattern);
      if (match) {
        companyName = match[1].trim();
        break;
      }
    }
    if (!companyName) {
      const words = message.toLowerCase().split(" ");
      const companyIndex = words.findIndex((w) => ["chez", "entreprise", "société", "compagnie"].includes(w));
      if (companyIndex !== -1 && companyIndex < words.length - 1) {
        companyName = words.slice(companyIndex + 1).join(" ").trim();
      }
    }
    if (!companyName) {
      return `🤔 Pouvez-vous préciser le nom de l'entreprise ? 
Exemple: *"Qui travaille chez TechCorp ?"*`;
    }
    const companyParticipants = this.participants.filter(
      (p) => p.entreprise && p.entreprise.toLowerCase().includes(companyName.toLowerCase())
    );
    if (companyParticipants.length === 0) {
      return `😕 Aucun participant trouvé pour l'entreprise "${companyName}".

${this.getAvailableCompanies()}`;
    }
    let response = `🏢 **${companyParticipants.length} participant${companyParticipants.length > 1 ? "s" : ""} chez "${companyName}" :**

`;
    companyParticipants.forEach((p, index) => {
      const status = p.actif ? "✅" : "❌";
      response += `${index + 1}. ${status} **${p.nom_complet}** - ${p.poste || "Poste non spécifié"}
`;
    });
    return response;
  }
  getCompanySearchResponse(message) {
    return this.getCompanySearchResponseNLP(message, []);
  }
  getEmailsResponse() {
    if (this.participants.length === 0) {
      return "📧 Aucun participant trouvé.";
    }
    let response = `📧 **Liste des emails (${this.participants.length}) :**

`;
    this.participants.forEach((p, index) => {
      const status = p.actif ? "✅" : "❌";
      response += `${index + 1}. ${status} ${p.email} - *${p.nom_complet}*
`;
    });
    return response;
  }
  getRecentParticipantsResponse() {
    const sortedParticipants = [...this.participants].sort(
      (a, b) => new Date(b.date_inscription) - new Date(a.date_inscription)
    );
    const recent = sortedParticipants.slice(0, 5);
    if (recent.length === 0) {
      return "📅 Aucun participant trouvé.";
    }
    let response = `📅 **Les 5 participants les plus récents :**

`;
    recent.forEach((p, index) => {
      const date = new Date(p.date_inscription).toLocaleDateString("fr-FR");
      const status = p.actif ? "✅" : "❌";
      response += `${index + 1}. ${status} **${p.nom_complet}** - ${p.entreprise || "Indépendant"}
   *Inscrit le ${date}*

`;
    });
    return response;
  }
  searchParticipantsNLP(message, entities) {
    let searchTerms = "";
    const namePatterns = [
      /(?:cherche|trouve|qui\s+est|infos?\s+sur|profil\s+de)\s+([a-zA-Z\-\s]+)/i,
      /(?:contact|détails?|fiche)\s+([a-zA-Z\-\s]+)/i,
      /([a-zA-Z\-\s]+)\s*$/i
      // Nom à la fin de la phrase
    ];
    for (const pattern of namePatterns) {
      const match = message.match(pattern);
      if (match) {
        searchTerms = match[1].trim();
        searchTerms = searchTerms.replace(/^(de|le|la|les|du|des|un|une)\s+/i, "");
        if (searchTerms && searchTerms.length >= 2) {
          break;
        }
      }
    }
    if (!searchTerms || searchTerms.length < 2) {
      searchTerms = message.replace(/(qui|quel|trouve|cherche|liste|participants?|personne|montre|affiche|infos?|informations?|détails?|profil|fiche|contact)/gi, "").trim();
    }
    if (searchTerms.length < 2) {
      return `🔍 Pouvez-vous préciser votre recherche ?
Exemple: *"Qui s'appelle Martin ?"*`;
    }
    const results = this.participants.filter(
      (p) => p.nom_complet.toLowerCase().includes(searchTerms.toLowerCase()) || p.entreprise && p.entreprise.toLowerCase().includes(searchTerms.toLowerCase()) || p.poste && p.poste.toLowerCase().includes(searchTerms.toLowerCase())
    );
    if (results.length === 0) {
      return `🔍 Aucun résultat pour "${searchTerms}".`;
    }
    let response = `🔍 **${results.length} résultat${results.length > 1 ? "s" : ""} pour "${searchTerms}" :**

`;
    results.slice(0, 8).forEach((p, index) => {
      const status = p.actif ? "✅" : "❌";
      response += `${index + 1}. ${status} **${p.nom_complet}**
   ${p.entreprise || "Indépendant"} - ${p.poste || "Poste non spécifié"}
   📧 ${p.email}

`;
    });
    if (results.length > 8) {
      response += `*... et ${results.length - 8} autres résultats*`;
    }
    return response;
  }
  searchParticipants(message) {
    return this.searchParticipantsNLP(message, []);
  }
  getDefaultResponse() {
    const suggestions = [
      "🤔 Je n'ai pas compris votre question. Essayez :",
      '• *"Combien de participants ?"*',
      '• *"Liste des participants actifs"*',
      '• *"Qui travaille chez TechCorp ?"*',
      '• *"Statistiques"*',
      '\n💡 Tapez **"aide"** pour voir toutes les commandes disponibles.'
    ];
    return suggestions.join("\n");
  }
  getMotivationalMessage() {
    const messages = [
      "🚀 Belle communauté !",
      "💪 Votre réseau grandit !",
      "✨ Excellent engagement !",
      "🎯 Beau travail de recrutement !",
      "🌟 Communauté active !"
    ];
    return this.getRandomResponse(messages);
  }
  getTopCompanies() {
    const companies = {};
    this.participants.forEach((p) => {
      if (p.entreprise) {
        companies[p.entreprise] = (companies[p.entreprise] || 0) + 1;
      }
    });
    const sorted = Object.entries(companies).sort(([, a], [, b]) => b - a).slice(0, 3);
    if (sorted.length === 0) return "";
    let response = "\n🏆 **Top entreprises :**\n";
    sorted.forEach(([company, count], index) => {
      const medal = ["🥇", "🥈", "🥉"][index];
      response += `${medal} ${company} (${count})
`;
    });
    return response;
  }
  getAvailableCompanies() {
    const companies = [...new Set(this.participants.filter((p) => p.entreprise).map((p) => p.entreprise))];
    if (companies.length === 0) return "";
    return `🏢 **Entreprises disponibles :** ${companies.slice(0, 5).join(", ")}${companies.length > 5 ? "..." : ""}`;
  }
  // Interface utilisateur du chatbot
  render() {
    this.container.innerHTML = `
      <div id="chatbot-widget" style="position: fixed; bottom: 2rem; right: 2rem; z-index: 1000;">
        <!-- Bouton de toggle -->
        <button id="chatbot-toggle" style="
          width: 60px; 
          height: 60px; 
          border-radius: 50%; 
          background: linear-gradient(135deg, #3b82f6, #1d4ed8); 
          border: none; 
          color: white; 
          cursor: pointer; 
          box-shadow: 0 4px 20px rgba(59, 130, 246, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        " onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
          ${HeroIcons.sparkles.replace("w-6 h-6", "w-6 h-6")}
        </button>

        <!-- Panel du chatbot -->
        <div id="chatbot-panel" style="
          position: absolute;
          bottom: 80px;
          right: 0;
          width: 350px;
          height: 500px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          display: none;
          flex-direction: column;
          overflow: hidden;
        ">
          <!-- Header -->
          <div style="
            padding: 1rem;
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            color: white;
            display: flex;
            align-items: center;
            gap: 0.75rem;
          ">
            ${HeroIcons.sparkles.replace("w-6 h-6", "w-5 h-5")}
            <div>
              <h3 style="margin: 0; font-size: 1rem; font-weight: 600;">Assistant Participants</h3>
              <p style="margin: 0; font-size: 0.75rem; opacity: 0.9;">Posez-moi vos questions !</p>
            </div>
            <button id="chatbot-minimize" style="
              background: none;
              border: none;
              color: white;
              cursor: pointer;
              margin-left: auto;
              padding: 0.25rem;
              border-radius: 4px;
            " onmouseover="this.style.background='rgba(255,255,255,0.2)'" onmouseout="this.style.background='none'">
              ✕
            </button>
          </div>

          <!-- Messages -->
          <div id="chatbot-messages" style="
            flex: 1;
            overflow-y: auto;
            padding: 1rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
          "></div>

          <!-- Input -->
          <div style="
            padding: 1rem;
            border-top: 1px solid #f3f4f6;
            background: rgba(255, 255, 255, 0.8);
          ">
            <div style="display: flex; gap: 0.5rem;">
              <input 
                id="chatbot-input" 
                type="text" 
                placeholder="Posez votre question..." 
                style="
                  flex: 1;
                  padding: 0.75rem;
                  border: 1px solid #e5e7eb;
                  border-radius: 8px;
                  font-size: 0.875rem;
                  outline: none;
                " 
                onkeypress="if(event.key==='Enter') document.getElementById('chatbot-send').click()"
              >
              <button id="chatbot-send" style="
                background: linear-gradient(135deg, #10b981, #059669);
                color: white;
                border: none;
                padding: 0.75rem;
                border-radius: 8px;
                cursor: pointer;
                display: flex;
                align-items: center;
                transition: all 0.2s ease;
              " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    this.attachEventListeners();
    this.addWelcomeMessage();
  }
  attachEventListeners() {
    const toggle = document.getElementById("chatbot-toggle");
    const panel = document.getElementById("chatbot-panel");
    const minimize = document.getElementById("chatbot-minimize");
    const sendBtn = document.getElementById("chatbot-send");
    document.getElementById("chatbot-input");
    toggle.addEventListener("click", () => {
      const isVisible = panel.style.display !== "none";
      if (isVisible) {
        Motion.fadeIn(panel, { from: { opacity: 1, y: 0 }, to: { opacity: 0, y: 20 }, duration: 0.2 });
        setTimeout(() => panel.style.display = "none", 200);
      } else {
        panel.style.display = "flex";
        Motion.fadeIn(panel, { from: { opacity: 0, y: 20 }, to: { opacity: 1, y: 0 }, duration: 0.3 });
      }
    });
    minimize.addEventListener("click", () => {
      Motion.fadeIn(panel, { from: { opacity: 1, y: 0 }, to: { opacity: 0, y: 20 }, duration: 0.2 });
      setTimeout(() => panel.style.display = "none", 200);
    });
    sendBtn.addEventListener("click", () => this.sendMessage());
  }
  addWelcomeMessage() {
    setTimeout(() => {
      if (this.nlpManager && this.isNlpTrained) {
        this.addMessage('👋 Salut ! Je suis votre assistant pour les participants avec **NLP intelligent** ! Tapez **"aide"** pour voir mes commandes !', "bot");
      } else {
        this.addMessage('👋 Salut ! Je suis votre assistant pour les participants. 🧠 **Modèle NLP en cours de chargement...** Tapez **"aide"** pour voir mes commandes !', "bot");
        const checkNLP = setInterval(() => {
          if (this.nlpManager && this.isNlpTrained) {
            this.addMessage("✅ **Modèle NLP intelligent activé !** Vous pouvez maintenant poser vos questions en langage naturel.", "bot");
            clearInterval(checkNLP);
          }
        }, 500);
      }
    }, 1e3);
  }
  async sendMessage() {
    console.log("🤖 sendMessage appelé");
    const input = document.getElementById("chatbot-input");
    const message = input.value.trim();
    console.log("🤖 Message utilisateur:", message);
    if (!message) {
      console.log("🤖 Message vide, abandon");
      return;
    }
    this.addMessage(message, "user");
    input.value = "";
    this.showTyping();
    try {
      console.log("🤖 Début traitement du message...");
      const response = await this.processMessage(message);
      console.log("🤖 Réponse reçue, masquage typing...");
      this.hideTyping();
      console.log("🤖 Ajout de la réponse:", (response == null ? void 0 : response.substring(0, 50)) + "...");
      this.addMessage(response, "bot");
      console.log("🤖 Traitement terminé avec succès");
    } catch (error) {
      console.error("🤖 Erreur dans sendMessage:", error);
      this.hideTyping();
      this.addMessage("😅 Désolé, j'ai rencontré une erreur. Pouvez-vous réessayer ?", "bot");
    }
  }
  addMessage(text, type) {
    const messagesContainer = document.getElementById("chatbot-messages");
    const messageDiv = document.createElement("div");
    const isBot = type === "bot";
    const bgColor = isBot ? "linear-gradient(135deg, #f3f4f6, #e5e7eb)" : "linear-gradient(135deg, #3b82f6, #1d4ed8)";
    const textColor = isBot ? "#374151" : "white";
    const alignment = isBot ? "flex-start" : "flex-end";
    messageDiv.style.cssText = `
      align-self: ${alignment};
      background: ${bgColor};
      color: ${textColor};
      padding: 0.75rem 1rem;
      border-radius: 12px;
      max-width: 85%;
      font-size: 0.875rem;
      line-height: 1.4;
      white-space: pre-wrap;
      word-wrap: break-word;
      opacity: 0;
      transform: translateY(10px);
      transition: all 0.3s ease;
    `;
    messageDiv.innerHTML = this.formatMessage(text);
    messagesContainer.appendChild(messageDiv);
    setTimeout(() => {
      messageDiv.style.opacity = "1";
      messageDiv.style.transform = "translateY(0)";
    }, 10);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
  formatMessage(text) {
    return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\*(.*?)\*/g, "<em>$1</em>").replace(/\n/g, "<br>");
  }
  showTyping() {
    const messagesContainer = document.getElementById("chatbot-messages");
    const typingDiv = document.createElement("div");
    typingDiv.id = "typing-indicator";
    typingDiv.style.cssText = `
      align-self: flex-start;
      background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
      color: #6b7280;
      padding: 0.75rem 1rem;
      border-radius: 12px;
      font-size: 0.875rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    `;
    typingDiv.innerHTML = `
      <div style="
        width: 6px; height: 6px; 
        background: currentColor; 
        border-radius: 50%; 
        animation: pulse 1.5s infinite;
      "></div>
      <div style="
        width: 6px; height: 6px; 
        background: currentColor; 
        border-radius: 50%; 
        animation: pulse 1.5s infinite 0.3s;
      "></div>
      <div style="
        width: 6px; height: 6px; 
        background: currentColor; 
        border-radius: 50%; 
        animation: pulse 1.5s infinite 0.6s;
      "></div>
      ${this.nlpManager && this.isNlpTrained ? "🧠 Assistant analyse..." : "⏳ Assistant traite..."}
    `;
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
  hideTyping() {
    const typing = document.getElementById("typing-indicator");
    if (typing) {
      typing.remove();
    }
  }
}
console.log("🚀 Chargement du module principal...");
let participantList;
let participantForm;
let chatbot;
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
                ${HeroIcons.users.replace("w-6 h-6", "w-4 h-4")}
                <span id="participants-count">Chargement...</span>
              </div>
              <div style="background: #10b981; color: white; padding: 0.5rem 0.75rem; border-radius: 6px; font-size: 0.75rem; font-weight: 500; display: flex; align-items: center; gap: 0.375rem;">
                ${HeroIcons.wifi.replace("w-6 h-6", "w-4 h-4")}
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
                ${HeroIcons.userGroup.replace("w-6 h-6", "w-8 h-8").replace('stroke-width="2"', 'stroke-width="1.5"')}
              </div>
              <h3 style="margin: 0; font-size: 0.875rem; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em;">Total Participants</h3>
              <p style="margin: 0.25rem 0 0 0; font-size: 1.5rem; font-weight: 700; color: #1f2937;" id="total-count">-</p>
            </div>
            <div class="card dashboard-card" style="text-align: center; background: rgba(255,255,255,0.95); backdrop-filter: blur(10px); position: relative; overflow: hidden;" data-animation="fadeIn" data-delay="0.1">
              <div style="position: absolute; top: -10px; right: -10px; width: 60px; height: 60px; background: linear-gradient(135deg, #10b981, #059669); border-radius: 50%; opacity: 0.1;"></div>
              <div style="color: #10b981; margin-bottom: 0.5rem; position: relative; z-index: 1;">
                ${HeroIcons.checkCircle.replace("w-6 h-6", "w-8 h-8").replace('stroke-width="2"', 'stroke-width="1.5"')}
              </div>
              <h3 style="margin: 0; font-size: 0.875rem; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em;">Actifs</h3>
              <p style="margin: 0.25rem 0 0 0; font-size: 1.5rem; font-weight: 700; color: #1f2937;" id="active-count">-</p>
            </div>
            <div class="card dashboard-card" style="text-align: center; background: rgba(255,255,255,0.95); backdrop-filter: blur(10px); position: relative; overflow: hidden;" data-animation="fadeIn" data-delay="0.2">
              <div style="position: absolute; top: -10px; right: -10px; width: 60px; height: 60px; background: linear-gradient(135deg, #f59e0b, #d97706); border-radius: 50%; opacity: 0.1;"></div>
              <div style="color: #f59e0b; margin-bottom: 0.5rem; position: relative; z-index: 1;">
                ${HeroIcons.buildingOffice2.replace("w-6 h-6", "w-8 h-8").replace('stroke-width="2"', 'stroke-width="1.5"')}
              </div>
              <h3 style="margin: 0; font-size: 0.875rem; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em;">Entreprises</h3>
              <p style="margin: 0.25rem 0 0 0; font-size: 1.5rem; font-weight: 700; color: #1f2937;" id="companies-count">-</p>
            </div>
            <div class="card dashboard-card" style="text-align: center; background: rgba(255,255,255,0.95); backdrop-filter: blur(10px); position: relative; overflow: hidden;" data-animation="fadeIn" data-delay="0.3">
              <div style="position: absolute; top: -10px; right: -10px; width: 60px; height: 60px; background: linear-gradient(135deg, #8b5cf6, #7c3aed); border-radius: 50%; opacity: 0.1;"></div>
              <div style="color: #8b5cf6; margin-bottom: 0.5rem; position: relative; z-index: 1;">
                ${HeroIcons.calendar.replace("w-6 h-6", "w-8 h-8").replace('stroke-width="2"', 'stroke-width="1.5"')}
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
    const formContainer = document.getElementById("participant-form-container");
    const listContainer = document.getElementById("participant-list-container");
    const chatbotContainer = document.getElementById("chatbot-container");
    if (!formContainer || !listContainer || !chatbotContainer) {
      console.error("❌ Conteneurs non trouvés !", { formContainer, listContainer, chatbotContainer });
      return;
    }
    const scrollAnimations = new ScrollAnimations();
    const dashboardCards = document.querySelectorAll(".dashboard-card");
    dashboardCards.forEach((card, index) => {
      Motion.hover(card, { scale: 1.03, shadow: true });
      scrollAnimations.observe(card, "fadeIn", index * 0.1);
    });
    console.log("📦 Initialisation des composants...");
    participantForm = new ParticipantForm(formContainer, () => {
      console.log("🔄 Rechargement après ajout...");
      participantList.load();
    });
    participantList = new ParticipantList(listContainer);
    chatbot = new ParticipantChatbot(chatbotContainer);
    window.participantList = participantList;
    window.participantForm = participantForm;
    window.chatbot = chatbot;
    window.apiClient = apiClient;
    console.log("🎯 Rendu des composants...");
    try {
      participantForm.render();
      console.log("✅ Formulaire rendu");
      chatbot.render();
      console.log("✅ Chatbot rendu");
    } catch (error) {
      console.error("❌ Erreur rendu composants:", error);
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
        const counters = {
          "total-count": total,
          "active-count": active,
          "companies-count": companies,
          "today-count": todayCount
        };
        Object.entries(counters).forEach(([id, value]) => {
          const element = document.getElementById(id);
          if (element) {
            const currentValue = parseInt(element.textContent) || 0;
            if (currentValue !== value) {
              Motion.bounceCount(element, value, { startValue: currentValue });
            }
          }
        });
        const participantsCountElement = document.getElementById("participants-count");
        if (participantsCountElement) {
          participantsCountElement.textContent = `${total} participant${total > 1 ? "s" : ""}`;
          Motion.fadeIn(participantsCountElement, { duration: 0.2 });
        }
        console.log("📊 Dashboard mis à jour:", counters);
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
