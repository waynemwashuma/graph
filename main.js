import { Renderer2D, Vector2, circle, rand } from "./chaos.module.js"

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
    this.to = to
    this.from = from
    this.distance = new Vector2().copy(to.position).sub(from.position).magnitude()
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
  pathTo(node) {
    let path = new Path(node, this)
    this.paths.push(path)
  }
  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {



    

  }
}
class Graph {
  /**
   * @type { Node[] } 
   */
  nodes = []
  constructor() {

  }
  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    ctx.beginPath()
    ctx.lineWidth = 7
    this.nodes.forEach(e => {
      e.paths.forEach(p => {
        ctx.moveTo(...p.from.position)
        ctx.lineTo(...p.to.position)
      })
      ctx.strokeStyle = "green"
      ctx.stroke()
    })
    ctx.closePath()
    this.nodes.forEach(e => {
      ctx.beginPath()
      circle(ctx, ...e.position, 10)
      ctx.fillStyle = "black"
      ctx.fill()
      ctx.closePath()
    })
  }
  /**
   * @param { Node } node
   */
  add(node) {
    this.nodes.push(node)
  }
}

let renderer = new Renderer2D()
let graph = new Graph()

renderer.bindTo('#body')
renderer.setViewport(innerWidth, innerHeight)

renderer.play()

for (let i = 0; i < 60; i++) {
  const node = new Node()

  node.position.set(rand(0, renderer.width), rand(0, renderer.height))

  graph.add(node)
}

for (let i = 0; i < graph.nodes.length; i++) {
  const node = graph.nodes[i]

  for (let j = 0; j < graph.nodes.length; j++) {
    const to = graph.nodes[j]

    if (to === node) continue

    node.pathTo(to)
  }

}
renderer.add({
  render(ctx) {
    graph.draw(ctx)
  }
})

console.log(findShortPath(graph.nodes,graph.nodes[0],graph.nodes[0],graph.nodes[graph.nodes.length - 1]))

function findShortPath(nodes,start,end){
  const path = []
  
  return path
}

