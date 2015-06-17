"use strict";

var Character = function(x, y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
};

Character.prototype.update = function(dt) {
    return dt;
};

Character.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


var Enemy = function (x, y, sprite) {
    Character.call(this, x, y, sprite);
};
Enemy.prototype = new Character();
Enemy.prototype.constructor = Enemy;
Enemy.prototype.update = function(dt) {
    if (this.x >= 600) {
        var index = allEnemies.indexOf(this);
        allEnemies.splice(index, 1);
    }
    this.x += dt * 100;

    return dt;
};


var Player = function (x, y, sprite) {
    Character.call(this, x, y, sprite);
};
Player.prototype = new Character();
Player.prototype.constructor = Player;
Player.prototype.update = function () {
    var _this = this;
    /*
     * If the player encounters an enemy, restart the game
     * */
    allEnemies.forEach(function (el) {
        /* instead of meeting at the exact coordinates,
         *  meet at somewhere near the bug kills the player,
         *  if player gets killed, reset player position as
         *  is shown in the demo
         * */
        if ((_this.x >= el.x - 50 && _this.x <= el.x + 50) && (_this.y >= el.y - 50 && _this.y <= el.y + 50)) {
            _this.x = 0;
            _this.y = 400;
            //allEnemies.pop();
        }
    });
    /*
     * If the player hits the water, restart the game
     * */
    if (this.y <= 0) {
        this.x = 0;
        this.y = 400;
    }
};
Player.prototype.handleInput = function (key) {
    if (key === 'up') {
        this.y -= 20;
    } else if (key === 'right' && this.x <= 380) {
        this.x += 20;
    } else if (key === 'left' && this.x >= 20) {
        this.x -= 20;
    } else if (key === 'down' && this.y <= 400) {
        this.y += 20;
    }
};

//var Player = function(sprite) {
//    this.prototype = new Character();
//    this.prototype.constructor = this;
//
//    this.sprite = sprite;
//    this.x = 0;
//    this.y = 400;
//
//    this.render = this.prototype.render;
//
//    this.update = function () {
//        var _this = this;
//        /*
//         * If the player encounters an enemy, restart the game
//         * */
//        allEnemies.forEach(function (el) {
//            /* instead of meeting at the exact coordinates,
//             *  meet at somewhere near the bug kills the player,
//             *  if player gets killed, reset game and bugs
//             * */
//            if ((_this.x >= el.x - 50 && _this.x <= el.x + 50) && (_this.y >= el.y - 50 && _this.y <= el.y + 50)) {
//                _this.x = 0;
//                _this.y = 400;
//                //allEnemies.pop();
//            }
//        });
//        /*
//        * If the player hits the water, restart the game
//        * */
//        if (this.y == 0) {
//            this.x = 0;
//            this.y = 400;
//        }
//    };
//
//    this.handleInput = function (key) {
//        if (key === 'up') {
//            this.y -= 20;
//        } else if (key === 'right' && this.x <= 380) {
//            this.x += 20;
//        } else if (key === 'left' && this.x >= 20) {
//            this.x -= 20;
//        } else if (key === 'down' && this.y <= 400) {
//            this.y += 20;
//        }
//    };
//};

var playerX = 0,
    playerY = 400,
    playerSprite = 'images/char-cat-girl.png',
    player;

player = new Player(playerX, playerY, playerSprite);

var allEnemies = [];

/* A function to add new enemies to the game */
function addBugsToGame() {
    setInterval(function() {
        /*
        * Rnadomize new bug's y position here
        * instead of messing around with prototype
        * */
        var bugX,
            bugY,
            bugSprite,
            newBug;
        bugX = -101;
        bugY = Math.floor(Math.random() * 10) * 30;
        bugSprite = 'images/enemy-bug.png';
        newBug = new Enemy(bugX, bugY, bugSprite);

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
