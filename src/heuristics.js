import { Vector2 } from "../chaos.module.js"


export function distanceHeuristic(paths, start, end) {
  let shortest = null
  let distance = Infinity
  for (let i = 0; i < paths.length; i++) {
    const path = paths[i]
    const dist = new Vector2()
      .copy(end.value)
      .sub(path.value)
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
      .copy(path.value)
      .sub(start.value)
      .normalize()
    const absdir = new Vector2()
      .copy(end.value)
      .sub(start.value)
      .normalize()
    const product = dir.dot(absdir)
    if (!shortest && !path.explored) {
      shortest = path
      dotprod = product
    }

    if (
      shortest && !path.explored &&
      ptoduct > dotprod
    ) {
      shortest = path
      dotprod = product
    }
  }
  return shortest

}