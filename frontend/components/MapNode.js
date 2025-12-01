export default class MapNode {
  constructor(entity) {
    this.id = entity.id;
    this.label = entity.name;
    this.group = entity.type;
  }

  toVisNode() {
    return {
      id: this.id,
      label: this.label,
      group: this.group
    };
  }
}
