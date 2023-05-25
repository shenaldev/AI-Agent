window.onload = init();
function init() {
  const c = document.getElementById("canvas-stage-3");
  let ctx = c.getContext("2d");
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
  document.body.style.backgroundImage = "url('images/background/stage-3-rock-cave-bg.jpg')";
  document.body.style.backgroundSize = "contain";

  //Play Bg Music
  document.addEventListener("keydown", () => {
    let bgMusic = document.getElementById("bg-music");
    bgMusic.play();
    bgMusic.volume = 0.5;
  });

  //darwing player image
  let princeXCordinates = 5; //player x cordinates
  let princeYCordinates = 290; //player y cordinates
  let princeImage = new Image();
  princeImage.src = "images/charactors/prince.png";

  princeImage.onload = function () {
    ctx.drawImage(princeImage, princeXCordinates, princeYCordinates);
  };

  //drawing Eskimo
  let jungleGirlXCordinates = 1000; //Eskimo x coordinates
  let jungleGirlYCordinates = 350; // Eskimo y coordinates
  let jungleGirlImage = new Image();
  jungleGirlImage.src = "images/charactors/anna-jungle.png";

  jungleGirlImage.onload = function () {
    ctx.drawImage(jungleGirlImage, jungleGirlXCordinates, jungleGirlYCordinates);
  };

  //Drawing dialogues
  let jungleGirlDialog1 = new Image();
  jungleGirlDialog1.src = "images/dialog/jungle-girl-dialog-1.png";

  let princeDialog1 = new Image();
  princeDialog1.src = "images/dialog/prince-dialog-1.png";

  let jungleGirlDialog2 = new Image();
  jungleGirlDialog2.src = "images/dialog/jungle-girl-dialog-2.png";

  let princeDialog2 = new Image();
  princeDialog2.src = "images/dialog/prince-dialog-2.png";

  let jungleGirlCanSee = false; //Player visibility to the Eskimo initally set to false
  let chatComplete = true;

  let keyPress = {}; //initialize the list that containing key presses

  addEventListener(
    "keydown",
    function (e) {
      keyPress[e.keyCode] = true;
    },
    false
  );

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
      princeXCordinates = princeXCordinates - 5; //changes position of player to move back
    }
    //checks if right arrow is pressed
    if (39 in keyPress && chatComplete == true) {
      princeXCordinates = princeXCordinates + 5; //chanes position of the player to move forward
    }

    //when the player appraaches the Eskimo sees the player
    if (princeXCordinates > 600 && princeXCordinates < 700) {
      jungleGirlCanSee = true;
    } else {
      jungleGirlCanSee = false;
    }

    if (princeXCordinates > 1500) {
      window.open("stage-4.html", "_self"); //continues to next scene
    }
  }

  //function to clear the canvas
  function clear() {
    ctx.canvas.width = window.innerWidth + princeXCordinates;
    ctx.canvas.height = window.innerHeight - 20;
  }
  //function to draw objects
  function draw() {
    ctx.drawImage(princeImage, princeXCordinates, princeYCordinates);
    ctx.drawImage(jungleGirlImage, jungleGirlXCordinates, jungleGirlYCordinates);

    //Eskimo begins conversation upon seeing the player
    if (jungleGirlCanSee == true) {
      ctx.drawImage(jungleGirlDialog1, jungleGirlXCordinates - 190, jungleGirlYCordinates - 20); //displays first dialugue by Eskimo

      setTimeout(function () {
        ctx.drawImage(princeDialog1, princeXCordinates + 80, princeYCordinates - 20);
        jungleGirlDialog1.src = "images/dialog/transparent-bg.png";
      }, 3000); //player responds after few seconds delay

      setTimeout(function () {
        ctx.drawImage(jungleGirlDialog2, jungleGirlXCordinates - 190, jungleGirlYCordinates - 20);
        princeDialog1.src = "images/dialog/transparent-bg.png";
      }, 6000); //the eskimo responds to player after few seconds delay

      setTimeout(function () {
        ctx.drawImage(princeDialog2, princeXCordinates + 80, princeYCordinates - 20);
        jungleGirlDialog2.src = "images/dialog/transparent-bg.png";
      }, 9000); //player responds
    }
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
