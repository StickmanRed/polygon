// TODO: Move sprite class here
export default class Sprite {
  constructor(x=0, y=0, scale=1, rotation=0, shown=true) {
    this.x = x;
    this.y = y;
    this.scale = scale;
    this.rotation = (rotation + 180) % 360 - 180; // degrees are measured as in Scratch; up is 0, right is 90, down is -180
    this.shown = shown;
    this.ctx = null;

    let defaultShape = new Path2D();
    defaultShape.rect(0,0,40,40);
    
    this.shapes = [[defaultShape, true, false]];
    this.costume = 0;
  }

  getTransform(x=this.x, y=this.y, scale=this.scale, rotation=this.rotation) {
    return transformMatrix(x, y, scale, rotation * Math.PI / 180);
  }

  pointInSprite(x=0, y=0) {
    // For this, probably just rotate the point and check if the transformed point is in the transformed path
    const transformValues = this.getTransform();
    const matrix = math.matrix([[transformValues[0], transformValues[2], transformValues[4]], [transformValues[1], transformValues[3], transformValues[5]], [0, 0, 1]]);
    const inverseMatrix = math.inv(matrix);
    let newX = inverseMatrix.get([0,0]) * x + inverseMatrix.get([0,1]) * y + inverseMatrix.get([0,2]);
    let newY = inverseMatrix.get([1,0]) * x + inverseMatrix.get([1,1]) * y + inverseMatrix.get([1,2]);
    text.textContent = `x: ${Math.round(newX)}, y: ${Math.round(newY)}`;
    for (const shape of this.shapes) {
      if ((this.ctx.isPointInPath(shape[0], newX, newY) && shape[1]) || (this.ctx.isPointInStroke(shape[0], newX, newY) && shape[2])) {
        return true;
      }
    }
    return false;
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
  setsize(size=1) {
    this.scale = size;
  }
  changesize(ds=0) {
    this.scale += ds;
  }
}
