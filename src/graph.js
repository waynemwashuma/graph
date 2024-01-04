
export class Graph {
  /**
   * @type { Node[] } 
   */
  nodes = []
  constructor() {
  }
  /**
   * @param { Node } node
   */
  add(node) {
    this.nodes.push(node)
  }
}