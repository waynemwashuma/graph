import { Vector2 } from "../chaos.module.js"

/**
 * @param {Node<Vector2>} _absstart
 * @param {Node<Vector2>} start
 * @param {Node<Vector2>} end
 */
export function distanceHeuristic(start, end, _absstart) {
  if (start === end) return -1
  return new Vector2()
    .copy(end.value)
    .sub(start.value)
    .magnitudeSquared()
}
/**
 * @param {Node<Vector2>[]} paths
 * @param {Node<Vector2>} start
 * @param {Node<Vector2>} end
 */
export function directionHeuristic(start, end, absstart) {
    const dir = new Vector2()
      .copy(start.value)
      .sub(end.value)
      .normalize()
    const absdir = new Vector2()
      .copy(end.value)
      .sub(absstart.value)
      .normalize()
     console.log(dir.dot(absdir))
    return dir.dot(absdir)
}