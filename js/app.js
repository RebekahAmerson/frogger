'use strict';

//DOM variables
const modal = document.getElementById('modal');
const modalBugHit = document.getElementById('modal-lose');
const modalGameOver = document.getElementById('modal-game-over');
const modalLevelWin = document.getElementById('modal-win');
const modalStartGame = document.getElementById('modal-start');
const modalLevelNumber = document.getElementById('modal-level');
const buttonTryAgain = document.getElementById('lose-game');
const buttonPlayAgain = document.getElementById('game-over');
const buttonKeepPlaying = document.getElementById('win-game');
const levelDom = document.querySelectorAll('.level');
const heartDom = document.querySelectorAll('.heart');
const scoreDom = document.getElementById('score');

//Bugs.
class Enemy {
  constructor() {
    const rows = [60, 143, 226];
    this.x = -100;
    this.y = rows[Math.floor(Math.random() * rows.length)]; //randomizes start rows.
    this.sprite = 'images/enemy-bug.png';
    this.speed = Math.floor((Math.random() *300) +70); //Randomizes speed.
  }

  update(dt) {
    this.x += this.speed * dt;

    if (this.x >= 505) { //Off game board.
      const rows = [60, 143, 226];
      this.x = -100;
      this.y = rows[Math.floor(Math.random() * rows.length)];

      if (level < 5) {
        this.speed = Math.floor((Math.random() *300) +70);
      }

      if (level >= 5) {
        this.speed = Math.floor((Math.random() *350) +100);
      }
    }
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

//Player.
class Player {
  constructor() {
    this.x = 202;
    this.y = 395;
    this.sprite = 'images/char-boy.png'; //Default.
  }

//Cycles through allEnemies array and compares coordinates to determine collision.
  update() {
    for (const bug of allEnemies) {
      this.bugCollision(bug);
    }

    if (boss) {
      this.bugCollision(boss);
    }
  }

//Checks for collison with gems.
gemCollision() {
  if ((this.y + 52 === gem.y) && (this.x + 25 === gem.x)) {
    gem.gemScore();
    gem = '';
    updateScore();
  }
}

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  //Resets player position to start.
  restart() {
    this.x = 202;
    this.y = 395;
    gem = '';
  }

//Opens modal dependant on how many lives are left.
  bugHit() {
    lives -= 1;
    updateLives();

    if (lives > 0) {
      modal.classList.remove('closed');
      modalBugHit.classList.replace('closed', 'open');
      buttonTryAgain.addEventListener('click', function() {
      modal.classList.add('closed');
        modalBugHit.classList.replace('open', 'closed');
      });
    }

    if (lives === 0) {
      score = 0;
      updateScore();
      modal.classList.remove('closed');
      modalGameOver.classList.replace('closed', 'open');
      buttonPlayAgain.addEventListener('click', function() {
        modalGameOver.classList.replace('open', 'closed');
        modalStartGame.classList.replace('closed', 'open');
      });
      lives = 3;
      updateLives();
      level = 1;
      updateLevel();
      boss = '';
      this.restart();
    }
  }

//Checks for collisions with Enemy or Boss elements.
  bugCollision(bug) {
    if ((player.y - 3 === bug.y) && (player.x - bug.x <= 50) && (player.x - bug.x >= -74)) {
      this.restart();
      this.bugHit();
      gem = new Gem();
    }
  }

//Changes player position depending on which key is pressed.
  handleInput(key){
    if (modal.classList.contains('closed')) {
      if ((key === 'up') && (this.y >= 43)) {
        this.y -= 83;

        if (this.y <= 0){  //if reached the water, open win modal.
          score += 100;
          updateScore();
          level += 1;
          updateLevel();
          this.restart();
          gem = new Gem();
          modal.classList.remove('closed');
          modalLevelWin.classList.replace('closed', 'open');
          buttonKeepPlaying.addEventListener('click', function() {
            modalLevelWin.classList.replace('open', 'closed');
            modalLevelNumber.classList.replace('closed', 'open');
            setTimeout(function() {
              modalLevelNumber.classList.replace('open', 'closed');
              modal.classList.add('closed');
            }, 1000);
          });
          levelCheck();
        }
      }

      if ((key === 'down') && (this.y <= 312)) {
        this.y += 83;
      }

      if ((key === 'left') && (this.x >=101)) {
        this.x -= 101;
      }

      if ((key === 'right') &&(this.x <= 303)) {
        this.x += 101;
      }

      this.gemCollision();
    }
  }
}

//Collectibles that give points.
class Gem {
  constructor() {
    const rows = [115, 198, 281];
    const columns = [25, 126, 227, 328, 429];
    const gems = ['images/gem-blue.png', 'images/gem-green.png', 'images/gem-orange.png'];
    this.y = rows[Math.floor(Math.random() * rows.length)];
    this.x = columns[Math.floor(Math.random() * columns.length)];
    this.sprite = gems[Math.floor(Math.random() * gems.length)];
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

//Adds to score depending on color of gem.
  gemScore() {
    switch (gem.sprite) {
      case 'images/gem-orange.png':
        score += 50;
        break;
      case 'images/gem-blue.png':
        score += 25;
        break;
      case 'images/gem-green.png':
        score += 10;
    }
  }
}

//BOSS BUG!
class Boss extends Enemy {
  constructor() {
  	super();
    this.sprite = 'images/boss-bug.png';
    this.speed = Math.floor((Math.random() *400) +250);
	}

  update(dt) {
    this.x += this.speed * dt;

    if (this.x >= 505) {
      const rows = [60, 143, 226];
      this.x = -1500; //way off board to give appearance of delay before returning.
      this.y = rows[Math.floor(Math.random() * rows.length)]; //randomizes start rows.
      this.speed = Math.floor((Math.random() *400) +250);
    }
  }
}

//Game pieces.
let allEnemies = [];
const player = new Player();
let boss = '';
let gem = new Gem();
let score = 0;
let lives = 3;
let level = 1;

//Enemies
const bug1 = new Enemy();
const bug2 = new Enemy();
const bug3 = new Enemy();
allEnemies.push(bug1, bug2, bug3);

//Functions.
//Create BOSS BUG from level 7 onward.
function levelCheck() {
  if (level === 7) {
    boss = new Boss();
  }
}

//Updates score on the HUD.
function updateScore() {
    scoreDom.innerHTML = score;
  }

//Updates the HUD display of lives.
function updateLives() {
  if (lives === 3) {
    heartDom[2].classList.remove('closed');
    heartDom[1].classList.remove('closed');
  }

  if (lives === 2) {
    heartDom[1].classList.remove('closed');
    heartDom[2].classList.add('closed');
  }

  if (lives === 1) {
    heartDom[1].classList.add('closed');
  }
}

//Updates level number in the HUD and modal.
function updateLevel() {
  levelDom.forEach(function(levels) {levels.innerHTML = level;});
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
