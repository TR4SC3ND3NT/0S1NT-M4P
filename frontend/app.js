import Api from './components/Api.js';
import UI from './components/UI.js';

const nodes = new vis.DataSet([]);
const edges = new vis.DataSet([]);

const container = document.getElementById('graph');

const data = {
  nodes,
  edges
};

const options = {
  autoResize: true,
  nodes: {
    shape: 'dot',
    size: 16,
    font: {
      color: '#e5e7eb',
      size: 14
    },
    borderWidth: 1
  },
  edges: {
    width: 1,
    length: 200,
    smooth: {
      type: 'continuous'
    },
    font: {
      size: 10,
      color: '#9ca3af',
      align: 'horizontal'
    }
  },
  groups: {
    PERSON: {
      color: { background: '#22c55e', border: '#15803d' }
    },
    LOCATION: {
      color: { background: '#3b82f6', border: '#1d4ed8' }
    },
    DOMAIN: {
      color: { background: '#a855f7', border: '#7e22ce' }
    }
  },
  physics: {
    enabled: true,
    stabilization: {
      iterations: 150
    }
  },
  interaction: {
    hover: true,
    tooltipDelay: 120
  }
};

const network = new vis.Network(container, data, options);

const apiBase = 'http://localhost:4000/api';

const api = new Api(apiBase);

const ui = new UI(api, network, nodes, edges);

ui.init();
