// Huge thanks to whoever wrote this! https://stackoverflow.com/a/60248778
function transformMatrix(dx, dy, scale, rotate) {
  const xAX = Math.cos(rotate) * scale;
  const xAY = Math.sin(rotate) * scale;
  return [xAX, xAY, -xAY, xAX, dx, dy];
}

/* The transformation matrix for scaleX, skewY, skewX, scaleY, shiftX, shiftY:
 * [ scaleX skewX  shiftX ]
 * [ skewY  scaleY shiftY ]
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

let mouseX = 0;
let mouseY = 0;

game.setupCanvas();
ctx = game.ctx;

const box = new Sprite();
game.addSprite(box);
text = document.getElementById("text");
i = 10;
setTimeout(function move() {
  box.goto(i/3, i/3);
  box.point(i/2);
  box.changesize(0.005);
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

window.addEventListener("mousemove", (event) => {
  const bounds = game.canvas.getBoundingClientRect();
  mouseX = event.clientX - bounds.left;
  mouseY = event.clientY - bounds.top;
});
