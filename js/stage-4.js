window.onload = init();
function init() {
  const c = document.getElementById("canvas-stage-4");
  ctx = c.getContext("2d");
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
  document.body.style.backgroundImage = "url('images/background/stage-4-winter-bg.jpg')";
  document.body.style.backgroundSize = "contain";

  let feelHeat = false;

  //darwing Olaf image
  let olafX = 40; //olaf x cordinates
  let olafY = 450; //olaf y cordinates
  let olafImage = new Image();
  olafImage.src = "images/charactors/olaf-walking-happy.png";

  let meltingTextImage = new Image();
  meltingTextImage.src = "images/dialog/stage-4-melting-text.png";

  let coolTextImage = new Image();
  coolTextImage.src = "images/dialog/stage-4-cool-text.png";

  olafImage.onload = function () {
    ctx.drawImage(olafImage, olafX, olafY, 400, 400);
  };

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
      olafX = olafX - 10;
    }

    //checks if right arrow is pressed
    if (39 in keyPress) {
      olafX = olafX + 10;
    }

    // Show Summer First Time
    if (olafX > 700) {
      document.body.style.backgroundImage = "url('images/background/stage-4-summer-bg.jpg')";
      feelHeat = true;
    }
    if (olafX < 700) {
      document.body.style.backgroundImage = "url('images/background/stage-4-winter-bg.jpg')";
      feelHeat = false;
    }

    // FINAL STAGE
    if (olafX > 1600) {
      document.body.style.backgroundImage = "url('images/background/stage-4-winter-bg.jpg')";
      feelHeat = false;
    }
    if (olafX < 1600 && olafX > 700) {
      document.body.style.backgroundImage = "url('images/background/stage-4-summer-bg.jpg')";
      feelHeat = true;
    }

    if (feelHeat) {
      olafImage.src = "images/charactors/olaf-walking-sad.png";
      ctx.drawImage(meltingTextImage, olafX + 300, olafY - 200, 300, 300);
    } else {
      if (olafX > 1600) {
        ctx.drawImage(coolTextImage, olafX + 300, olafY - 200, 300, 300);
      }
      olafImage.src = "images/charactors/olaf-walking-happy.png";
    }

    if (olafX > 1700) {
      window.open("stage-5.html", "_self"); //continues to next scene
    }
  }

  //function to clear the canvas
  function clear() {
    ctx.canvas.width = window.innerWidth + olafX;
    ctx.canvas.height = window.innerHeight - 20;
  }

  //function to draw objects
  function draw() {
    ctx.drawImage(olafImage, olafX, olafY, 400, 400);
  }

  //main function rendering the objects with state changes
  function gameLoop() {
    clear();
    update();
    draw();
    setTimeout(gameLoop, 20); //calls the game loop
  }
  gameLoop(); //calls game loop for first time
}
