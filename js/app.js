// Enemies our player must avoid
// var Enemy = function() {
//     // Variables applied to each of our instances go here,
//     // we've provided one for you to get started
//
//     // The image/sprite for our enemies, this uses
//     // a helper we've provided to easily load images
//     this.sprite = 'images/enemy-bug.png';
// };
//
// // Update the enemy's position, required method for game
// // Parameter: dt, a time delta between ticks
// Enemy.prototype.update = function(dt) {
//     // You should multiply any movement by the dt parameter
//     // which will ensure the game runs at the same speed for
//     // all computers.
// };
//
// // Draw the enemy on the screen, required method for game
// Enemy.prototype.render = function() {
//     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
// };

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

//Start my code. TODO reorgainize later.

class Enemy {
  constructor () {
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
      this.y = rows[Math.floor(Math.random() * rows.length)];;
      this.speed = Math.floor((Math.random() *300) +70);
    }
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

class Player {
  constructor () {
    this.x = 202;
    this.y = 375;
    this.sprite = 'images/char-boy.png';
  }

//Cycles through allEnemies array and compares coordinates to determine collision.
  update() {
    for (const bug of allEnemies) {
      if ((this.y +17 === bug.y) && (this.x - bug.x <= 50) && (this.x - bug.x >= -74)) {
          this.y = 375;
          this.x = 202;
          document.getElementById('modal').classList.remove('closed');
          document.getElementById('modal-lose').classList.replace('closed', 'open');
        }
      }
    }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

//Changes player position depending on which key is pressed.
  handleInput(key){
    if ((key === 'up') && (this.y >= 43)) {
      this.y -= 83;

      if (this.y <= 0){  //if reached the water, open win modal.
        this.y = 375;
        this.x = 202;
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

let allEnemies = [];
const player = new Player();

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
