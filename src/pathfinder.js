import {distanceHeuristic} from "./heuristics.js"
/**
 * @param {Node} start
 * @param {Node} end
 * @param {number} [depth]
 * @param {typeof distanceHeuristic} [heuristic]
 * @param {Node[]} [explored]
 * 
 * @returns {Node[] | null}
 */
export function findShortPath(start, end, depth = 100, heuristic = distanceHeuristic, explored = []) {
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