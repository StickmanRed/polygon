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
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },

  sprites: [],
  renderSprites() {
    this.sprites.forEach((sprite) => {
      if (sprite.shown) {
        sprite.shapes.forEach((shape) => {
          const newPath = new Path2D(shape[0]);
          newPath.setTransform(sprite.scale, 0, 0, sprite.scale, sprite.x, sprite.y);
          newPath.rotate(sprite.rotation * Math.PI / 180);
          if (shape[1]) {this.ctx.fill(newPath);}
          if (shape[2]) {this.ctx.stroke(newPath);}
        });
      }
    });
  },
  addSprite(sprite) {
    this.sprites.push(sprite);
    this.sprites.ctx = this.ctx;
  }
}
class Sprite {
  constructor(x=0, y=0, scale=1, rotation=0, shown=true) {
    this.x = x;
    this.y = y;
    this.scale = scale;
    this.rotation = rotation;
    this.shown = shown;
    this.ctx = null;

    let defaultShape = new Path2D();
    defaultShape.rect(0,0,40,40);
    
    this.shapes = [[defaultShape, true, false]];
    this.costume = 0;
  }

  goto(x=0, y=0) {
    this.x = x;
    this.y = y;
  }
}

game.setupCanvas();
ctx = game.ctx;
game.addSprite(new Sprite());
i = 10;
setTimeout(function move() {
  game.sprites[0].goto(i, i);
  game.clearCanvas();
  game.renderSprites();
  if (i < 100) {
    i += 10;
    setTimeout(move, 500);
  }
}, 500);
