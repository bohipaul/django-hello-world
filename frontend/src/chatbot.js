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
    
    // Gestionnaire NLP (chargement dynamique)
    this.nlpManager = null;
    this.isNlpTrained = false;
    
    // Initialiser le modèle NLP de façon asynchrone
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
      // Chargement dynamique des packages NLP.js compatibles navigateur
      const { Nlp } = await import('@nlpjs/nlp');
      const { LangFr } = await import('@nlpjs/lang-fr');
      
      this.nlpManager = new Nlp({ languages: ['fr'], forceNER: true });
      this.nlpManager.use(LangFr);
      
      console.log('🤖 NLP.js chargé avec succès dans le navigateur');
    } catch (error) {
      console.warn('🤖 NLP.js non disponible, fallback vers patterns manuels:', error);
      this.nlpManager = null;
      this.isNlpTrained = true; // Skip NLP training
      return;
    }

    // Salutations - Plus de variantes
    this.nlpManager.addDocument('fr', 'salut', 'greeting');
    this.nlpManager.addDocument('fr', 'hello', 'greeting');
    this.nlpManager.addDocument('fr', 'hi', 'greeting');
    this.nlpManager.addDocument('fr', 'bonjour', 'greeting');
    this.nlpManager.addDocument('fr', 'bonsoir', 'greeting');
    this.nlpManager.addDocument('fr', 'salut tout le monde', 'greeting');
    this.nlpManager.addDocument('fr', 'coucou', 'greeting');
    this.nlpManager.addDocument('fr', 'yo', 'greeting');
    this.nlpManager.addDocument('fr', 'hey', 'greeting');
    this.nlpManager.addDocument('fr', 'bonne journée', 'greeting');
    this.nlpManager.addDocument('fr', 'bonne soirée', 'greeting');
    this.nlpManager.addDocument('fr', 'comment allez vous', 'greeting');
    this.nlpManager.addDocument('fr', 'comment ça va', 'greeting');
    this.nlpManager.addDocument('fr', 'salut assistant', 'greeting');
    this.nlpManager.addDocument('fr', 'bonjour chatbot', 'greeting');

    // Aide - Plus de variantes
    this.nlpManager.addDocument('fr', 'aide', 'help');
    this.nlpManager.addDocument('fr', 'help', 'help');
    this.nlpManager.addDocument('fr', 'commandes', 'help');
    this.nlpManager.addDocument('fr', 'que peux tu faire', 'help');
    this.nlpManager.addDocument('fr', 'comment ça marche', 'help');
    this.nlpManager.addDocument('fr', 'à quoi tu sers', 'help');
    this.nlpManager.addDocument('fr', 'quelles sont tes fonctions', 'help');
    this.nlpManager.addDocument('fr', 'que sais tu faire', 'help');
    this.nlpManager.addDocument('fr', 'montre moi les commandes', 'help');
    this.nlpManager.addDocument('fr', 'liste des fonctionnalités', 'help');
    this.nlpManager.addDocument('fr', 'mode emploi', 'help');
    this.nlpManager.addDocument('fr', 'instruction', 'help');
    this.nlpManager.addDocument('fr', 'guide utilisation', 'help');
    this.nlpManager.addDocument('fr', 'comment je peux te parler', 'help');
    this.nlpManager.addDocument('fr', 'comment utiliser', 'help');

    // Comptage participants - Plus de variantes
    this.nlpManager.addDocument('fr', 'combien de participants', 'count');
    this.nlpManager.addDocument('fr', 'nombre de participants', 'count');
    this.nlpManager.addDocument('fr', 'total participants', 'count');
    this.nlpManager.addDocument('fr', 'combien il y a de participants', 'count');
    this.nlpManager.addDocument('fr', 'quel est le nombre de participants', 'count');
    this.nlpManager.addDocument('fr', 'combien sont ils', 'count');
    this.nlpManager.addDocument('fr', 'combien de personnes', 'count');
    this.nlpManager.addDocument('fr', 'nombre total', 'count');
    this.nlpManager.addDocument('fr', 'effectif total', 'count');
    this.nlpManager.addDocument('fr', 'quantité participants', 'count');
    this.nlpManager.addDocument('fr', 'combien avez vous de participants', 'count');
    this.nlpManager.addDocument('fr', 'combien y a t il de membres', 'count');
    this.nlpManager.addDocument('fr', 'nombre de membres', 'count');
    this.nlpManager.addDocument('fr', 'compte participants', 'count');
    this.nlpManager.addDocument('fr', 'décompte', 'count');

    // Statistiques - Plus de variantes
    this.nlpManager.addDocument('fr', 'statistiques', 'stats');
    this.nlpManager.addDocument('fr', 'stats', 'stats');
    this.nlpManager.addDocument('fr', 'résumé', 'stats');
    this.nlpManager.addDocument('fr', 'bilan', 'stats');
    this.nlpManager.addDocument('fr', 'aperçu général', 'stats');
    this.nlpManager.addDocument('fr', 'rapport complet', 'stats');
    this.nlpManager.addDocument('fr', 'vue d ensemble', 'stats');
    this.nlpManager.addDocument('fr', 'synthèse', 'stats');
    this.nlpManager.addDocument('fr', 'données complètes', 'stats');
    this.nlpManager.addDocument('fr', 'informations détaillées', 'stats');
    this.nlpManager.addDocument('fr', 'tableau de bord', 'stats');
    this.nlpManager.addDocument('fr', 'dashboard', 'stats');
    this.nlpManager.addDocument('fr', 'analyse', 'stats');
    this.nlpManager.addDocument('fr', 'métriques', 'stats');
    this.nlpManager.addDocument('fr', 'indicateurs', 'stats');

    // Participants actifs - Plus de variantes
    this.nlpManager.addDocument('fr', 'participants actifs', 'active');
    this.nlpManager.addDocument('fr', 'liste des actifs', 'active');
    this.nlpManager.addDocument('fr', 'qui est actif', 'active');
    this.nlpManager.addDocument('fr', 'participants activés', 'active');
    this.nlpManager.addDocument('fr', 'membres actifs', 'active');
    this.nlpManager.addDocument('fr', 'personnes actives', 'active');
    this.nlpManager.addDocument('fr', 'utilisateurs actifs', 'active');
    this.nlpManager.addDocument('fr', 'comptes activés', 'active');
    this.nlpManager.addDocument('fr', 'profils actifs', 'active');
    this.nlpManager.addDocument('fr', 'participants en activité', 'active');
    this.nlpManager.addDocument('fr', 'membres en ligne', 'active');
    this.nlpManager.addDocument('fr', 'qui participe activement', 'active');
    this.nlpManager.addDocument('fr', 'liste participants opérationnels', 'active');
    this.nlpManager.addDocument('fr', 'montre moi les actifs', 'active');
    this.nlpManager.addDocument('fr', 'affiche les membres actifs', 'active');

    // Recherche par entreprise - Plus de variantes avec entités
    this.nlpManager.addDocument('fr', 'qui travaille chez %company%', 'company');
    this.nlpManager.addDocument('fr', 'participants de %company%', 'company');
    this.nlpManager.addDocument('fr', 'employés de %company%', 'company');
    this.nlpManager.addDocument('fr', 'membres de %company%', 'company');
    this.nlpManager.addDocument('fr', 'personnes chez %company%', 'company');
    this.nlpManager.addDocument('fr', 'équipe de %company%', 'company');
    this.nlpManager.addDocument('fr', 'collaborateurs de %company%', 'company');
    this.nlpManager.addDocument('fr', 'salariés de %company%', 'company');
    this.nlpManager.addDocument('fr', 'staff de %company%', 'company');
    this.nlpManager.addDocument('fr', 'personnel de %company%', 'company');
    this.nlpManager.addDocument('fr', 'liste %company%', 'company');
    this.nlpManager.addDocument('fr', 'cherche %company%', 'company');
    this.nlpManager.addDocument('fr', 'trouve %company%', 'company');
    this.nlpManager.addDocument('fr', 'montre %company%', 'company');
    this.nlpManager.addDocument('fr', 'affiche %company%', 'company');
    this.nlpManager.addDocument('fr', 'participants entreprise %company%', 'company');
    this.nlpManager.addDocument('fr', 'qui est dans %company%', 'company');
    this.nlpManager.addDocument('fr', 'personnes de la société %company%', 'company');

    // Emails - Plus de variantes
    this.nlpManager.addDocument('fr', 'liste des emails', 'email');
    this.nlpManager.addDocument('fr', 'adresses emails', 'email');
    this.nlpManager.addDocument('fr', 'tous les emails', 'email');
    this.nlpManager.addDocument('fr', 'export emails', 'email');
    this.nlpManager.addDocument('fr', 'emails des participants', 'email');
    this.nlpManager.addDocument('fr', 'adresses mail', 'email');
    this.nlpManager.addDocument('fr', 'courriels', 'email');
    this.nlpManager.addDocument('fr', 'contacts email', 'email');
    this.nlpManager.addDocument('fr', 'listes de diffusion', 'email');
    this.nlpManager.addDocument('fr', 'carnet adresses', 'email');
    this.nlpManager.addDocument('fr', 'répertoire email', 'email');
    this.nlpManager.addDocument('fr', 'annuaire mail', 'email');
    this.nlpManager.addDocument('fr', 'exporter adresses', 'email');
    this.nlpManager.addDocument('fr', 'télécharger emails', 'email');
    this.nlpManager.addDocument('fr', 'récupérer emails', 'email');

    // Participants récents - Plus de variantes
    this.nlpManager.addDocument('fr', 'participants récents', 'recent');
    this.nlpManager.addDocument('fr', 'derniers participants', 'recent');
    this.nlpManager.addDocument('fr', 'nouveaux participants', 'recent');
    this.nlpManager.addDocument('fr', 'inscriptions récentes', 'recent');
    this.nlpManager.addDocument('fr', 'dernières inscriptions', 'recent');
    this.nlpManager.addDocument('fr', 'nouveaux arrivants', 'recent');
    this.nlpManager.addDocument('fr', 'derniers inscrits', 'recent');
    this.nlpManager.addDocument('fr', 'nouveaux membres', 'recent');
    this.nlpManager.addDocument('fr', 'récentes adhésions', 'recent');
    this.nlpManager.addDocument('fr', 'dernières arrivées', 'recent');
    this.nlpManager.addDocument('fr', 'nouveautés', 'recent');
    this.nlpManager.addDocument('fr', 'qui vient de s inscrire', 'recent');
    this.nlpManager.addDocument('fr', 'participants du jour', 'recent');
    this.nlpManager.addDocument('fr', 'inscriptions du jour', 'recent');
    this.nlpManager.addDocument('fr', 'ajouts récents', 'recent');

    // Recherche générale - Plus de variantes avec entités
    this.nlpManager.addDocument('fr', 'cherche %name%', 'search');
    this.nlpManager.addDocument('fr', 'trouve %name%', 'search');
    this.nlpManager.addDocument('fr', 'qui est %name%', 'search');
    this.nlpManager.addDocument('fr', 'recherche %name%', 'search');
    this.nlpManager.addDocument('fr', 'localise %name%', 'search');
    this.nlpManager.addDocument('fr', 'où est %name%', 'search');
    this.nlpManager.addDocument('fr', 'montre moi %name%', 'search');
    this.nlpManager.addDocument('fr', 'affiche %name%', 'search');
    this.nlpManager.addDocument('fr', 'infos sur %name%', 'search');
    this.nlpManager.addDocument('fr', 'informations %name%', 'search');
    this.nlpManager.addDocument('fr', 'détails %name%', 'search');
    this.nlpManager.addDocument('fr', 'profil de %name%', 'search');
    this.nlpManager.addDocument('fr', 'fiche %name%', 'search');
    this.nlpManager.addDocument('fr', 'contact %name%', 'search');
    this.nlpManager.addDocument('fr', 'je cherche %name%', 'search');
    this.nlpManager.addDocument('fr', 'peux tu trouver %name%', 'search');

    // Note: Les entités nommées seront extraites par des patterns dans les méthodes de traitement
    // Cette version de @nlpjs/nlp fonctionne principalement avec la classification d'intentions

    // Entraîner le modèle
    await this.nlpManager.train();
    this.isNlpTrained = true;
    console.log('🤖 Modèle NLP entraîné avec succès');
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
    console.log('🤖 Début processMessage avec:', userMessage);
    
    try {
      await this.loadParticipants();
    } catch (error) {
      console.error('🤖 Erreur lors du chargement des participants:', error);
    }
    
    // Attendre que le modèle NLP soit entraîné
    console.log('🤖 NLP Manager disponible:', !!this.nlpManager, 'NLP entraîné:', this.isNlpTrained);
    
    if (!this.isNlpTrained) {
      console.log('🤖 Attente de l\'entraînement NLP...');
      await new Promise(resolve => {
        const checkInterval = setInterval(() => {
          if (this.isNlpTrained) {
            console.log('🤖 NLP maintenant entraîné !');
            clearInterval(checkInterval);
            resolve();
          }
        }, 100);
      });
    }

    let intent, entities = [], response = { score: 0 };

    // Analyser le message avec NLP.js si disponible
    if (this.nlpManager) {
      console.log('🤖 Traitement avec NLP.js...');
      try {
        response = await this.nlpManager.process('fr', userMessage);
        intent = response.intent;
        entities = response.entities || [];
        
        console.log('🤖 Réponse NLP complète:', response);
        console.log('🤖 Intent détecté:', intent, 'Confiance:', response.score);
        console.log('🤖 Entités:', entities);
      } catch (error) {
        console.error('🤖 Erreur NLP, fallback manuel:', error);
        intent = this.detectIntentManually(userMessage);
        console.log('🤖 Intent détecté (manuel après erreur):', intent);
      }
    } else {
      // Fallback vers patterns manuels
      console.log('🤖 Traitement avec patterns manuels...');
      intent = this.detectIntentManually(userMessage);
      console.log('🤖 Intent détecté (manuel):', intent);
    }

    // Traiter selon l'intention détectée
    switch (intent) {
      case 'greeting':
        return this.getRandomResponse(this.responses.greeting);
      
      case 'help':
        return this.responses.help;
      
      case 'count':
        return this.getCountResponse();
      
      case 'stats':
        return this.getStatsResponse();
      
      case 'active':
        return this.getActiveParticipantsResponse();
      
      case 'company':
        return this.getCompanySearchResponseNLP(userMessage, entities);
      
      case 'email':
        return this.getEmailsResponse();
      
      case 'recent':
        return this.getRecentParticipantsResponse();
      
      case 'search':
        return this.searchParticipantsNLP(userMessage, entities);
      
      default:
        // Si la confiance est trop faible, utiliser la réponse par défaut
        if (response.score < 0.5) {
          return this.getDefaultResponse();
        }
        return this.getDefaultResponse();
    }
  }

  detectIntentManually(message) {
    const msg = message.toLowerCase().trim();
    
    // Patterns manuels de fallback
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
    
    return 'None';
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

  getCompanySearchResponseNLP(message, entities) {
    let companyName = '';
    
    // Extraction intelligente du nom d'entreprise
    // Patterns pour détecter les entreprises
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
    
    // Si aucun pattern trouvé, essayer une extraction plus générale
    if (!companyName) {
      const words = message.toLowerCase().split(' ');
      const companyIndex = words.findIndex(w => ['chez', 'entreprise', 'société', 'compagnie'].includes(w));
      if (companyIndex !== -1 && companyIndex < words.length - 1) {
        companyName = words.slice(companyIndex + 1).join(' ').trim();
      }
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

  getCompanySearchResponse(message) {
    // Méthode legacy conservée pour compatibilité
    return this.getCompanySearchResponseNLP(message, []);
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

  searchParticipantsNLP(message, entities) {
    let searchTerms = '';
    
    // Extraction intelligente du nom recherché
    // Patterns pour détecter les noms de personnes
    const namePatterns = [
      /(?:cherche|trouve|qui\s+est|infos?\s+sur|profil\s+de)\s+([a-zA-Z\-\s]+)/i,
      /(?:contact|détails?|fiche)\s+([a-zA-Z\-\s]+)/i,
      /([a-zA-Z\-\s]+)\s*$/i // Nom à la fin de la phrase
    ];
    
    for (const pattern of namePatterns) {
      const match = message.match(pattern);
      if (match) {
        searchTerms = match[1].trim();
        // Nettoyer les mots de liaison
        searchTerms = searchTerms.replace(/^(de|le|la|les|du|des|un|une)\s+/i, '');
        if (searchTerms && searchTerms.length >= 2) {
          break;
        }
      }
    }
    
    // Si aucun pattern trouvé, extraction générale
    if (!searchTerms || searchTerms.length < 2) {
      searchTerms = message.replace(/(qui|quel|trouve|cherche|liste|participants?|personne|montre|affiche|infos?|informations?|détails?|profil|fiche|contact)/gi, '').trim();
    }
    
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

  searchParticipants(message) {
    // Méthode legacy conservée pour compatibilité
    return this.searchParticipantsNLP(message, []);
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
      if (this.nlpManager && this.isNlpTrained) {
        this.addMessage("👋 Salut ! Je suis votre assistant pour les participants avec **NLP intelligent** ! Tapez **\"aide\"** pour voir mes commandes !", 'bot');
      } else {
        this.addMessage("👋 Salut ! Je suis votre assistant pour les participants. 🧠 **Modèle NLP en cours de chargement...** Tapez **\"aide\"** pour voir mes commandes !", 'bot');
        
        // Vérifier quand le modèle NLP est prêt
        const checkNLP = setInterval(() => {
          if (this.nlpManager && this.isNlpTrained) {
            this.addMessage("✅ **Modèle NLP intelligent activé !** Vous pouvez maintenant poser vos questions en langage naturel.", 'bot');
            clearInterval(checkNLP);
          }
        }, 500);
      }
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
      ${this.nlpManager && this.isNlpTrained ? '🧠 Assistant analyse...' : '⏳ Assistant traite...'}
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