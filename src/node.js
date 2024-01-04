import { Vector2, Utils } from "../chaos.module.js"
/**
*/
export class Node {
  /**
   * @type { Node[] } 
   */
  paths = []
  /**
   * @type { Vector2 } 
   */
  position = new Vector2()
  /**
   * @type { boolean } 
   */
  explored = false
  constructor() {

  }
  /**
   * @param {Node} node
   */
  pathTo(node, added = false) {
    this.paths.push(node)
    if (!added) node.pathTo(this, true)
  }
  /**
   * @param {Node} node
   */
  hasPathTo(node) {
    for (var k = 0; k < this.paths.length; k++) {
      if (this.paths[k] === node) return true
    }
    return false
  }
  removePathTo(node, removed = false) {
    if (!this.hasPathTo(node)) return
    Utils.removeElement(this.paths, this.paths.indexOf(node))
    if (!removed) node.removePathTo(this, true)
  }
  fromJson(obj){
    this.position.fromJson(obj)
  }
  toJson(){
    return this.position.toJson()
  }
}