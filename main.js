var width = 1136;
var height = 544;


function Background(game) {
//    this.bgAnimation = new Animation(ASSET_MANAGER.getAsset("./img/bg15.png"), 0, 0, width, height, 0.1, 8, true, false);
    this.bgAnimation = new Animation(ASSET_MANAGER.getAsset("./img/bg20.png"), 0, 0, width, height, 0.1, 23, true, false);


    Entity.call(this, game, 0, 0, 0, 0, false);
}
Background.prototype = new Entity();
Background.prototype.constructor = Background;

Background.prototype.update = function () {
}

Background.prototype.draw = function (ctx) {
    this.bgAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
}
<<<<<<< HEAD
=======
Player.prototype = new Entity();
Player.prototype.constructor = Player;



Player.prototype.update = function ()   {
    playerX = this.x;
    playerY = this.y;

    if (this.game.space && this.canJump)    {
        this.jumpingState = 1;
        this.canJump = false;
        //this.yv = 10;
    }
    // if (this.yv > 0) {
    //     this.yv -= .5;
    // }
    if (this.jumpingState === 0 && this.game.spaceReleased) this.canJump = true;
    //this.direction = this.game.direction;

    if (this.jumpingState === 1) {
        // jumpingState 1 is for the initial jumping wind up animation.  The character is about to kick off the ground.
        if (this.jumpStartAnimation.elapsedTime + this.game.clockTick >= this.jumpStartAnimation.totalTime) {   //hard coded value of 0.2 from jumpStartAnimation's animation time
            this.jumpStartAnimation.elapsedTime = 0;
            this.jumpingState++;  //increment to next state for next update().
            this.yv = 1500;
        }

    } else if (this.jumpingState === 2) {
        // jumpingState 2 is when the player is rising.
        // var jumpDistance = this.jumpAnimation.elapsedTime / this.jumpAnimation.totalTime;
        // var totalHeight = 75;

        // if (jumpDistance > 0.5)
        //     this.jumpingState++;

        //var height = jumpDistance * 2 * totalHeight;
        // var height = totalHeight*(-4 * (jumpDistance * jumpDistance - jumpDistance));
        // this.y = this.ground - height;
        if (this.yv < 100)  {
            this.jumpAnimation.elapsedTime = 0;
            this.jumpingState++;
        }
        this.yv -= 100;


    } else if (this.jumpingState === 3) {
        // jumpingState 3 is the transition from rising to falling.
        if (this.fallStartAnimation.elapsedTime + this.game.clockTick >= this.fallStartAnimation.totalTime) {   //hard coded value of 0.2 from jumpStartAnimation's animation time
            this.fallStartAnimation.elapsedTime = 0;
            this.jumpingState++;  //increment to next state for next update().
        }
        this.yv -= 100;
    } else if (this.jumpingState === 4) {
        // jumpingState 4 is when the player is falling.
        this.yv -= 100;
        if (this.y > 400) {
            this.y = 400;
            this.fallAnimation.elapsedTime = 0;
            this.jumpingState = 0;  // Instead of making this 0, we should increment this by 1 so it progresses to the next jumpingState.
            this.yv = 0;
        }
    }

    this.direction = this.x;

    if (this.game.aKey) {
        this.xv = -10;
        //console.log(this.xv);
    } else if (!this.game.aKey && !this.game.dKey) {
        if (this.xv < 0) {
            this.xv += 1;
        }
        //console.log(this.xv);
    }

    if (this.game.dKey) {
        this.xv = 10;
        //console.log(this.xv)
    } else if (!this.game.dKey && !this.game.aKey) {
        if (this.xv > 0) {
            this.xv -= 1;
        }
        //console.log(this.xv);
    }

    //////////////////////////// Throwing  (w key) //////////////////////////////////////
    if (this.game.wKey && this.ballState === 1) {  //
        this.ballState = 2;
    }

    // reload (for testing)
    if (this.game.rKey) {
        this.ballState = 1;
    }

    if (this.ballState === 2) {
        this.canJump = false; // player must wait untill throw is complete before jumping
        if (this.throwAnimation.isDone()) {
            this.game.addEntity(new Ball(this.game, ASSET_MANAGER.getAsset("./img/ball.png")));
            this.throwAnimation.elapsedTime = 0;
            this.ballState = 0;
            this.canJump = true;
        }
    }
///////////////////////  End Throwing ///////////////////////////////////////////

	///////////////////////////// WALL COLLISION ////////////////////////////////
    this.x += 100 * this.xv * this.game.clockTick;
    this.y -= this.yv * this.game.clockTick;
	if (this.x < 0)
		this.x = 0;
	//Ceiling collision
	if (this.y < 0)
		this.y = 0;

	if (this.x > 1472) //canvasWidth - playerWidth = 1600 - 128 = 1472
		this.x = 1472;

	if (this.y > 672) //canvasHeight - playerHeight = 800 - 128 = 672
		this.y = 672;
	/////////////////////////// END WALL COLLISION //////////////////////////////

    Entity.prototype.update.call(this);
}

Player.prototype.draw = function(ctx)   {
    if (this.jumpingState === 1) {  //Drawing initial jump wind up animation
        this.jumpStartAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    }
    else if (this.jumpingState === 2)   { //Drawing rising animation
        this.jumpAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    }
    else if (this.jumpingState === 3)   { //Drawing transition from rising to falling
        this.fallStartAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    }
    else if (this.jumpingState === 4)   { //Drawing falling animation
        this.fallAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    }
    else if (this.x !== this.direction) {
        this.direction = this.x;
        this.runAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    }
    else if (this.ballState === 0) {
        this.idleAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    }
    else if (this.ballState === 1) {
        this.ballAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    }
    else if (this.ballState === 2) {
        this.throwAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    }
    else {
        this.idleAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        //console.log(this.x);
    }

    Entity.prototype.draw.call(this);
}

//////////////// Ball Class  /////////////////////////////


function Ball(game) {
    this.idleAmination = new Animation(ASSET_MANAGER.getAsset("./img/ball.png"), 0, 0, 20, 20, .5, 1, true, false);  // this might be dumb cause it isnt moving
    this.flyingAnimation = new Animation(ASSET_MANAGER.getAsset("./img/ball.png"), 0, 0, 20, 20, .3, 4, true, false);
    this.speed = 600;

    this.ctx = game.ctx;
    Entity.call(this, game, playerX + 50, playerY + 50);

}

Ball.prototype = new Entity();
Ball.prototype.constructor = Ball;

Ball.prototype.update = function() {
    this.x += this.game.clockTick * this.speed;

    // remove from world if it goes off the screen
    if (this.x > 1650) {
        this.removeFromWorld = true;
    }
    Entity.prototype.update.call(this);
}

Ball.prototype.draw = function() {
    this.flyingAnimation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}


////////////// END Ball Class ///////////////////////////
>>>>>>> no more jumping during throw animation

//////////////// the "main" code begins here  ////////////////////////

var ASSET_MANAGER = new AssetManager();


//ASSET_MANAGER.queueDownload("./img/bg15.png");
ASSET_MANAGER.queueDownload("./img/bg20.png");
ASSET_MANAGER.queueDownload("./img/player.png");
ASSET_MANAGER.queueDownload("./img/ball.png");
ASSET_MANAGER.queueDownload("./img/Training_dummy.png");
ASSET_MANAGER.queueDownload("./img/explosion.png");
//ASSET_MANAGER.queueDownload("./bgmusic.mp3");
//ASSET_MANAGER.queueDownload("./fight.mp3");

ASSET_MANAGER.downloadAll(function () {
    console.log("Powering up!");
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');

    var gameEngine = new GameEngine();
    // var bg = new Background(gameEngine);
    // var player = new Player(gameEngine);
    var dummy = new Dummy(gameEngine, 800, 380, 2, ASSET_MANAGER.getAsset("./img/Training_dummy.png"));

    // gameEngine.addEntity(bg);
    // gameEngine.addEntity(player);
    var player1 = new Player(gameEngine, 0, 400, 1, ASSET_MANAGER.getAsset("./img/player.png"));
    //var player2 = new Player (gameEngine, 800, 400, 2, ASSET_MANAGER.getAsset("./img/player.png"));

    gameEngine.addEntity(new Background(gameEngine, ASSET_MANAGER.getAsset("./img/bg20.png")));
    gameEngine.addEntity(player1);
    gameEngine.addEntity(dummy);
    //gameEngine.addEntity(player2);
    var player = new Player(gameEngine);

    var player = new Player(gameEngine);


    gameEngine.init(ctx);
    gameEngine.start();
});

var fight = new Audio("./fight.mp3");
fight.play();
fight.volume = .1;

var bgmusic = new Audio("./bgmusic.mp3");

bgmusic.play();
bgmusic.volume = 0.05;

var throwsound = new Audio("./throw.mp3");
throwsound.volume = .25;
//var bgmusic = new Audio('bgmusic.mp3');
//audio.currentTime = "50";
