export default class Api {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.token = null;
  }

  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('osint_map_token', token);
    } else {
      localStorage.removeItem('osint_map_token');
    }
  }

  loadTokenFromStorage() {
    const token = localStorage.getItem('osint_map_token');
    if (token) {
      this.token = token;
    }
  }

  getHeaders(auth) {
    const headers = { 'Content-Type': 'application/json' };
    if (auth && this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    return headers;
  }

  async register(email, password) {
    const res = await fetch(`${this.baseUrl}/auth/register`, {
      method: 'POST',
      headers: this.getHeaders(false),
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) {
      throw new Error('Register failed');
    }
    const data = await res.json();
    if (data.token) {
      this.setToken(data.token);
    }
    return data;
  }

  async login(email, password) {
    const res = await fetch(`${this.baseUrl}/auth/login`, {
      method: 'POST',
      headers: this.getHeaders(false),
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) {
      throw new Error('Login failed');
    }
    const data = await res.json();
    if (data.token) {
      this.setToken(data.token);
    }
    return data;
  }

  async getEntities() {
    const res = await fetch(`${this.baseUrl}/entities`, {
      headers: this.getHeaders(true)
    });
    if (!res.ok) {
      throw new Error('Failed to load entities');
    }
    return res.json();
  }

  async createEntity(type, name, description) {
    const res = await fetch(`${this.baseUrl}/entities`, {
      method: 'POST',
      headers: this.getHeaders(true),
      body: JSON.stringify({ type, name, description })
    });
    if (!res.ok) {
      throw new Error('Failed to create entity');
    }
    return res.json();
  }

  async getLinks() {
    const res = await fetch(`${this.baseUrl}/links`, {
      headers: this.getHeaders(true)
    });
    if (!res.ok) {
      throw new Error('Failed to load links');
    }
    return res.json();
  }

  async createLink(fromId, toId, type) {
    const res = await fetch(`${this.baseUrl}/links`, {
      method: 'POST',
      headers: this.getHeaders(true),
      body: JSON.stringify({ fromId, toId, type })
    });
    if (!res.ok) {
      throw new Error('Failed to create link');
    }
    return res.json();
  }
}
