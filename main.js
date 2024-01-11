import { Renderer2D, Vector2, circle, rand } from "./chaos.module.js"
import { Graph, Node, findShortPath } from "./src/index.js"

let renderer = new Renderer2D()
/**@type {Graph<Vector2>}*/
let graph = new Graph(()=>new Vector2())

renderer.bindTo('#body')
renderer.setViewport(innerWidth, innerHeight)
generateRandomNodes(graph, 60, renderer.width, renderer.height, 0.8)
const start = graph.nodes[0]
const end = graph.nodes[graph.nodes.length - 1]
const shortPath = findShortPath(start, end)

renderer.add({
  render(ctx) {
    ctx.beginPath()
    ctx.lineWidth = 7
    ctx.strokeStyle = "rgba(0.5,0.5,0.5,0.5)"
    graph.nodes.forEach(e => {
      e.paths.forEach(p => {
        ctx.moveTo(...e.value)
        ctx.lineTo(...p.value)
      })
    })
    ctx.stroke()
    ctx.closePath()
    graph.nodes.forEach(e => {
      ctx.moveTo(...e.value)
      circle(ctx, ...e.value, 10)
      ctx.fillStyle = "black"
      ctx.fill()
    })
    ctx.beginPath()
    ctx.lineWidth = 7
    ctx.strokeStyle = "cyan"
    if (shortPath) {
      ctx.moveTo(...shortPath[0].value)
      shortPath.forEach(p => {
        ctx.lineTo(...p.value)
      })
    }

    ctx.stroke()
    ctx.closePath()
    ctx.beginPath()
    ctx.moveTo(...end.value)
    circle(ctx, ...start.value, 15)
    ctx.fillStyle = "green"
    ctx.fill()
    ctx.closePath()
    ctx.beginPath()
    ctx.moveTo(...end.value)
    circle(ctx, ...end.value, 15)
    ctx.fillStyle = "red"
    ctx.fill()
    ctx.closePath()
  }
})
renderer.update()

/**
 * @param {Graph} graph
*/
function generateRandomNodes(graph, number, width, height, probs = 0.5) {
  for (let i = 0; i < number; i++) {
    const node = new Node(new Vector2())

    node.value.set(
      rand(0, width),
      rand(0, height)
    )

    graph.add(node)
  }

  for (let i = 0; i < graph.nodes.length; i++) {
    for (let j = 0; j < graph.nodes.length; j++) {
      if (
        i !== j &&
        rand() >= probs
      ) {
        graph.connectNodes(i,j)
      }
    }
  }
  graph.nodes[0].removePathTo(graph.nodes[graph.nodes.length - 1])
}

console.log(graph)
