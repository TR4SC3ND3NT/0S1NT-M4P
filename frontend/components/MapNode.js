export default class MapNode {
  constructor(id, label, x, y) {
    this.id = id;
    this.label = label;
    this.x = x || Math.random() * 800;
    this.y = y || Math.random() * 600;
    this.data = {};
  }

  setData(key, value) {
    this.data[key] = value;
  }

  getData(key) {
    return this.data[key];
  }

  updatePosition(x, y) {
    this.x = x;
    this.y = y;
  }
}
