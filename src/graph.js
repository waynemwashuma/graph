import { Node } from "./node.js"
import { Vector2 } from "../chaos.module.js"

/**
 * 
 * @template T
 */
export class Graph {
  /**
   * @private
   * @type { Node<T>[] } 
   */
  nodes = []
  /**
   * @param { T } obj
   * @returns {number} The index of the node.
   */
  add(obj) {
    return this.nodes.push(new Node(obj)) - 1
  }
  /**
   * @param { number } index The index of the node to remove.
   */
  remove(index) {
    const temp = this.nodes.pop()
    const node = this.nodes[index]

    for (let i = 0; i < node.paths.length; i++) {
      node.removePathTo(node.paths[i])
    }

    if (index !== this.nodes.length)
      this.nodes[index] = temp
  }
  size() {
    return this.nodes.length
  }
  /**
   * @param { number } start index of the first node
   * @param { number } start index of the second node
   */
  connectNodes(start, end) {
    this.nodes[start].pathTo(this.nodes[end])
  }
  /**
   * @param { number } start index of the first node
   * @param { number } start index of the second node
   */
  disconnectNodes(start, end) {
    this.nodes[start].removePathTo(this.nodes[end])
  }
}