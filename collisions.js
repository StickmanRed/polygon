// TODO: Test polygon collision detection algorithm
// This uses the collision algorithm for general simple polygons, since it is more general than the convex-projection algorithm.

class Polygon {
  constructor() {
    this.points = [];
  }
  point(x, y) {
    this.points.push([x, y]);
  }
}

// https://web.archive.org/web/20141127210836/http://content.gpwiki.org/index.php/Polygon_Collision
// https://stackoverflow.com/a/24392281
// ~ 21,000 lines per second... replace this with a more complicated algorithm when needed
function intersect(start1, end1, start2, end2) {
  const det = math.det([math.subtract(end1, start1), math.subtract(start2, end2)]);
  if (det === 0) {
    return false;
  }
  const t = math.divide(math.det([math.subtract(start2, start1), math.subtract(start2, end2)]), det);
  const u = math.divide(math.det([math.subtract(end1, start1), math.subtract(start2, end1)]), det);
  return (t >= 0) && (u >= 0) && (t <= 1) && (u <= 1);
}
// https://en.wikipedia.org/wiki/Point_in_polygon
// Remainder operator may be great for some situations, but not here :P
function pointInside(point, polygon) {
  let intersectionCount = 0;
  const len = polygon.points.length;
  polygon.points.forEach((vertex, idx, array) => {
    if (vertex[1] === point[1]) {
      intersectionCount += math.isNegative((array[(idx - 1 + len) % len][1] - vertex[1]) * (array[(idx + 1) % len][1] - vertex[1]));
    }
    else {
      intersectionCount += !!math.intersect(point, [point[0] + 1, point[1]], vertex, array[(idx + 1) % array.length]);
    }
  });
  return !!(intersectionCount % 2);
}

function polygonsIntersect(polygon1, polygon2) {
  if (polygon1.points.some((point) => {
    return pointInside(point, polygon2);
  })) {
    return true;
  }
  if (polygon2.points.some((point) => {
    return pointInside(point, polygon1);
  })) {
    return true;
  }

  return polygon1.points.some((point1, idx, array) => {
    let nextPoint1 = array[(idx + 1) % array.length];
    return polygon2.points.some((point2, idx, array) => {
      return intersect(point1, nextPoint1, point2, array[(idx + 1) % array.length]);
    });
  });
}

export default const Collisions = {
  Polygon: Polygon,
  intersect: intersect,
  pointInside: pointInside,
  polygonsIntersect: polygonsIntersect
}
