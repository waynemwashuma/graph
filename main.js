import { Renderer2D, Vector2, circle, rand, Utils } from "./chaos.module.js"

const maxIteration = 10000;

class Node {
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
    if(!this.hasPathTo(node))return
    Utils.removeElement(this.paths, this.paths.indexOf(node))
    if (!removed) node.removePathTo(this, true)
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
        ctx.moveTo(...e.position)
        ctx.lineTo(...p.position)
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
    if (shortPath) {
      ctx.moveTo(...shortPath[0].position)
      shortPath.forEach(p => {
        ctx.lineTo(...p.position)
      })
    }

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
generateRandomNodes(graph, 20, renderer.width, renderer.height)

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
      }
    }
  }
 graph.nodes[0].removePathTo(graph.nodes[graph.nodes.length - 1])
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
  const next = shortestpath
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
      .sub(path.position)
      .magnitudeSquared()
    if (!shortest && !path.explored) {
      shortest = path
      distance = dist
    }
    if (
      shortest &&
      dist < distance &&
      !path.explored
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
      .copy(path.position)
      .sub(start.position)
      .normalize()
    const absdir = new Vector2()
      .copy(end.position)
      .sub(start.position)
      .normalize()
    const product = dir.dot(absdir)
    if (!shortest && !path.explored) {
      shortest = path
      dotprod = product
    }

    if (
      shortest && !pat.explored &&
      ptoduct > dotprod
    ) {
      shortest = path
      dotprod = product
    }
  }
  return shortest

}
console.log(graph);