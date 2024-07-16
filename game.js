// Huge thanks to whoever wrote this! https://stackoverflow.com/a/60248778
function transformMatrix(dx, dy, scale, rotate) {
  const xAX = Math.cos(rotate) * scale;
  const xAY = Math.sin(rotate) * scale;
  return [xAX, xAY, -xAY, xAX, dx, dy];
}

/* The transformation matrix for scaleX, skewY, skewX, scaleY, shiftX, shiftY:
 * [ scaleX skewY  shiftX ]
 * [ skewX  scaleY shiftY ]
 * [ 0      0      1      ]
 */

const game = {
  canvas: document.createElement("canvas"),
  setupCanvas() {
    document.getElementById("canvasContainer").appendChild(this.canvas);
    this.canvas.id = "gameCanvas";
    this.canvas.style.width = "100%";
    this.canvas.style.height = "100%";
    this.canvas.style.float = "left";
    this.canvas.width  = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
    this.ctx = this.canvas.getContext("2d");
  },
  clearCanvas() {
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },

  sprites: [],
  renderSprites() {
    this.sprites.forEach((sprite) => {
      if (sprite.shown) {
        const matrix = sprite.getTransform();
        sprite.shapes.forEach((shape) => {
          const newPath = new Path2D(shape[0]);
          // this.ctx.setTransform(sprite.scale, 0, 0, sprite.scale, sprite.x, sprite.y);
          // this.ctx.rotate(sprite.rotation * Math.PI / 180);
          this.ctx.setTransform(...matrix);
          if (shape[1]) {this.ctx.fill(newPath);}
          if (shape[2]) {this.ctx.stroke(newPath);}
          this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        });
      }
    });
  },
  addSprite(sprite) {
    this.sprites.push(sprite);
    sprite.ctx = this.ctx;
  }
}
class Sprite {
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
    const matrix = math.matrix([[transformValues[0], transformValues[1], transformValues[4]], [transformValues[2], transformValues[3], transformValues[5]], [0, 0, 1]]);
    const inverseMatrix = math.inv(matrix);
    let newX = inverseMatrix.get([0,0]) * x + inverseMatrix.get([1,0]) * y + inverseMatrix.get([0,2]);
    let newY = inverseMatrix.get([0,1]) * x + inverseMatrix.get([1,1]) * y + inverseMatrix.get([1,2]);
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

game.setupCanvas();
ctx = game.ctx;
const box = new Sprite();
game.addSprite(box);
text = document.getElementById("text");
i = 10;
setTimeout(function move() {
  box.goto(i/3, i/3);
  // box.point(i/2);
  box.changesize(0.002);
  if (box.pointInSprite(400, 400)) {
    ctx.fillStyle = "red";
  }
  else {
    ctx.fillStyle = "black";
  }
  game.clearCanvas();
  ctx.beginPath();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.arc(400, 400, 4, 0, 2 * Math.PI);
  fill = ctx.fillStyle;
  ctx.fillStyle = "green";
  ctx.fill();
  ctx.fillStyle = fill;
  game.renderSprites();
  if (true) {
    i += 1;
    setTimeout(move, 10);
  }
}, 100);
