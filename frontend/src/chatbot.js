import { apiClient } from './api.js';
import { HeroIcons } from './heroicons.js';
import { Motion } from './animations.js';

export class ParticipantChatbot {
  constructor(container) {
    this.container = container;
    this.messages = [];
    this.participants = [];
    this.isTyping = false;
    this.isMinimized = false;
    
    // Patterns de reconnaissance pour les questions
    this.patterns = {
      greeting: /^(salut|hello|hi|bonjour|bonsoir)/i,
      count: /(combien|nombre).*participants?/i,
      search: /(qui|quel|trouve|cherche|liste).*(?:participants?|personne)/i,
      active: /(actifs?|activés?)/i,
      company: /(entreprises?|sociétés?|compagnies?)/i,
      email: /(emails?|mails?|adresses?)/i,
      phone: /(téléphones?|numéros?)/i,
      help: /(aide|help|commandes?)/i,
      stats: /(statistiques?|stats|résumé)/i,
      recent: /(récents?|derniers?|nouveaux)/i
    };

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

  async loadParticipants() {
    try {
      const response = await apiClient.getParticipants();
      this.participants = response.results || response;
      console.log('🤖 Chatbot: Participants chargés:', this.participants.length);
    } catch (error) {
      console.error('🤖 Erreur chargement participants:', error);
    }
  }

  async processMessage(userMessage) {
    await this.loadParticipants();
    
    const message = userMessage.toLowerCase().trim();
    
    // Salutations
    if (this.patterns.greeting.test(message)) {
      return this.getRandomResponse(this.responses.greeting);
    }

    // Aide
    if (this.patterns.help.test(message)) {
      return this.responses.help;
    }

    // Comptage total
    if (this.patterns.count.test(message) && !this.patterns.company.test(message)) {
      return this.getCountResponse();
    }

    // Statistiques
    if (this.patterns.stats.test(message)) {
      return this.getStatsResponse();
    }

    // Participants actifs
    if (this.patterns.active.test(message)) {
      return this.getActiveParticipantsResponse();
    }

    // Recherche par entreprise
    if (this.patterns.company.test(message) || message.includes('chez ')) {
      return this.getCompanySearchResponse(message);
    }

    // Liste des emails
    if (this.patterns.email.test(message)) {
      return this.getEmailsResponse();
    }

    // Participants récents
    if (this.patterns.recent.test(message)) {
      return this.getRecentParticipantsResponse();
    }

    // Recherche par nom
    if (this.patterns.search.test(message)) {
      return this.searchParticipants(message);
    }

    // Réponse par défaut
    return this.getDefaultResponse();
  }

  getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
  }

  getCountResponse() {
    const total = this.participants.length;
    const active = this.participants.filter(p => p.actif).length;
    const inactive = total - active;
    
    return `📊 **Résumé des participants :**

• **Total :** ${total} participant${total > 1 ? 's' : ''}
• **Actifs :** ${active} 
• **Inactifs :** ${inactive}

${this.getMotivationalMessage()}`;
  }

  getStatsResponse() {
    const total = this.participants.length;
    const active = this.participants.filter(p => p.actif).length;
    const companies = new Set(this.participants.filter(p => p.entreprise).map(p => p.entreprise)).size;
    const withPhone = this.participants.filter(p => p.telephone).length;
    const today = new Date().toISOString().split('T')[0];
    const todayCount = this.participants.filter(p => 
      p.date_inscription && p.date_inscription.startsWith(today)
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
    const activeParticipants = this.participants.filter(p => p.actif);
    
    if (activeParticipants.length === 0) {
      return "😔 Aucun participant actif pour le moment.";
    }

    let response = `✅ **${activeParticipants.length} participants actifs :**\n\n`;
    
    activeParticipants.slice(0, 10).forEach((p, index) => {
      response += `${index + 1}. **${p.nom_complet}** - ${p.entreprise || 'Indépendant'}\n`;
    });

    if (activeParticipants.length > 10) {
      response += `\n*... et ${activeParticipants.length - 10} autres*`;
    }

    return response;
  }

  getCompanySearchResponse(message) {
    // Extraire le nom de l'entreprise de la question
    const companyMatch = message.match(/(?:chez|entreprise|société)\s+([a-zA-Z0-9\s]+)/i);
    let companyName = companyMatch ? companyMatch[1].trim() : '';
    
    if (!companyName) {
      // Si pas trouvé, chercher tous les mots après "chez"
      const chezMatch = message.match(/chez\s+(.+)/i);
      companyName = chezMatch ? chezMatch[1].trim() : '';
    }

    if (!companyName) {
      return "🤔 Pouvez-vous préciser le nom de l'entreprise ? \nExemple: *\"Qui travaille chez TechCorp ?\"*";
    }

    const companyParticipants = this.participants.filter(p => 
      p.entreprise && p.entreprise.toLowerCase().includes(companyName.toLowerCase())
    );

    if (companyParticipants.length === 0) {
      return `😕 Aucun participant trouvé pour l'entreprise "${companyName}".\n\n${this.getAvailableCompanies()}`;
    }

    let response = `🏢 **${companyParticipants.length} participant${companyParticipants.length > 1 ? 's' : ''} chez "${companyName}" :**\n\n`;
    
    companyParticipants.forEach((p, index) => {
      const status = p.actif ? '✅' : '❌';
      response += `${index + 1}. ${status} **${p.nom_complet}** - ${p.poste || 'Poste non spécifié'}\n`;
    });

    return response;
  }

  getEmailsResponse() {
    if (this.participants.length === 0) {
      return "📧 Aucun participant trouvé.";
    }

    let response = `📧 **Liste des emails (${this.participants.length}) :**\n\n`;
    
    this.participants.forEach((p, index) => {
      const status = p.actif ? '✅' : '❌';
      response += `${index + 1}. ${status} ${p.email} - *${p.nom_complet}*\n`;
    });

    return response;
  }

  getRecentParticipantsResponse() {
    // Trier par date d'inscription décroissante
    const sortedParticipants = [...this.participants].sort((a, b) => 
      new Date(b.date_inscription) - new Date(a.date_inscription)
    );

    const recent = sortedParticipants.slice(0, 5);
    
    if (recent.length === 0) {
      return "📅 Aucun participant trouvé.";
    }

    let response = `📅 **Les 5 participants les plus récents :**\n\n`;
    
    recent.forEach((p, index) => {
      const date = new Date(p.date_inscription).toLocaleDateString('fr-FR');
      const status = p.actif ? '✅' : '❌';
      response += `${index + 1}. ${status} **${p.nom_complet}** - ${p.entreprise || 'Indépendant'}\n   *Inscrit le ${date}*\n\n`;
    });

    return response;
  }

  searchParticipants(message) {
    // Extraire des mots-clés de la recherche
    const searchTerms = message.replace(/(qui|quel|trouve|cherche|liste|participants?|personne)/gi, '').trim();
    
    if (searchTerms.length < 2) {
      return "🔍 Pouvez-vous préciser votre recherche ?\nExemple: *\"Qui s'appelle Martin ?\"*";
    }

    const results = this.participants.filter(p => 
      p.nom_complet.toLowerCase().includes(searchTerms.toLowerCase()) ||
      (p.entreprise && p.entreprise.toLowerCase().includes(searchTerms.toLowerCase())) ||
      (p.poste && p.poste.toLowerCase().includes(searchTerms.toLowerCase()))
    );

    if (results.length === 0) {
      return `🔍 Aucun résultat pour "${searchTerms}".`;
    }

    let response = `🔍 **${results.length} résultat${results.length > 1 ? 's' : ''} pour "${searchTerms}" :**\n\n`;
    
    results.slice(0, 8).forEach((p, index) => {
      const status = p.actif ? '✅' : '❌';
      response += `${index + 1}. ${status} **${p.nom_complet}**\n   ${p.entreprise || 'Indépendant'} - ${p.poste || 'Poste non spécifié'}\n   📧 ${p.email}\n\n`;
    });

    if (results.length > 8) {
      response += `*... et ${results.length - 8} autres résultats*`;
    }

    return response;
  }

  getDefaultResponse() {
    const suggestions = [
      "🤔 Je n'ai pas compris votre question. Essayez :",
      "• *\"Combien de participants ?\"*",
      "• *\"Liste des participants actifs\"*", 
      "• *\"Qui travaille chez TechCorp ?\"*",
      "• *\"Statistiques\"*",
      "\n💡 Tapez **\"aide\"** pour voir toutes les commandes disponibles."
    ];
    
    return suggestions.join('\n');
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
    this.participants.forEach(p => {
      if (p.entreprise) {
        companies[p.entreprise] = (companies[p.entreprise] || 0) + 1;
      }
    });

    const sorted = Object.entries(companies)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3);

    if (sorted.length === 0) return "";

    let response = "\n🏆 **Top entreprises :**\n";
    sorted.forEach(([company, count], index) => {
      const medal = ['🥇', '🥈', '🥉'][index];
      response += `${medal} ${company} (${count})\n`;
    });

    return response;
  }

  getAvailableCompanies() {
    const companies = [...new Set(this.participants.filter(p => p.entreprise).map(p => p.entreprise))];
    
    if (companies.length === 0) return "";
    
    return `🏢 **Entreprises disponibles :** ${companies.slice(0, 5).join(', ')}${companies.length > 5 ? '...' : ''}`;
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
          ${HeroIcons.sparkles.replace('w-6 h-6', 'w-6 h-6')}
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
            ${HeroIcons.sparkles.replace('w-6 h-6', 'w-5 h-5')}
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
    const toggle = document.getElementById('chatbot-toggle');
    const panel = document.getElementById('chatbot-panel');
    const minimize = document.getElementById('chatbot-minimize');
    const sendBtn = document.getElementById('chatbot-send');
    const input = document.getElementById('chatbot-input');

    toggle.addEventListener('click', () => {
      const isVisible = panel.style.display !== 'none';
      if (isVisible) {
        Motion.fadeIn(panel, { from: { opacity: 1, y: 0 }, to: { opacity: 0, y: 20 }, duration: 0.2 });
        setTimeout(() => panel.style.display = 'none', 200);
      } else {
        panel.style.display = 'flex';
        Motion.fadeIn(panel, { from: { opacity: 0, y: 20 }, to: { opacity: 1, y: 0 }, duration: 0.3 });
      }
    });

    minimize.addEventListener('click', () => {
      Motion.fadeIn(panel, { from: { opacity: 1, y: 0 }, to: { opacity: 0, y: 20 }, duration: 0.2 });
      setTimeout(() => panel.style.display = 'none', 200);
    });

    sendBtn.addEventListener('click', () => this.sendMessage());
  }

  addWelcomeMessage() {
    setTimeout(() => {
      this.addMessage("👋 Salut ! Je suis votre assistant pour les participants. Tapez **\"aide\"** pour voir mes commandes !", 'bot');
    }, 1000);
  }

  async sendMessage() {
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();
    
    if (!message) return;

    // Ajouter le message utilisateur
    this.addMessage(message, 'user');
    input.value = '';

    // Montrer que le bot tape
    this.showTyping();

    // Traiter la réponse
    try {
      const response = await this.processMessage(message);
      this.hideTyping();
      this.addMessage(response, 'bot');
    } catch (error) {
      this.hideTyping();
      this.addMessage("😅 Désolé, j'ai rencontré une erreur. Pouvez-vous réessayer ?", 'bot');
    }
  }

  addMessage(text, type) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageDiv = document.createElement('div');
    
    const isBot = type === 'bot';
    const bgColor = isBot ? 'linear-gradient(135deg, #f3f4f6, #e5e7eb)' : 'linear-gradient(135deg, #3b82f6, #1d4ed8)';
    const textColor = isBot ? '#374151' : 'white';
    const alignment = isBot ? 'flex-start' : 'flex-end';
    
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
    
    // Animation d'apparition
    setTimeout(() => {
      messageDiv.style.opacity = '1';
      messageDiv.style.transform = 'translateY(0)';
    }, 10);
    
    // Scroll vers le bas
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  formatMessage(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // **text** -> bold
      .replace(/\*(.*?)\*/g, '<em>$1</em>') // *text* -> italic
      .replace(/\n/g, '<br>'); // nouvelles lignes
  }

  showTyping() {
    const messagesContainer = document.getElementById('chatbot-messages');
    const typingDiv = document.createElement('div');
    typingDiv.id = 'typing-indicator';
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
      Assistant tape...
    `;
    
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  hideTyping() {
    const typing = document.getElementById('typing-indicator');
    if (typing) {
      typing.remove();
    }
  }
}