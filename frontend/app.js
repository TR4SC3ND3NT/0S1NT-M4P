import MapNode from './components/MapNode.js';
import LinkLine from './components/LinkLine.js';
import UI from './components/UI.js';
import Api from './components/Api.js';

class App {
  constructor() {
    this.nodes = [];
    this.links = [];
    this.selectedNode = null;
    this.api = new Api();
    this.ui = new UI(this);
    this.initSVG();
    this.loadData();
  }

  initSVG() {
    const container = document.getElementById('map-container');
    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.svg.setAttribute('width', container.clientWidth);
    this.svg.setAttribute('height', container.clientHeight);
    container.appendChild(this.svg);

    this.linksGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    this.nodesGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    this.svg.appendChild(this.linksGroup);
    this.svg.appendChild(this.nodesGroup);
  }

  async loadData() {
    try {
      const locations = await this.api.getLocations();
      locations.forEach(loc => this.addNode(loc));
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  }

  addNode(data) {
    const node = new MapNode(data.id, data.title, data.latitude, data.longitude);
    this.nodes.push(node);
    this.renderNode(node);
  }

  renderNode(node) {
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    group.setAttribute('class', 'node');
    group.setAttribute('data-id', node.id);

    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', node.x);
    circle.setAttribute('cy', node.y);
    circle.setAttribute('r', '5');

    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', node.x + 10);
    text.setAttribute('y', node.y + 5);
    text.textContent = node.label;

    group.appendChild(circle);
    group.appendChild(text);
    group.addEventListener('click', () => this.selectNode(node));

    this.nodesGroup.appendChild(group);
  }

  selectNode(node) {
    this.selectedNode = node;
    this.ui.showNodeDetails(node);
  }

  addLink(fromId, toId) {
    const link = new LinkLine(fromId, toId);
    this.links.push(link);
    this.renderLink(link);
  }

  renderLink(link) {
    const fromNode = this.nodes.find(n => n.id === link.fromId);
    const toNode = this.nodes.find(n => n.id === link.toId);

    if (fromNode && toNode) {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('class', 'link');
      line.setAttribute('x1', fromNode.x);
      line.setAttribute('y1', fromNode.y);
      line.setAttribute('x2', toNode.x);
      line.setAttribute('y2', toNode.y);

      this.linksGroup.appendChild(line);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new App();
});
