import { Renderer2D, Vector2, circle, rand } from "./chaos.module.js"
import { Graph, Node, AStarSearch, directionHeuristic } from "./src/index.js"
const renderer = new Renderer2D()
/**@type {Graph<Vector2>}*/
const graph = new Graph(() => new Vector2())

renderer.bindTo('#body')
renderer.setViewport(innerWidth, innerHeight)

//generateRandomNodes(graph, 60, renderer.width, renderer.height, 0.8)
generateBoxedNodes(graph, renderer.width - 200, renderer.height - 200, new Vector2(15, 15), new Vector2(100, 100))
//generateDiagonalBoxedNodes(graph, renderer.width - 200, renderer.height - 200, new Vector2(15, 15), new Vector2(100, 100))

const start = graph.getNode(0)
const end = graph.getNode(graph.size() - 1)

const shortPath = AStarSearch(start, end)

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
    if (!shortPath.length) return
    ctx.beginPath()
    ctx.lineWidth = 7
    ctx.strokeStyle = "cyan"
    ctx.moveTo(...shortPath[0].value)
    shortPath.forEach(p => {
      ctx.lineTo(...p.value)
    })
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
function generateRandomNodes(graph, number, width, height) {
  for (let i = 0; i < number; i++) {
    const node = new Vector2(
      rand(0, width),
      rand(0, height)
    )
    graph.add(node)
  }

  for (let i = 0; i < graph.nodes.length; i++) {
    for (let j = 0; j < graph.nodes.length; j++) {
      if (
        i !== j &&
        rand() >= 0.4
      ) {
        graph.connectNodes(i, j)
      }
    }
  }
  graph.disconnectNodes(0,graph.size() - 1)
}
/**
 * @param {Graph} graph
 */
function generateBoxedNodes(graph, width, height, num, offset = new Vector2()) {
  const widthX = width / num.x
  const heightY = height / num.y

  num.x += 1
  num.y += 1

  for (let y = 0; y < num.y; y++) {
    for (let x = 0; x < num.x; x++) {
      graph.add(
        new Vector2(
          offset.x + widthX * x,
          offset.y + heightY * y
        )
      )
    }
  }
  for (let x = 0; x < num.x - 1; x++) {
    for (let y = 0; y < num.y - 1; y++) {
      graph.connectNodes(
        x + y * num.x,
        x + (y + 1) * num.x
      )
      graph.connectNodes(
        x + y * num.x,
        x + y * num.x + 1
      )
    }
  }
  for (let x = (num.y - 1) * (num.x); x < num.y * num.x - 1; x++) {
    graph.connectNodes(x, x + 1)
  }
  for (let y = num.y - 1; y < num.y * num.x - num.x; y += num.y) {
    graph.connectNodes(
      y,
      y + num.y
    )
  }

}
/**
 * @param {Graph} graph
 */
function generateDiagonalBoxedNodes(graph, width, height, num, offset = new Vector2()) {
  const widthX = width / num.x
  const heightY = height / num.y

  num.x += 1
  num.y += 1

  for (let y = 0; y < num.y; y++) {
    for (let x = 0; x < num.x; x++) {
      graph.add(
        new Vector2(
          offset.x + widthX * x,
          offset.y + heightY * y
        )
      )
    }
  }
  for (let x = 0; x < num.x - 1; x++) {
    for (let y = 0; y < num.y - 1; y++) {
      graph.connectNodes(
        x + y * num.x,
        x + (y + 1) * num.x
      )
      graph.connectNodes(
        x + y * num.x,
        x + y * num.x + 1
      )
    }
  }
  for (let x = (num.y - 1) * (num.x); x < num.y * num.x - 1; x++) {
    graph.connectNodes(x, x + 1)
  }
  for (let y = num.y - 1; y < num.y * num.x - num.x; y += num.y) {
    graph.connectNodes(
      y,
      y + num.y
    )
  }
  for (let x = 0; x < num.x - 1; x++) {
    for (let y = 0; y < num.y - 1; y++) {
      graph.connectNodes(
        x + y * num.x,
        x + (y + 1) * num.x + 1
      )
    }
  }
}