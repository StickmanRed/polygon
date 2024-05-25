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
    this.canvas.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },

  sprites: [],
  renderSprites() {
    this.sprites.forEach((sprite) => {
      if (sprite.shown) {
        this.ctx.beginPath();
        sprite.shapes[sprite.costume](ctx, () => {
          this.ctx.setTransform(sprite.scale, 0, 0, sprite.scale, sprite.x, sprite.y);
          this.ctx.rotate(sprite.rotation * Math.PI / 180);
        });
        
      }
    });
  },
  addSprite(sprite) {
    this.sprites.push(sprite);
  }
}
class Sprite {
  constructor(x=0, y=0, scale=1, rotation=0, shown=true) {
    this.x = x;
    this.y = y;
    this.scale = scale;
    this.rotation = rotation;
    this.shown = shown;
    this.shapes = [(ctx, transform) => {
      ctx.rect(0,0,40,40);
      transform();
      ctx.fill();
    }];
    this.costume = 0;
  }

  goto(x=0, y=0) {
    this.x = x;
    this.y = y;
  }
}

game.setupCanvas();
ctx = game.ctx;
/*ctx.fillStyle = "red";
ctx.fillRect(0, 0, 150, 75);*/
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
// game.renderSprites();
