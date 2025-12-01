export default class LinkLine {
  constructor(fromId, toId, type = 'related') {
    this.fromId = fromId;
    this.toId = toId;
    this.type = type;
    this.strength = 1;
  }

  setStrength(value) {
    this.strength = Math.max(0, Math.min(1, value));
  }

  getStrength() {
    return this.strength;
  }
}
