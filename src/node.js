import { Utils } from "../chaos.module.js"
/**
 * @template T
 */
export class Node {
  /**
   * @type { Node<T>[] } 
   */
  paths = []
  /**
   * @type { T } 
   */
  value = null
  /**
   * @type { boolean } 
   */
  explored = false
  /**
   * @param {T} obj
  */
  constructor(obj) {
    this.value = obj
  }
  /**
   * @param {Node<T>} node
   */
  pathTo(node, added = false) {
    if(this.hasPathTo(node) || this === node)return
    this.paths.push(node)
    if (!added) node.pathTo(this, true)
  }
  /**
   * @param {Node<T>} node
   */
  hasPathTo(node) {
    for (var k = 0; k < this.paths.length; k++) {
      if (this.paths[k] === node) return true
    }
    return false
  }
  /**
   * @param {Node<T>} node
   * @param {boolean} removed
   */
  removePathTo(node, removed = false) {
    if (!this.hasPathTo(node)) return
    Utils.removeElement(this.paths, this.paths.indexOf(node))
    if (!removed) node.removePathTo(this, true)
  }
  fromJson(obj) {
    this.value.fromJson(obj)
  }
  toJson() {
    return this.value.toJson()
  }
}