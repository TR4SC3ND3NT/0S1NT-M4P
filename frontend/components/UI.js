export default class UI {
  constructor(app) {
    this.app = app;
    this.container = document.getElementById('ui-container');
    this.renderMenu();
  }

  renderMenu() {
    const logo = document.createElement('img');
    logo.src = './assets/logo.png';
    logo.className = 'logo';
    this.container.appendChild(logo);

    const panel = document.createElement('div');
    panel.className = 'panel';

    const title = document.createElement('div');
    title.className = 'panel-title';
    title.textContent = 'Add Location';

    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.placeholder = 'Location title';

    const latInput = document.createElement('input');
    latInput.type = 'number';
    latInput.placeholder = 'Latitude';
    latInput.step = 'any';

    const lonInput = document.createElement('input');
    lonInput.type = 'number';
    lonInput.placeholder = 'Longitude';
    lonInput.step = 'any';

    const descInput = document.createElement('textarea');
    descInput.placeholder = 'Description';

    const addBtn = document.createElement('button');
    addBtn.textContent = 'Add Location';
    addBtn.addEventListener('click', () => this.app.api.createLocation({
      title: titleInput.value,
      latitude: parseFloat(latInput.value),
      longitude: parseFloat(lonInput.value),
      description: descInput.value,
    }).then(() => {
      titleInput.value = '';
      latInput.value = '';
      lonInput.value = '';
      descInput.value = '';
    }));

    panel.appendChild(title);
    panel.appendChild(titleInput);
    panel.appendChild(latInput);
    panel.appendChild(lonInput);
    panel.appendChild(descInput);
    panel.appendChild(addBtn);

    this.container.appendChild(panel);
  }

  showNodeDetails(node) {
    const details = this.container.querySelector('.node-details') || document.createElement('div');
    details.className = 'panel node-details';
    details.innerHTML = `
      <div class="panel-title">${node.label}</div>
      <p>ID: ${node.id}</p>
      <p>X: ${node.x.toFixed(2)}</p>
      <p>Y: ${node.y.toFixed(2)}</p>
    `;
    
    if (!this.container.querySelector('.node-details')) {
      this.container.appendChild(details);
    }
  }
}
