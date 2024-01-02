import { Renderer2D, Vector2, circle, rand } from "./chaos.module.js"

const maxIteration = 10000;

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
  /**
   * @type { boolean } 
   */
  explored = false
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
   * @param {Node} node
   */
  hasPathTo(node) {
    for (var k = 0; k < this.paths.length; k++) {
      if (this.paths[k].to === node) return true
    }
    return false
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
    ctx.strokeStyle = "rgba(0.5,0.5,0.5,0.5)"
    this.nodes.forEach(e => {
      e.paths.forEach(p => {
        ctx.moveTo(...p.from.position)
        ctx.lineTo(...p.to.position)
      })
    })
    ctx.stroke()
    ctx.closePath()
    this.nodes.forEach(e => {
      ctx.moveTo(...e.position)
      circle(ctx, ...e.position, 10)
      ctx.fillStyle = "black"
      ctx.fill()
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

for (let i = 0; i < 10; i++) {
  const node = new Node()

  node.position.set(
    rand(0, renderer.width),
    rand(0, renderer.height)
  )

  graph.add(node)
}

for (let i = 0; i < graph.nodes.length; i++) {
  const node = graph.nodes[i]

  for (let j = 0; j < graph.nodes.length; j++) {
    const to = graph.nodes[j]
    if (
      node !== to &&
      !node.hasPathTo(to) &&
      rand() >= 0.5
    ) {
      node.pathTo(to)
      to.pathTo(node)
    }
  }
}
const start = graph.nodes[0]
const end = graph.nodes[graph.nodes.length - 1]
const shortPath = findShortPathNaive(start, end)



renderer.add({
  render(ctx) {
    graph.draw(ctx)
    ctx.beginPath()
    ctx.lineWidth = 7
    ctx.strokeStyle = "cyan"
    shortPath.forEach(p => {
      ctx.moveTo(...p.from.position)
      ctx.lineTo(...p.to.position)
    })
    ctx.stroke()
    ctx.closePath()
    ctx.closePath()
    ctx.moveTo(...end.position)
    circle(ctx, ...start.position, 15)
    ctx.fillStyle = "red"
    ctx.fill()
    ctx.closePath()
    ctx.beginPath()
    ctx.moveTo(...end.position)
    circle(ctx, ...end.position, 15)
    ctx.fillStyle = "green"
    ctx.fill()
    ctx.closePath()
  }
})
renderer.pause()
renderer.update()
console.log(shortPath.length);

/**
 * @param {Node} start
 * @param {Node} end
 */
function findShortPathNaive(start, end,explored = [],path = [],depth = maxIteration) {
  let current = start
  for (let i = depth; i > 0; i--) {
    explored.push(current)
    current.explored = true
    let shortestpath = null
    for (let i = 0; i < current.paths.length; i++) {
      let path = current.paths[i]
      if (!shortestpath && !path.to.explored)
        shortestpath = path
      if (shortestpath && path.distance < shortestpath.distance &&
        !path.to.explored
      )
        shortestpath = path
    }
    if (!shortestpath) continue
    path.push(shortestpath)
    current = shortestpath.to
    if (current === end) break
  }
  explored.forEach(e => {
    e.explored = false
  }) /***/

  return path
}