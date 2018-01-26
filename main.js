function Animation(spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse) {
    this.spriteSheet = spriteSheet;
    this.startX = startX;
    this.startY = startY;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.reverse = reverse;
}

Animation.prototype.drawFrame = function (tick, ctx, x, y, scaleBy) {
    var scaleBy = scaleBy || 1;
    this.elapsedTime += tick;
    if (this.loop) {
        if (this.isDone()) {
            this.elapsedTime = 0;
        }
    } else if (this.isDone()) {
        return;
    }

///// play animation in reverse /////
    var index = this.reverse ? this.frames - this.currentFrame() - 1 : this.currentFrame();
    var vindex = 0;
    if ((index + 1) * this.frameWidth + this.startX > this.spriteSheet.width) {
        index -= Math.floor((this.spriteSheet.width - this.startX) / this.frameWidth);
        vindex++;
    }
    while ((index + 1) * this.frameWidth > this.spriteSheet.width) {
        index -= Math.floor(this.spriteSheet.width / this.frameWidth);
        vindex++;
    }

    var locX = x;
    var locY = y;
    var offset = vindex === 0 ? this.startX : 0;
    ctx.drawImage(this.spriteSheet,
                  index * this.frameWidth + offset, vindex * this.frameHeight + this.startY,  // source from sheet
                  this.frameWidth, this.frameHeight,
                  locX, locY,
                  this.frameWidth * scaleBy,
                  this.frameHeight * scaleBy);
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}
function Background(game) {
    Entity.call(this, game, 0, 400);
    this.radius = 200;
}
Background.prototype = new Entity();
Background.prototype.constructor = Background;

Background.prototype.update = function () {
}

Background.prototype.draw = function (ctx) {
    ctx.fillStyle = "SaddleBrown";
    ctx.fillRect(0,500,1600,300);
    Entity.prototype.draw.call(this);
}



var playerX = 0;
var playerY = 0;

function Player(game)   {
    //Loading Animations
//// Right Animations ////
    this.LIdleAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 0, 0, 128, 128, 0.08, 8, true, false);
    this.LRunAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 384, 128, 128, 128, 0.05, 8, true, false);
    this.LRunStartAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 0, 128, 128, 128, 0.05, 3, false, false);
    this.LJumpAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 640, 256, 128, 128, 0.1, 5, false, false);
    this.LJumpStartAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 384, 256, 128, 128, 0.05, 2, false, false);
    this.LFallAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 512, 384, 128, 128, 0.2, 4, true, false);
    this.LFallStartAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 256, 384, 128, 128, 0.05, 2, false, false);
    this.LBallAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"),0, 512, 128, 128, 0.08, 8, true, false);  // payer has ball
    this.LThrowAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 0, 640, 128, 128, 0.02, 6, false, false);

    //// Left Animations ////
    this.RIdleAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 0, 768, 128, 128, 0.08, 8, true, false);
    this.RRunAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 384, 896, 128, 128, 0.05, 8, true, false);
    this.RRunStartAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 0, 896, 128, 128, 0.05, 3, false, false);
    this.RJumpAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 640, 1024, 128, 128, 0.1, 5, false, false);
    this.RJumpStartAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 384, 1024, 128, 128, 0.05, 2, false, false);
    this.RFallAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 512, 1152, 128, 128, 0.2, 4, true, false);
    this.RFallStartAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 256, 1152, 128, 128, 0.05, 2, false, false);
    this.RBallAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"),0, 1280, 128, 128, 0.08, 8, true, false);  // payer has ball
    this.RThrowAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 0, 1408, 128, 128, 0.02, 6, false, false);

    this.jumpingState = 0; // 0 is on the ground, 1 is starting to jump, 2 is rising, 3 is beginning to fall, 4 is falling.  Has priority over running.
    this.runningState = 0; // 0 is idle, 1 is starting to run, 2 is running
    this.ballState = 1; //0- no ball, 1- has ball, 2- throwing.
    this.direction = 0;
    this.facingLeft = false;
    this.canJump = true;
    this.radius = 100;
    this.ground = 400;
    Entity.call(this, game, 0, 400, 0, 0);

}
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
        if (this.LJumpStartAnimation.elapsedTime + this.game.clockTick >= this.LJumpStartAnimation.totalTime) {   //hard coded value of 0.2 from LJumpStartAnimation's animation time
            this.LJumpStartAnimation.elapsedTime = 0;
            this.RJumpStartAnimation.elapsedTime = 0;
            this.jumpingState++;  //increment to next state for next update().
            this.yv = 1500;
        } else if (this.RJumpStartAnimation.elapsedTime + this.game.clockTick >= this.LJumpStartAnimation.totalTime) {
            this.RJumpStartAnimation.elapsedTime = 0;
            this.LJumpStartAnimation.elapsedTime = 0;
            this.jumpingState++;  //increment to next state for next update().
            this.yv = 1500;
        }

    } else if (this.jumpingState === 2) {
        // jumpingState 2 is when the player is rising.
        // var jumpDistance = this.LJumpAnimation.elapsedTime / this.LJumpAnimation.totalTime;
        // var totalHeight = 75;

        // if (jumpDistance > 0.5)
        //     this.jumpingState++;

        //var height = jumpDistance * 2 * totalHeight;
        // var height = totalHeight*(-4 * (jumpDistance * jumpDistance - jumpDistance));
        // this.y = this.ground - height;
        if (this.yv < 100)  {
            this.LJumpAnimation.elapsedTime = 0;
            this.RJumpAnimation.elapsedTime = 0;
            this.jumpingState++;
        }
        this.yv -= 100;


    } else if (this.jumpingState === 3) {
        // jumpingState 3 is the transition from rising to falling.
        if (this.RFallStartAnimation.elapsedTime + this.game.clockTick >= this.RFallStartAnimation.totalTime) {   //hard coded value of 0.2 from LJumpStartAnimation's animation time
            this.RFallStartAnimation.elapsedTime = 0;
            this.jumpingState++;  //increment to next state for next update().
        } else if (this.LFallStartAnimation.elapsedTime + this.game.clockTick >= this.LFallStartAnimation.totalTime) {   //hard coded value of 0.2 from LJumpStartAnimation's animation time
            this.LFallStartAnimation.elapsedTime = 0;
            this.jumpingState++;  //increment to next state for next update().)
            this.yv -= 100;
        }
    } else if (this.jumpingState === 4) {
        // jumpingState 4 is when the player is falling.
        this.yv -= 100;
        if (this.y > 400) {
            this.y = 400;
            this.LFallAnimation.elapsedTime = 0;
            this.RFallAnimation.elapsedTime = 0;
            this.jumpingState = 0;  // Instead of making this 0, we should increment this by 1 so it progresses to the next jumpingState.
            this.yv = 0;
        }
    }
    /// why is this here?
    this.direction = this.x;

    if (this.game.aKey) {
        this.facingLeft = true;
        this.moving = true;  //All this does is help with the runningState logic.
        this.xv = -10;
        //console.log(this.xv);
    } else if (!this.game.aKey && !this.game.dKey) {
        if (this.xv < 0) {
            this.xv += 1;
            this.moving = false;
        }
        //console.log(this.xv);
    }

    if (this.game.dKey) {
        this.facingLeft = false;
        this.xv = 10;
        this.moving = true;
        //console.log(this.xv)
    } else if (!this.game.dKey && !this.game.aKey) {
        if (this.xv > 0) {
            this.xv -= 1;
            this.moving = false;
        }
        //console.log(this.xv);
    }
    // This is for determining the running state.
    if (this.moving && this.runningState === 0) {
        this.runningState = 1;
    } else if (this.moving && this.runningState === 1 &&
        (this.LRunStartAnimation.elapsedTime + this.game.clockTick > this.LRunStartAnimation.totalTime ||
            this.RRunStartAnimation.elapsedTime + this.game.clockTick > this.RRunStartAnimation.totalTime))    {
                this.runningState = 2;
                this.RRunStartAnimation.elapsedTime = 0;
                this.LRunStartAnimation.elapsedTime = 0;
    }
    if (!this.moving)   {
        this.RRunAnimation.elapsedTime = 0;
        this.LRunAnimation.elapsedTime = 0;
        this.runningState = 0;
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
        if (this.LThrowAnimation.isDone()) {
            this.game.addEntity(new Ball(this.game, this.facingLeft));
            this.LThrowAnimation.elapsedTime = 0;
            this.ballState = 1; //*********** change to 0 to remove ball from player ****************
        } else if (this.RThrowAnimation.isDone()) {
            this.game.addEntity(new Ball(this.game, this.facingLeft));
            this.RThrowAnimation.elapsedTime = 0;
            this.ballState = 1;  //************change to 0 to remove ball from player ******************
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
/////////////////////// Right facing sprites ///////////////////////////
    if (this.facingLeft) {
        if (this.ballState === 2) {
            this.LThrowAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        }
        else if (this.jumpingState === 1) {  //Drawing initial jump wind up animation
            this.LJumpStartAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        }
        else if (this.jumpingState === 2)   { //Drawing rising animation
            this.LJumpAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        }
        else if (this.jumpingState === 3)   { //Drawing transition from rising to falling
            this.LFallStartAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        }
        else if (this.jumpingState === 4)   { //Drawing falling animation
            this.LFallAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        }
        else if (this.runningState === 2) {
            this.direction = this.x;
            this.LRunAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        }
        else if (this.runningState === 1)   {
            this.LRunStartAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        }
        else if (this.ballState === 0) {
            this.LIdleAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        }
        else if (this.ballState === 1) {
            this.LBallAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        }
        else {
            this.LIdleAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
            //console.log(this.x);
        }
/////////////// Left facing sprites ///////////////////
    } else {  // left facing sprites
        if (this.ballState === 2) {  // throwing ball
            this.RThrowAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        }
        else if (this.jumpingState === 1) {  //Drawing initial jump wind up animation
            this.RJumpStartAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        }
        else if (this.jumpingState === 2)   { //Drawing rising animation
            this.RJumpAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        }
        else if (this.jumpingState === 3)   { //Drawing transition from rising to falling
            this.RFallStartAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        }
        else if (this.jumpingState === 4)   { //Drawing falling animation
            this.RFallAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        }
        else if (this.runningState === 2) {
            this.direction = this.x;
            this.RRunAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        }
        else if (this.runningState === 1)   {
            this.RRunStartAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        }
        else if (this.ballState === 0) {  // no ball
            this.RIdleAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        }
        else if (this.ballState === 1) {  // holding ball
            this.RBallAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        }
        else {
            this.RIdleAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
            //console.log(this.x);
        }
    }

    Entity.prototype.draw.call(this);
}

//////////////// Ball Class  /////////////////////////////

// left is true if player is facing left at time of throwing ball
function Ball(game, left) {
    this.idleAmination = new Animation(ASSET_MANAGER.getAsset("./img/ball.png"), 0, 0, 20, 20, .5, 1, true, false);  // this might be dumb cause it isnt moving
    this.flyingAnimation = new Animation(ASSET_MANAGER.getAsset("./img/ball.png"), 0, 0, 20, 20, .3, 4, true, false);

    this.ctx = game.ctx;

    if (left) { // ball will go left
        this.speed = -1500;
    } else {  // ball will go right
        this.speed = 1500;
    }
    Entity.call(this, game, playerX + 50, playerY + 50);

}

Ball.prototype = new Entity();
Ball.prototype.constructor = Ball;

Ball.prototype.update = function() {
    this.x += this.game.clockTick * this.speed;

    // remove from world if it goes off the screen
    if (this.x > 1650 || this.x < 0) {
        this.removeFromWorld = true;
    }
    Entity.prototype.update.call(this);
}

Ball.prototype.draw = function() {
    this.flyingAnimation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}


////////////// END Ball Class ///////////////////////////

//////////////// the "main" code begins here  ////////////////////////

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./img/player.png");
ASSET_MANAGER.queueDownload("./img/ball.png");
//ASSET_MANAGER.queueDownload("./img/background.gif");

ASSET_MANAGER.downloadAll(function () {
    console.log("Powering up!");
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');

    var gameEngine = new GameEngine();
    var bg = new Background(gameEngine);
    var player = new Player(gameEngine);


    gameEngine.addEntity(bg);
    gameEngine.addEntity(player);

    gameEngine.init(ctx);
    gameEngine.start();
});

var audio = new Audio('bgmusic.mp3');
audio.currentTime = "50";
audio.play();
audio.volume = 0.01;
