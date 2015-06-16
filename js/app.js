"use strict";

var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';

    /* Bug has a length of 101, starts from its head */
    this.x = -101;
    /* Randomize y for each new bug created
    * ignore "off-bound" issues?
    * */
    var newY = Math.floor(Math.random() * 10) * 30;
    this.y = newY;
};

Enemy.prototype.update = function(dt) {
    if (this.x >= 600) {
        var index = allEnemies.indexOf(this);
        allEnemies.splice(index, 1);
    }
    this.x += dt * 100;

    return dt;
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


var Player = function () {
    this.sprite = 'images/char-cat-girl.png';
    this.x = 0;
    this.y = 400;
};

Player.prototype.update = function (dt) {
    var _this = this;
    /*
    * If the player encounters an enemy, restart the game
    * */
    allEnemies.forEach(function(el) {
        /* instead of meeting at the exact coordinates,
         *  meet at somewhere near the bug kills the player,
         *  if player gets killed, reset game and bugs
         * */
        if ((_this.x >= el.x - 50 && _this.x <= el.x + 50) && (_this.y >= el.y - 50 && _this.y <= el.y + 50)) {
            _this.x = 0;
            _this.y = 400;
            allEnemies.pop();
        }
    });
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (key) {
    console.log(key);
    if (key === 'up') {
        this.y -= 20;
    } else if (key === 'right') {
        this.x += 20;
    } else if (key === 'left') {
        this.x -= 20;
    } else if (key === 'down') {
        this.y += 20;
    }
};

var player = new Player();

var allEnemies = [];

/* A function to add new enemies to the game */
function addBugsToGame() {
    setInterval(function() {
        var newBug = new Enemy();
        allEnemies.push(newBug);
    }, 1500);
}

addBugsToGame();


document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
