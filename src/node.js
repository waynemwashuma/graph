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
}