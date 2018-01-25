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


function Player(game)   {
    //Loading Animations
    this.idleAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 0, 0, 128, 128, 0.2, 8, true, false);
    this.runAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 384, 128, 128, 128, 0.05, 8, true, false);
    this.runStartAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 0, 128, 128, 128, 0.2, 3, false, false);
    this.jumpAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 640, 256, 128, 128, 0.1, 5, false, false);
    this.jumpStartAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 384, 256, 128, 128, 0.05, 2, false, false);
    this.fallAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 512, 384, 128, 128, 0.2, 4, true, false);
    this.fallStartAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 256, 384, 128, 128, 0.05, 2, false, false);

    this.jumpingState = 0; // 0 is on the ground, 1 is starting to jump, 2 is rising, 3 is beginning to fall, 4 is falling.  Has priority over running.
    this.runningState = 0; // 0 is idle, 1 is starting to run, 2 is running
    this.direction = 0;
    this.canJump = true;
    this.radius = 100;
    this.ground = 400;
    Entity.call(this, game, 0, 400, 0, 0);

}
Player.prototype = new Entity();
Player.prototype.constructor = Player;

Player.prototype.update = function ()   {
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
	///////////////////////////// WALL COLLISION ////////////////////////////////
    this.x += this.xv;
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
    else {
        this.idleAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        //console.log(this.x);
    }
		
    Entity.prototype.draw.call(this);
}

// the "main" code begins here

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./img/player.png");
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
