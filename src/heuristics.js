import { Vector2 } from "../chaos.module.js"

export function distanceHeuristic(paths, start, end) {
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

export function directionHeuristic(paths, start, end) {
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