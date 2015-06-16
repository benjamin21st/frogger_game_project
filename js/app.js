"use strict";

var Character = function() {
    this.x = 0;
    this.y = 0;
    this.sprite = '';
};

Character.prototype.update = function(dt) {
    return dt;
};

Character.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


var Enemy = function (sprite) {
    this.prototype = new Character();
    this.prototype.constructor = this;

    this.sprite = sprite;
    this.x = -101;
    this.y = Math.floor(Math.random() * 10) * 30;

    this.render = this.prototype.render;

    this.update = function (dt) {
        if (this.x >= 600) {
            var index = allEnemies.indexOf(this);
            allEnemies.splice(index, 1);
        }
        this.x += dt * 100;

        return dt;
    };
};


var Player = function(sprite) {
    this.prototype = new Character();
    this.prototype.constructor = this;

    this.sprite = sprite;
    this.x = 0;
    this.y = 400;

    this.render = this.prototype.render;

    this.update = function () {
        var _this = this;
        /*
         * If the player encounters an enemy, restart the game
         * */
        allEnemies.forEach(function (el) {
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

    this.handleInput = function (key) {
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
};


var player = new Player('images/char-cat-girl.png');
var allEnemies = [];

/* A function to add new enemies to the game */
function addBugsToGame() {
    setInterval(function() {
        var newBug = new Enemy('images/enemy-bug.png');
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
