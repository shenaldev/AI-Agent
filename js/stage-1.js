window.onload = init();
function init() {
  const c = document.getElementById("canvas-stage-1");
  let ctx = c.getContext("2d");
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
  document.body.style.backgroundImage = "url('images/background/stage-1-bg.jpg')";

  //Play Bg Music
  document.addEventListener("keydown", () => {
    let bgMusic = document.getElementById("bg-music");
    bgMusic.play();
    bgMusic.volume = 0.1;
  });

  //Sounds
  let walkingSound = new Audio("sounds/foot-steps.wav");
  let lionGrowlSound = new Audio("sounds/lion-growl.wav");

  //darwing prince image
  let princeXCordinates = 5; //prince x cordinates
  let princeYCordinates = 380; //prince y cordinates
  let princeImage = new Image();
  princeImage.src = "images/charactors/prince.png";

  princeImage.onload = function () {
    ctx.drawImage(princeImage, princeXCordinates, princeYCordinates);
  };

  //drawing deer
  let deerXCordinates = 1400; //deer x cordinates
  let deerYCordinates = 530; //deer y cordinates
  let deerImage = new Image();
  deerImage.src = "images/charactors/sven-right.png";

  deerImage.onload = function () {
    ctx.drawImage(deerImage, deerXCordinates, deerYCordinates);
  };

  //drawing cottage
  let treeXCordinates = 150;
  let treeYCordinates = -100;
  let cottage = new Image();
  cottage.src = "images/background/tree.png";

  cottage.onload = function () {
    ctx.drawImage(cottage, treeXCordinates, treeYCordinates);
  };

  //Sound Image
  let soundImage = new Image();
  soundImage.src = "images/dialog/sound.png";

  cansee = false;
  canhear = false;

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

  // prince walking left when click the left arrow
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
    //checks if left arrow is pressed
    if (37 in keyPress) {
      princeXCordinates = princeXCordinates - 5; //changes position of player to move back
      ctx.drawImage(soundImage, princeXCordinates + 50, princeYCordinates + 300);
    }

    //checks if right arrow is pressed
    if (39 in keyPress) {
      princeXCordinates = princeXCordinates + 5; //changes position of the player to move forward
      ctx.drawImage(soundImage, princeXCordinates + 50, princeYCordinates + 300);
    }
    //when the player travels a distance the lion hears the sound
    if (princeXCordinates > 150) {
      canhear = true;
      deerImage.src = "images/charactors/sven-left.png"; // the state of the lion changes from sleep to awake
      deerYCordinates = 530;
      deerXCordinates = deerXCordinates - 2;
    }
    //checks if the player and the lion are on the same side from the cottage
    if (
      (princeXCordinates < 600 && deerXCordinates < treeXCordinates) ||
      (princeXCordinates > 800 && deerXCordinates > treeXCordinates)
    ) {
      cansee = true; //if one of the conditions are true, the becomes visible to the lion
    }

    if (princeXCordinates > 1500) {
      window.open("stage-2.html", "_self"); //continues to next scene
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
    ctx.drawImage(cottage, treeXCordinates, treeYCordinates);

    if (cansee == true) {
      deerImage.src = "images/charactors/sven-angry.png";
      deerXCordinates = princeXCordinates - 50;
      deerYCordinates = princeYCordinates - 300;

      princeImage.src = "images/charactors/prince-dead.png";
      //princeXCordinates = princeXCordinates - 50;
      princeYCordinates = 750;

      lionGrowlSound.play();
      lionGrowlSound.loop = true;
    } else {
      ctx.drawImage(deerImage, deerXCordinates, deerYCordinates);
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
