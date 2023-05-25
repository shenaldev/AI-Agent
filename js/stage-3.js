window.onload = init();
function init() {
  let monsterDed = false;

  const c = document.getElementById("canvas-stage-3");
  ctx = c.getContext("2d");
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
  document.body.style.backgroundImage = "url('images/background/stage-2-castle-bg.jpg')";
  document.body.style.backgroundSize = "cover";

  //Play Bg Music
  document.addEventListener("keydown", () => {
    let bgMusic = document.getElementById("bg-music");
    bgMusic.play();
    bgMusic.volume = 0.5;
  });

  //Sounds
  let swordSound = new Audio("sounds/sword-sound.mp3");

  //darwing prince image
  let princeXCordinates = 20; //prince x cordinates
  let princeYCordinates = 520; //prince y cordinates
  let princeImage = new Image();
  princeImage.src = "images/charactors/prince.png";

  //darwing sword image
  let swordXCordinates = 20; //sword x cordinates
  let swordYCordinates = 420; //sword y cordinates
  let swordImage = new Image();
  swordImage.src = "images/sword.png";

  swordImage.onload = function () {
    ctx.drawImage(swordImage, swordXCordinates, swordYCordinates);
  };

  //drawing monster
  let monsterXCordinates = 1500; //monster x cordinates
  let monsterYCordinates = 440; //monster y cordinates
  let monsterImage = new Image();
  monsterImage.src = "images/charactors/monster.png";

  monsterImage.onload = function () {
    ctx.drawImage(monsterImage, monsterXCordinates, monsterYCordinates);
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

  function moveMonster() {
    if (!monsterDed) {
      if (monsterXCordinates > princeXCordinates + 150) {
        setTimeout(() => {
          monsterXCordinates = monsterXCordinates - 1;
        }, 600);
      } else if (monsterXCordinates < 1500) {
        setTimeout(() => {
          monsterXCordinates = monsterXCordinates + 1;
        }, 600);
      }
    }
  }

  /**
   * IF monster near hit to monster
   */
  function checkMonsterNear() {
    if (!monsterDed) {
      if (monsterXCordinates < princeXCordinates + 200) {
        //HIT monster on near
        setTimeout(() => {
          ctx.drawImage(swordImage, swordXCordinates, swordYCordinates + 30, 400, 400);
          swordSound.play();
        }, 300);
        // Change hit state on monster near
        setTimeout(() => {
          monsterDed = true;
        }, 5000);
      }
    }
  }

  //function to update the state of the game for elapsed time since last rendering of object
  function update() {
    //checks if left arrow is pressed
    if (37 in keyPress) {
      princeXCordinates = princeXCordinates - 5; //changes position of player to move back
      swordXCordinates = swordXCordinates - 5;
    }

    //checks if right arrow is pressed
    if (39 in keyPress) {
      princeXCordinates = princeXCordinates + 5; //changes position of the player to move forward
      swordXCordinates = swordXCordinates + 5;
    }
    checkMonsterNear();

    if (monsterDed) {
      monsterImage.src = "images/charactors/monster-ded.png";
    }

    if (monsterDed) {
      setTimeout(() => {
        window.open("stage-4.html", "_self"); //continues to next scene
      }, 2000);
    }
  }

  //function to clear the canvas
  function clear() {
    //ctx.canvas.width  = window.innerWidth;
    ctx.canvas.width = window.innerWidth + princeXCordinates;
    ctx.canvas.height = window.innerHeight - 20;
  }

  //function to draw objects
  function draw() {
    ctx.drawImage(swordImage, swordXCordinates, swordYCordinates, 400, 400);
    ctx.drawImage(princeImage, princeXCordinates, princeYCordinates);
    ctx.drawImage(monsterImage, monsterXCordinates, monsterYCordinates);
  }

  //main function rendering the objects with state changes
  function gameLoop() {
    clear();
    update();
    draw();
    moveMonster();
    setTimeout(gameLoop, 20); //calls the game loop
  }
  gameLoop(); //calls game loop for first time
}
