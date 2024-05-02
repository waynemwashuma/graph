import { distanceHeuristic } from "./heuristics.js"

/**
 * @param {Node<Vector2>} start
 * @param {Node<Vector2>} end
 * @param {typeof distanceHeuristic} [heuristic]
 * @param {Node<Vector2>[]} [path]

 * @param {Node<Vector2>[]} [explored]
 * 
 * @returns {Node<Vector2>[] | null}
 */
export function findShortPath(start, end, heuristic = distanceHeuristic, path = [], explored = []) {
  explored.push(start)
  start.explored = true

  let next = start.paths[0]
  let bestcost = heuristic(next, end, start)
  for (let i = 1; i < start.paths.length; i++) {
    const current = start.paths[i]
    const cost = heuristic(current, end, start)
    if (
      cost < bestcost &&
      !current.explored
    ) {
      next = current
      bestcost = cost
    }
  }
  if (next === end) {
    path.push(start, next)
    return path
  }
  findShortPath(next, end, heuristic, path, explored)
  path.unshift(start)
  return path
}