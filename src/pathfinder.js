import { distanceHeuristic } from "./heuristics.js"

/**
 * @param {Node<Vector2>} start
 * @param {Node<Vector2>} end
 * @param {number} [depth]
 * @param {typeof distanceHeuristic} [heuristic]
 * @param {Node<Vector2>[]} [explored]
 * 
 * @returns {Node<Vector2>[] | null}
 */
export function findShortPath(start, end, heuristic = distanceHeuristic, path = [], explored = []) {
  explored.push(start)
  start.explored = true
  const next = heuristic(start.paths, start, end)
  path.push(start, next)
  if (next === end) return path
  findShortPath(next, end, heuristic, path, explored)
  path.unshift(start)
  return path
}