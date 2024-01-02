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
   * @param {Node} node
   * @param {Node} node
   */
  constructor(to, from) {
    this.to = to
    this.from = from
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
  removePathTo(node,removed = false){
    
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
renderer.add({
  render(ctx) {
    graph.draw(ctx)
    ctx.beginPath()
    ctx.lineWidth = 7
    ctx.strokeStyle = "cyan"
    ctx.moveTo(...shortPath[0].position)
    shortPath.forEach(p => {
      ctx.lineTo(...p.position)
      console.log(p);
    })
    ctx.stroke()
    ctx.closePath()
    ctx.beginPath()
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
generateRandomNodes(graph, 10, renderer.width, renderer.height)

const start = graph.nodes[0]
const end = graph.nodes[graph.nodes.length - 1]
const shortPath = findShortPath(start, end)

renderer.update()

function generateRandomNodes(graph, number, width, height) {
  for (let i = 0; i < number; i++) {
    const node = new Node()

    node.position.set(
      rand(0, width),
      rand(0, height)
    )

    graph.add(node)
  }
  if (graph.nodes[0]
    .hasPathTo(graph.nodes[graph.nodes.length - 1]))
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
}
/**
 * @param {Node} start
 * @param {Node} end
 * @returns {Path[] | null}
 */
function findShortPath(start, end, depth = 100, heuristic = distanceHeuristic, explored = []) {
  if (depth < 0) return [start]
  explored.push(start)
  start.explored = true
  const shortestpath = heuristic(start.paths, start, end)
  if (!shortestpath) return null
  const next = shortestpath.to
  if (next === end) return [start, next]
  const results = findShortPath(next, end, --depth, heuristic, explored)
  if (results == void 0) return findShortPath(start, end, --depth, heuristic, explored)
  return [start].concat(results)
}

/**
 * @param {Path[]} path
 */
function distanceHeuristic(paths, start, end) {
  let shortest = null
  let distance = Infinity
  for (let i = 0; i < paths.length; i++) {
    const path = paths[i]
    const dist = new Vector2()
      .copy(end.position)
      .sub(path.to.position)
      .magnitudeSquared()
    if (!shortest && !path.to.explored) {
      shortest = path
      distance = dist
    }
    if (
      shortest &&
      dist < distance &&
      !path.to.explored
    ) {
      shortest = path
      distance = dist
    }

  }
  return shortest
}

function directionHeuristic(paths, start, end) {
  let shortest = null
  let dotprod = -Infinity
  for (let i = 0; i < paths.length; i++) {
    const path = paths[i]
    const dir = new Vector2()
      .copy(path.to.position)
      .sub(path.from.position)
      .normalize()
    const absdir = new Vector2()
      .copy(end.position)
      .sub(path.from.position)
      .normalize()
    const product = dir.dot(absdir)
    if (!shortest && !path.to.explored) {
      shortest = path
      dotprod = product
    }

    if (
      shortest && !path.to.explored &&
      ptoduct > dotprod
    ) {
      shortest = path
      dotprod = product
    }
  }
  return shortest

}