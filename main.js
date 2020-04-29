var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//load the images
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();
var bird = new Image();

bg.src = "images/b.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";
bird.src = "images/bird.png";

var gravity = 1;
var bY = 150;
var bX = 10;
var gravity = 2;
var score = 0;
var pipe = [];

pipe[0] = {
  x: canvas.width,
  y: 0,
};

//wrap drawing operation in a function
function draw() {
  var gap = 100;
  var constant = pipeNorth.height + gap;
  if (
    !bg.complete &&
    !pipeNorth.complete &&
    !pipeSouth.complete &&
    !fg.complete &&
    !bird.complete
  ) {
    setTimeout(() => {
      draw(ctx);
    }, 50);
    return;
  }
  ctx.drawImage(bg, 0, 0);

  for (var i = 0; i < pipe.length; i++) {
    ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);
    pipe[i].x--;

    if (pipe[i].x == 125) {
      pipe.push({
        x: canvas.width,
        y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height,
      });
    }

    //game over
    if (
      (bX + bird.width >= pipe[i].x &&
        bX <= pipe[i].x + pipeNorth.width &&
        (bY <= pipe[i].y + pipeNorth.height ||
          bY + bird.height >= pipe[i].y + constant)) ||
      (bY + bird.height >= canvas.height - fg.height)
    ) {
      //reload
      location.reload();
    }

    if (pipe[i].x == 5) {
      score++;
    }
  }

  ctx.drawImage(fg, 0, canvas.height - fg.height);
  ctx.drawImage(bird, bX, bY);

  bY += gravity;

  ctx.fillStyle = "#000";
  ctx.font = "20px Verdana";
  ctx.fillText("Score: " + score, 10, canvas.height - 20);

  requestAnimationFrame(draw);
}

//onkeyup
document.addEventListener("keyup", logKey);
function logKey(e) {
  bY -= 20;
}

draw(ctx);
