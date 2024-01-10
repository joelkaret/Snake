let player;
let scl = 40;
let fr = 8;
let board_height = 10
let board_width = 10
let board = [];
let counter = 0;
let apple = false;
let apple_coord;
let life_state = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  player = new Snake();
  frameRate(fr);
  textSize(32);
  newApple();
}

function draw() {
  // alive()
  player.update();
  if (player.killCheck()) {
    player.xSpeed = 0;
    player.ySpeed = 0;
    if (life_state) {
      dead();
    }
  } else {
    // player.update()
    alive();
  }
  // background(69);
  // fill(255)
  // rect(0, 0, board_height * scl, board_height * scl)
  // fill(255);
  // text(`(${player.x}, ${player.y}) - alive`, 10, board_height * scl  + scl);
  // text(`(Score: ${player.size})`, board_width * scl + scl, scl + 10);
  // player.update();
  // if (player.killCheck()) {
  //   textSize(32);
  //   fill(255);
  //   text(`(${player.x}, ${player.y}) - dead`, 10, board_height * scl  + 3 * scl);
  //   noLoop();
  //   return;
  // }
  // player.show();
  // checkApple();
  // displayApple(apple_coord);
}

function alive() {
  textSize(32)
  background(69);
  fill(255)
  rect(0, 0, board_width * scl, board_height * scl);
  fill(255);
  text(`(${player.x}, ${player.y}) - alive`, 10, board_height * scl + scl);
  text(`(Score: ${player.size})`, board_width * scl + scl, scl + 10);
  // player.update();
  player.show();
  checkApple();
  displayApple(apple_coord);
}

function dead() {
  life_state = false;
  textSize(32);
  fill(255);
  text(`(${player.x}, ${player.y}) - dead`, 10, board_height * scl + 3 * scl);
  // noLoop();
}

class Snake {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.xSpeed = scl;
    this.ySpeed = 0;
    // this.nxSpeed = scl
    // this.nySpeed = 0
    this.size = 1;
    this.positions   = [[0, 0]]

    this.update = function () {
      // this.xSpeed = this.nxSpeed
      // this.ySpeed = this.nySpeed
      this.x += this.xSpeed;
      this.y += this.ySpeed;
      this.positions.push([this.x, this.y])
      if (this.positions.length > this.size) {
        this.positions.splice(0, 1);
      }
      // console.log(this.positions)
      // this.x = constrain(this.x, 0, width - scl)
      // this.y = constrain(this.y, 0, height - scl)
    };

    this.show = function () {
      for (let i = 0; i < this.positions.length; i++) {
        fill(30);
        rect(this.positions[i][0], this.positions[i][1], scl, scl);
      }
    };

    this.killCheck = function () {
      for (let coords = 0; coords < this.positions.length - 2; coords++) {
        if (this.positions[coords][0] == this.x && this.positions[coords][1] == this.y) {
          return true;
        }
      }
      if (this.x < 0 || this.x > board_width * scl - scl || this.y < 0 || this.y > board_height * scl - scl) {
        return true;
      }
      return false;
    }
  }
}

function newApple() {
  let invalid = true;
  while (invalid) {
    invalid = false;
    let coord = [Math.floor(Math.random() * board_width) * scl, Math.floor(Math.random() * board_height) * scl];
    for (coordinates of player.positions) {
      if (coord[0] == coordinates[0] && coord[1] == coordinates[1]) {
        invalid = true;
      }
    }
    apple = true;
    apple_coord = coord
  }
}

function displayApple(coord) {
  fill(180)
  rect(coord[0], coord[1], scl, scl);
}

function checkApple() {
  if (player.x != apple_coord[0] || player.y != apple_coord[1]) return
  newApple()
  player.size += 1
}

function keyPressed() {
  // console.log(keyCode)
  // 37 = Left Arrow // 65 = A
  // 38 = Up Arrow // 87 = W
  // 39 = Right Arrow // 68 = D
  // 40 = Down Arrow // 83 = S
  // while (!(player.x % 20 == 0 && player.y % 20 == 0)) {
  //   let x = 5
  // }
  if (!life_state) {
    if (keyCode === 32) {
      player = new Snake();
      life_state = true;
      newApple();
    }
    return;
  };
  if (keyCode === 37 || keyCode === 65) {
    player.xSpeed = -scl;
    player.ySpeed = 0;
  } else if (keyCode === 38 || keyCode === 87) {
    player.ySpeed = -scl
    player.xSpeed = 0;
  } else if (keyCode === 39 || keyCode === 68) {
    player.xSpeed = scl
    player.ySpeed = 0;
  } else if (keyCode === 40 || keyCode === 83) {
    player.ySpeed = scl
    player.xSpeed = 0;
  }
}

for (let i = 0; i < board_width; i++) {
  for (let j = 0; j < board_height; j++) {
    board.push([i * scl, j * scl])
  }
}