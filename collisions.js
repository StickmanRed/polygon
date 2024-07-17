// TODO: Create polygon collision detection algorithm
/* To implement this method of collision checking, you will need to find both the potential separating axes and the lines perpendicular to them, then project points onto those lines.
 * After that you will need to figure out if the regions spanned by these points overlap.
 * 
 * Lines always start at (0, 0), and we use an (x, y) vector to indicate their direction.
 * If our polygons are a list of points, with lines between adjacent points, the n-th line of the polygon is just p_{n+1} - p_n.
 * Getting a line perpendicular to line (x, y) is simple: you can just take line (-y, x).
 * So now we have a line on which all the points should be projected. The method for projecting a point onto a line is the dot product.
 * If we first normalize our line (give it length 1), then the dot product between the line and a point will be the projection of that point into the 1-dimensional space of the line.
 * So we do this to all points, resulting in a collection of 1-dimensional values for both polygons.
 * To get the area taken up by one polygon, you take the minimum and maximum values of the projections for that polygon.
 * If the polygons do not overlap, either the minimum value for polygon A is bigger than the maximum value for polygon B, or the maximum value for A is smaller than the minimum value for B.
 * Do this check for every line in both polygons, until you find an axis that separates them.
 * If no such axis can be found, they intersect.
 */

class Polygon {
  constructor() {
    this.points = [];
  }
  point(x, y) {
    this.points.push([x, y]);
  }
}
