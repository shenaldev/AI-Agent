window.onload = init();

function init() {
  const c = document.getElementById("canvas-stage-5");
  ctx = c.getContext("2d");
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
  document.body.style.backgroundImage = "url('images/background/stage-5-bg.jpg')";
  document.body.style.backgroundSize = "cover";

  let princesCanSee = false;
  let end = false;

  //darwing prince
  let princeX = 40; //prince x cordinates
  let princeY = 300; //prince y cordinates
  let princeImage = new Image();
  princeImage.src = "images/charactors/prince.png";

  princeImage.onload = function () {
    ctx.drawImage(princeImage, princeX, princeY);
  };

  let princesX = 1200;
  let princesY = 300;
  let princesImage = new Image();
  princesImage.src = "images/charactors/princess.png";

  princesImage.onload = function () {
    ctx.drawImage(princesImage, princesX, princesX);
  };

  //Dialog Images
  let princeDialog1 = new Image();
  princeDialog1.src = "images/dialog/final-dialog-prince.png";

  let keyPress = {}; //initialize the list that containing key presses

  // prince walking right when click the right arrow
  addEventListener(
    "keydown",
    function (e) {
      keyPress[e.keyCode] = true;
    },
    false
  );

  // prince walking left when click the left arrow
  addEventListener(
    "keyup",
    function (e) {
      delete keyPress[e.keyCode];
    },
    false
  );

  //function to update the state of the game for elapsed time since last rendering of object
  function update() {
    //checks if left arrow is pressed
    if (37 in keyPress) {
      princeX = princeX - 5; //changes position of player to move back
      princesX = princesX + 5;
    }

    //checks if right arrow is pressed
    if (39 in keyPress) {
      princeX = princeX + 5; //changes position of the player to move forward
      princesX = princesX - 5;
    }

    if (princeX > 400) {
      princesCanSee = true;
    }

    if (princeX > 500) {
      end = true;
    }
  }

  //function to clear the canvas
  function clear() {
    ctx.canvas.width = window.innerWidth + princeX;
    ctx.canvas.height = window.innerHeight - 20;
  }

  //function to draw objects
  function draw() {
    ctx.drawImage(princeImage, princeX, princeY, 100, 300);
    ctx.drawImage(princesImage, princesX, princesY, 200, 300);

    if (princesCanSee) {
      ctx.drawImage(princeDialog1, princeX + 120, princeY - 100, 200, 200);
    }

    if (end) {
      setTimeout(() => {
        window.open("end.html", "_self");
      }, 3000);
    }
  }

  //main function rendering the objects with state changes
  function gameLoop() {
    clear();
    update();
    draw();
    setTimeout(gameLoop, 30); //calls the game loop
  }
  gameLoop(); //calls game loop for first time
}
