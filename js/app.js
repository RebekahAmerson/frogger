//Start my code. TODO reorgainize later.

class Enemy {
  constructor() {
    const rows = [60, 143, 226];
    this.x = -100;
    this.y = rows[Math.floor(Math.random() * rows.length)];;
    this.sprite = 'images/enemy-bug.png';
    this.speed = Math.floor((Math.random() *300) +70);
  }

  update(dt) {
    this.x += this.speed * dt;

    if (this.x >= 505) {
      const rows = [60, 143, 226];
      this.x = -100;
      this.y = rows[Math.floor(Math.random() * rows.length)];
      this.speed = Math.floor((Math.random() *300) +70);
    }
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

class Player {
  constructor() {
    this.x = 202;
    this.y = 375;
    this.sprite = 'images/char-boy.png';
  }

//Cycles through allEnemies array and compares coordinates to determine collision.
  update() {
    for (const bug of allEnemies) {
      if ((this.y + 17 === bug.y) && (this.x - bug.x <= 50) && (this.x - bug.x >= -74)) {
        this.restart();
        this.bugHit();
        gem = new Gem();
      }
    }
    if ((this.y + 72 === gem.y) && (this.x + 25 === gem.x)) {
      this.gemScore();
      gem = '';
      console.log('gemScore ran');
      this.updateScore();
    }
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

//Resets player position to start.
  restart() {
    this.x = 202;
    this.y = 375;
    gem = '';
  }

//Opens modal dependant on how many lives are left.
  bugHit() {
    lives -= 1;
    this.updateLives();

    if (lives > 0) {
      document.getElementById('modal').classList.remove('closed');
      document.getElementById('modal-lose').classList.replace('closed', 'open');
      document.getElementById('lose-game').addEventListener('click', function() {
        document.getElementById('modal').classList.add('closed');
        document.getElementById('modal-lose').classList.replace('open', 'closed');
      });
    }

    if (lives === 0) {
      score = 0;
      this.updateScore();
    }
  }

//Updates the HUD display of lives.
  updateLives() {
    if (lives === 3) {
      document.querySelectorAll('.heart')[2].classList.remove('closed');
    }

    if (lives === 2) {
      document.querySelectorAll('.heart')[1].classList.remove('closed');
      document.querySelectorAll('.heart')[2].classList.add('closed');
    }

    if (lives === 1) {
      document.querySelectorAll('.heart')[1].classList.add('closed');
    }
  }

  updateScore() {
    document.getElementById('score').innerHTML = score;
  }

  //Adds to score depending on color of gem.
  gemScore() {
    console.log(gem.sprite);
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

//Changes player position depending on which key is pressed.
  handleInput(key){
    if ((key === 'up') && (this.y >= 43)) {
      this.y -= 83;

      if (this.y <= 0){  //if reached the water, open win modal.
        score += 100;
        this.updateScore();
        this.restart();
        gem = new Gem();
        document.getElementById('win-game').addEventListener('click', function() {
          document.getElementById('modal').classList.add('closed');
          document.getElementById('modal-win').classList.replace('open', 'closed');
        });
        document.getElementById('modal').classList.remove('closed');
        document.getElementById('modal-win').classList.replace('closed', 'open');
      }
    }

    if ((key === 'down') && (this.y <= 292)) {
      this.y += 83;
    }

    if ((key === 'left') && (this.x >=101)) {
      this.x -= 101;
    }

    if ((key === 'right') &&(this.x <= 303)) {
      this.x += 101;
    }
  }
}

class Gem {
  constructor() {
    const rows = [115, 198, 281];
    const columns = [25, 126, 227, 328, 429]
    const gems = ['images/gem-blue.png', 'images/gem-green.png', 'images/gem-orange.png'];
    this.y = rows[Math.floor(Math.random() * rows.length)];
    this.x = columns[Math.floor(Math.random() * columns.length)];
    this.sprite = gems[Math.floor(Math.random() * gems.length)];
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

let allEnemies = [];
const player = new Player();
let gem = new Gem();
let score = 0;
let lives = 3;

//Enemies
const bug1 = new Enemy();
const bug2 = new Enemy();
const bug3 = new Enemy();
allEnemies.push(bug1, bug2, bug3);

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
