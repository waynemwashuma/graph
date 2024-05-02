import { distanceHeuristic } from "./heuristics.js"

/**
 * NOTE: The start and end should have at least one valid path otherwise a stackoverflow error will occur.
 * 
 * @todo - This actually isnt A*,instead of only taking the best,sort possible paths in a priority queue.
 * 
 * @param {Node<Vector2>} start
 * @param {Node<Vector2>} end
 * @param {typeof distanceHeuristic} [heuristic]
 * @param {Node<Vector2>[]} [path]

 * @param {Node<Vector2>[]} [explored]
 * 
 * @returns {Node<Vector2>[] | null}
 */
export function AStarSearch(start, end, heuristic = distanceHeuristic, path = [], explored = []) {

  const stack = [start]
  while (stack.length) {
    const node = stack.pop()
    explored.push(node)
    start.explored = true
    let next = node.paths[0]
    let bestcost = heuristic(next, end, node)
    for (let i = 1; i < node.paths.length; i++) {
      const current = node.paths[i]
      const cost = heuristic(current, end, node)

      if (cost < bestcost && !current.explored) {
        next = current
        bestcost = cost
      }
    }
    if (next === end) {
      path.push(node, next)
      break
    }
    path.push(node)
    stack.push(next)
  }
  return path
}