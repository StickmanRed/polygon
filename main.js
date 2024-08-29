import Sprite from "./sprite.js";

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

    this.mouseX = 0;
    this.mouseY = 0;
  },
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },

  sprites: [],
  renderSprites() {
    this.sprites.forEach((sprite) => {
      if (sprite.shown) {
        const transformMatrix = sprite.getTransform();
        sprite.shapes.forEach((shape) => {
          const newPath = new Path2D();
          newPath.addPath(shape[0], transformMatrix);
          if (shape[1]) {this.ctx.fill(newPath);}
          if (shape[2]) {this.ctx.stroke(newPath);}
        });
      }
    });
  },
  addSprite(sprite) {
    this.sprites.push(sprite);
    sprite.ctx = this.ctx;
  }
}

window.addEventListener("mousemove", (event) => {
  const bounds = game.canvas.getBoundingClientRect();
  game.mouseX = event.clientX - bounds.left;
  game.mouseY = event.clientY - bounds.top;
});

game.setupCanvas();
const ctx = game.ctx;

const box = new Sprite();
box.goto(400, 400);
game.addSprite(box);

setTimeout(function update() {
  ctx.fillStyle = box.pointInSprite(game.mouseX, game.mouseY) ? "red" : "black";
  game.clearCanvas();
  game.renderSprites();
  setTimeout(update, 10);
}, 10);
