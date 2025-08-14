// Configuration API pour communiquer avec Django
const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://127.0.0.1:8000/api'  // Développement local
  : '/api';  // Production (même domaine)

class ApiClient {
  constructor(baseURL = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    if (config.body && typeof config.body === 'object') {
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
      console.error('API Request Error:', error);
      throw error;
    }
  }

  // Participants endpoints
  async getParticipants() {
    return this.request('/participants/');
  }

  async getParticipant(id) {
    return this.request(`/participants/${id}/`);
  }

  async createParticipant(data) {
    return this.request('/participants/', {
      method: 'POST',
      body: data,
    });
  }

  async updateParticipant(id, data) {
    return this.request(`/participants/${id}/`, {
      method: 'PUT',
      body: data,
    });
  }

  async deleteParticipant(id) {
    return this.request(`/participants/${id}/`, {
      method: 'DELETE',
    });
  }

  async getStats() {
    return this.request('/stats/');
  }
}

export const apiClient = new ApiClient();