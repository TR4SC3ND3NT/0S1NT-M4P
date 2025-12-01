import MapNode from './MapNode.js';
import LinkLine from './LinkLine.js';

export default class UI {
  constructor(api, network, nodesDataSet, edgesDataSet) {
    this.api = api;
    this.network = network;
    this.nodesDataSet = nodesDataSet;
    this.edgesDataSet = edgesDataSet;
    this.loginForm = document.getElementById('login-form');
    this.loginEmail = document.getElementById('login-email');
    this.loginPassword = document.getElementById('login-password');
    this.registerForm = document.getElementById('register-form');
    this.registerEmail = document.getElementById('register-email');
    this.registerPassword = document.getElementById('register-password');
    this.entityForm = document.getElementById('entity-form');
    this.entityType = document.getElementById('entity-type');
    this.entityName = document.getElementById('entity-name');
    this.entityDescription = document.getElementById('entity-description');
    this.statusText = document.getElementById('status-text');
  }

  setStatus(message) {
    this.statusText.textContent = message;
  }

  bindAuth() {
    this.loginForm.addEventListener('submit', async e => {
      e.preventDefault();
      try {
        this.setStatus('Logging in...');
        await this.api.login(this.loginEmail.value, this.loginPassword.value);
        this.setStatus('Logged in');
        await this.loadData();
      } catch (err) {
        this.setStatus('Login failed');
      }
    });

    this.registerForm.addEventListener('submit', async e => {
      e.preventDefault();
      try {
        this.setStatus('Registering...');
        await this.api.register(this.registerEmail.value, this.registerPassword.value);
        this.setStatus('Registered and logged in');
        await this.loadData();
      } catch (err) {
        this.setStatus('Register failed');
      }
    });
  }

  bindEntityForm() {
    this.entityForm.addEventListener('submit', async e => {
      e.preventDefault();
      try {
        const type = this.entityType.value;
        const name = this.entityName.value.trim();
        const description = this.entityDescription.value.trim();
        if (!name) {
          this.setStatus('Name required');
          return;
        }
        this.setStatus('Creating entity...');
        const entity = await this.api.createEntity(type, name, description);
        this.addEntityToGraph(entity);
        this.entityName.value = '';
        this.entityDescription.value = '';
        this.setStatus('Entity created');
      } catch (err) {
        this.setStatus('Failed to create entity');
      }
    });
  }

  addEntityToGraph(entity) {
    const node = new MapNode(entity).toVisNode();
    this.nodesDataSet.add(node);
  }

  addLinkToGraph(link) {
    const edge = new LinkLine(link).toVisEdge();
    this.edgesDataSet.add(edge);
  }

  async loadData() {
    try {
      const entities = await this.api.getEntities();
      const links = await this.api.getLinks();
      this.nodesDataSet.clear();
      this.edgesDataSet.clear();
      entities.forEach(e => this.addEntityToGraph(e));
      links.forEach(l => this.addLinkToGraph(l));
      this.setStatus('Graph updated');
    } catch (err) {
      this.setStatus('Failed to load data');
    }
  }

  async init() {
    this.api.loadTokenFromStorage();
    this.bindAuth();
    this.bindEntityForm();
    if (this.api.token) {
      await this.loadData();
    }
  }
}
