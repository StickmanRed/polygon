const game = {
  canvas: document.createElement("canvas"),
  setupCanvas() {
    document.getElementById("canvasContainer").appendChild(this.canvas);
    this.canvas.id = "gameCanvas";
    this.canvas.style.width = "100%";
    this.canvas.style.height = "100%";
    this.canvas.width  = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
    this.ctx = this.canvas.getContext("2d");
  }
}

/*const canvas = document.createElement("canvas");
document.getElementById("canvasContainer").appendChild(canvas);
canvas.id = "gameCanvas"
canvas.style.width = "100%";
canvas.style.height = "100%";
canvas.width  = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

const ctx = canvas.getContext("2d");*/
game.setupCanvas();
ctx = game.ctx;
ctx.fillStyle = "red";
ctx.fillRect(0, 0, 150, 75);
