/* The transformation matrix for scaleX, skewY, skewX, scaleY, shiftX, shiftY:
 * [ scaleX skewX  shiftX ]
 * [ skewY  scaleY shiftY ]
 * [ 0      0      1      ]
 */

// Huge thanks to whoever wrote this! https://stackoverflow.com/a/60248778
function transformMatrix(dx, dy, scale, rotate) {
  const xAX = Math.cos(rotate) * scale;
  const xAY = Math.sin(rotate) * scale;
  return [xAX, xAY, -xAY, xAX, dx, dy];
}

export default class Sprite {
  constructor(x=0, y=0, scale=1, rotation=0, shown=true) {
    this.x = x;
    this.y = y;
    this.scale = scale;
    // Degrees are measured as in Scratch: up is 0, right is 90, down is -180
    this.rotation = (rotation + 180) % 360 - 180;
    this.shown = shown;
    this.ctx = null;

    let defaultShape = new Path2D();
    defaultShape.rect(0,0,40,40);

    // Each costume, or "shape", is a Path2D
    this.shapes = [[defaultShape, true, false]];
    this.costume = 0;
  }

  getTransform(x=this.x, y=this.y, scale=this.scale, rotation=this.rotation) {
    return transformMatrix(x, y, scale, rotation * Math.PI / 180);
  }

  // Applies the inverse transformation to the point, then checks if one of the original shapes contains this point
  pointInSprite(x=0, y=0) {
    const transformValues = this.getTransform();
    const matrix = math.matrix([[transformValues[0], transformValues[2], transformValues[4]], [transformValues[1], transformValues[3], transformValues[5]], [0, 0, 1]]);
    const inverseMatrix = math.inv(matrix);
    let newX = inverseMatrix.get([0,0]) * x + inverseMatrix.get([0,1]) * y + inverseMatrix.get([0,2]);
    let newY = inverseMatrix.get([1,0]) * x + inverseMatrix.get([1,1]) * y + inverseMatrix.get([1,2]);
    return (this.ctx.isPointInPath(this.shapes[this.costume][0], newX, newY) && this.shapes[this.costume][1]) || (this.ctx.isPointInStroke(this.shapes[this.costume][0], newX, newY) && this.shapes[this.costume][2]);
  }

  goto(x=0, y=0) {
    this.x = x;
    this.y = y;
  }
  changeby(dx=0, dy=0) {
    this.x += dx;
    this.y += dy;
  }
  point(deg=0) {
    this.rotation = (deg + 180) % 360 - 180;
  }
  rotate(deg=0) {
    this.point(this.rotation + deg);
  }

  costume(index) {
    if (!index || typeof index != "number" || index >= this.shapes.length) {return;}
    this.costume = index;
  }
  nextcostume() {
    this.costume = (this.costume + 1) % this.shapes.length;
  }
  setsize(size=1) {
    this.scale = size;
  }
  changesize(ds=0) {
    this.scale += ds;
  }
  show() {
    this.shown = true;
  }
  hide() {
    this.shown = false;
  }
}
