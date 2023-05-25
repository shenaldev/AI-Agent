window.onload = init();
function init() {
  const c = document.getElementById("canvas-stage-4");
  ctx = c.getContext("2d");
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
  document.body.style.backgroundImage = "url('images/background/stage-4-winter-bg.jpg')";
  document.body.style.backgroundSize = "contain";

  let feelHeat = false;
  let princessCanSee = false;

  //Play Bg Music
  let bgMusic = document.getElementById("bg-music");
  document.addEventListener("keydown", () => {
    bgMusic.play();
    bgMusic.volume = 0.5;
  });

  //Sounds
  let walkingSound = new Audio("sounds/foot-steps.wav");

  //darwing Olaf image
  let olafX = 40; //olaf x cordinates
  let olafY = 500; //olaf y cordinates
  let olafImage = new Image();
  olafImage.src = "images/charactors/olaf-walking-happy.png";

  olafImage.onload = function () {
    ctx.drawImage(olafImage, olafX, olafY, 300, 300);
  };

  //darwing princes Image
  let princesX = 1200; //princess x cordinates
  let princesY = 400; //princess y cordinates
  let princesImage = new Image();
  princesImage.src = "images/charactors/princess.png";

  princesImage.onload = function () {
    ctx.drawImage(princesImage, princesX, princesY);
  };

  let meltingTextImage = new Image();
  meltingTextImage.src = "images/dialog/stage-4-melting-text.png";
  let coolTextImage = new Image();
  coolTextImage.src = "images/dialog/stage-4-cool-text.png";

  //Dialog Images
  let princessDialog1 = new Image();
  princessDialog1.src = "images/dialog/princess-dialog-1.png";
  let olafDialog1 = new Image();
  olafDialog1.src = "images/dialog/olaf-dialog-1.png";

  let keyPress = {}; //initialize the list that containing key presses

  // prince walking right when click the right arrow
  addEventListener(
    "keydown",
    function (e) {
      keyPress[e.keyCode] = true;
      walkingSoundPlay();
    },
    false
  );

  addEventListener(
    "keyup",
    function (e) {
      delete keyPress[e.keyCode];
      walkingSoundStop();
    },
    false
  );

  function walkingSoundPlay() {
    walkingSound.play();
  }

  function walkingSoundStop() {
    setTimeout(() => {
      walkingSound.pause();
    }, 200);
  }

  //function to update the state of the game for elapsed time since last rendering of object
  function update() {
    if (olafX > 1500) {
      window.open("stage-5.html", "_self"); //continues to next scene
      return;
    }

    //checks if left arrow is pressed
    if (37 in keyPress) {
      olafX = olafX - 1;
      princesX = princesX + 1;
    }

    //checks if right arrow is pressed
    if (39 in keyPress) {
      olafX = olafX + 1;
      princesX = princesX - 1;
    }

    //Princess can see
    if (olafX > 400) {
      princessCanSee = true;
    }
    //Princess cant see
    if (olafX > 550) {
      princessCanSee = false;
    }

    // Show Summer First Time
    if (olafX > 1000) {
      document.body.style.backgroundImage = "url('images/background/stage-4-summer-bg.jpg')";
      feelHeat = true;
    }
    if (olafX < 1000) {
      document.body.style.backgroundImage = "url('images/background/stage-4-winter-bg.jpg')";
      feelHeat = false;
    }
  }

  //function to clear the canvas
  function clear() {
    ctx.canvas.width = window.innerWidth + olafX;
    ctx.canvas.height = window.innerHeight - 20;
  }

  //function to draw objects
  function draw() {
    ctx.drawImage(olafImage, olafX, olafY, 300, 300);
    ctx.drawImage(princesImage, princesX, princesY);

    //ON Olaf See Princess
    if (princessCanSee) {
      ctx.drawImage(princessDialog1, princesX - 100, princesY - 100, 200, 200);

      setTimeout(() => {
        princessDialog1.src = "images/dialog/transparent-bg.png";
        ctx.drawImage(olafDialog1, olafX + 200, olafY - 100, 200, 200);
      }, 1000);
    }

    //Olaf on sunny forest
    if (feelHeat) {
      console.log(olafX);
      olafImage.src = "images/charactors/olaf-walking-sad.png";
      ctx.drawImage(meltingTextImage, olafX + 200, olafY - 200, 300, 300);
    } else {
      if (olafX > 1600) {
        ctx.drawImage(coolTextImage, olafX + 200, olafY - 200, 300, 300);
      }
      olafImage.src = "images/charactors/olaf-walking-happy.png";
    }
  }

  //main function rendering the objects with state changes
  function gameLoop() {
    clear();
    update();
    draw();
    setTimeout(gameLoop, 0); //calls the game loop
  }
  gameLoop(); //calls game loop for first time
}
