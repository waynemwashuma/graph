import { Node } from "./node.js"
import { Vector2 } from "../chaos.module.js"

/**
 * @template T
 */
export class Graph {
  /**
   * @type { Node<T>[] } 
   */
  nodes = []
  /**
   * @type {number}
   */
  connections = []
  /**
   * @private
   * @type {()=> T}
  */
  _create = null
  /**
   * @param { ()=> T } constructorFunction Constructor function of the template
   */
  constructor(constructorFunction) {
    this._create = constructorFunction
  }
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
    console.log(start,end)
    this.connections.push([start, end])
    this.nodes[start].pathTo(this.nodes[end])
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
      let node = new Node(this._create())
      node.fromJson(n)
      this.nodes.push(node)
    })
  }
}