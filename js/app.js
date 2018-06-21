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
      if ((this.y +17 === bug.y) && (this.x - bug.x <= 50) && (this.x - bug.x >= -74)) {
        this.restart();
        document.getElementById('lose-game').addEventListener('click', function() {
          document.getElementById('modal').classList.add('closed');
          document.getElementById('modal-lose').classList.replace('open', 'closed');
        });
        document.getElementById('modal').classList.remove('closed');
        document.getElementById('modal-lose').classList.replace('closed', 'open');
      }
    }
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

//Resets player position to start.
  restart() {
    this.x = 202;
    this.y = 375;
  }

//Changes player position depending on which key is pressed.
  handleInput(key){
    if ((key === 'up') && (this.y >= 43)) {
      this.y -= 83;

      if (this.y <= 0){  //if reached the water, open win modal.
        this.restart();
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
  const rows = [60, 143, 226];
  const columns = [0, 101, 202, 303, 404]
  const gems = ['images/gem-blue.png', 'images/gem-green.png', 'images/gem-orange.png'];
  this.y = rows[Math.floor(Math.random() * rows.length)];
  this.x = columns[Math.floor(Math.random() * columns.length)];
  this.sprite = gems[Math.floor(Math.random() * gems.length)];
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    console.log(this.x, this.y)
  }

}

let allEnemies = [];
const player = new Player();
let gem = new Gem();

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
