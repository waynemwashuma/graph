import { Node } from "./node.js"

export class Graph {
  /**
   * @type { Node[] } 
   */
  nodes = []
  connections = []
  /**
   * @param {Function} constructorFunction Constructor function of the template
  */
  constructor(constructorFunction) {}
  /**
   * @param { Node } node
   */
  add(node) {
    this.nodes.push(node)
  }
  /**
   * @param { number } start index of the first node
   * @param { number } start index of the second node
   */
  connectNodes(start, end) {
    this.connections.push([start, end])
    this.nodes[start].addPathTo(this.nodes[end])
  }
  toJson() {
    const obj = {
      nodes: [],
      connections: this.connections
    }
    this.nodes.forEach(c => {
      obj.nodes.push(c.toJson())
    })
    return obj
  }
  fromJson(obj) {
    obj.nodes.forEach(n => {
      let node = new Node()
      node.fromJson(n)
      this.nodes.push(node)
    })
  }
}