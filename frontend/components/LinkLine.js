export default class LinkLine {
  constructor(link) {
    this.id = link.id;
    this.fromId = link.fromId;
    this.toId = link.toId;
    this.type = link.type;
  }

  toVisEdge() {
    return {
      id: this.id,
      from: this.fromId,
      to: this.toId,
      label: this.type
    };
  }
}
