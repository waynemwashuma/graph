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
   * @param {T} obj
  */
  constructor(obj) {
    this.value = obj
  }
}