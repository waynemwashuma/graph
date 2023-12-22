import { Renderer2D, Vector2 } from "./chaos.module.js"

class Path {
  /**
   * @type { Node } 
   */
  to = null
  /**
   * @type { Node } 
   */
  from = null
  /**
   * @type { number } 
   */
  distance = 0
  /**
   * @param {Node} node
   * @param {Node} node
   */
  constructor(to, from) {

  }
}
class Node {
  /**
   * @type { Path[] } 
   */
  paths = []
  /**
   * @type { Vector2 } 
   */
  position = new Vector2()
  constructor() {

  }
  /**
   * @param {Node} node
   */
  addPathTo(node) {

  }
  draw() {

  }
}
class Graph {
  /**
   * @type { Node[] } 
   */
  nodes = []
  constructor() {

  }
  draw() {

  }
}

let renderer = new Renderer2D()
let graph= new Graph()

renderer.bindTo('#body')
renderer.setViewport(innerWidth, innerHeight)
renderer.add({
  render(){
    graph.draw(ctx)
  }
})