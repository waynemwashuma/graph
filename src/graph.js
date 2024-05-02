import { Node } from "./node.js"
import { Vector2 } from "../chaos.module.js"

/**
 * 
 * @template T
 */
export class Graph {
  /**
   * @type { Node<T>[] } 
   */
  nodes = []
  /**
   * @param { T } obj
   */
  add(obj) {
    return this.nodes.push(new Node(obj)) - 1
  }
  /**
   * @param { number } start index of the first node
   * @param { number } start index of the second node
   */
  connectNodes(start, end) {
    this.nodes[start].pathTo(this.nodes[end])
  }
}