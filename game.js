const canvas = document.createElement("canvas");
document.getElementById("canvasContainer").appendChild(canvas);
canvas.id = "gameCanvas"
canvas.style.width = "100%";
canvas.style.height = "100%";
canvas.width  = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

const ctx = canvas.getContext("2d");
ctx.fillStyle = "red";
ctx.fillRect(0, 0, 150, 75);
