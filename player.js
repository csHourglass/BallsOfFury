function Player(game, x, y, team)   {
    //Loading Animations
//// Right Animations ////
    this.LIdleAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 0, 0, 128, 128, 0.08, 8, true, false);
    this.LRunAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 384, 128, 128, 128, 0.10, 6, true, false);
    this.LRunStartAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 0, 128, 128, 128, 0.05, 3, false, false);
    this.LJumpAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 640, 256, 128, 128, 1, 1, true, false);
    this.LJumpStartAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 384, 256, 128, 128, 0.075, 1, false, false);
    this.LFallAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 512, 384, 128, 128, 1, 1, true, false);
    this.LFallStartAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 256, 384, 128, 128, 0.05, 2, false, false);
    this.LBallAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"),0, 512, 128, 128, 0.08, 8, true, false);  // payer has ball
    this.LThrowAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 0, 640, 128, 128, 0.04, 3, false, false);

    //// Left Animations ////
    this.RIdleAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 0, 768, 128, 128, 0.08, 8, true, false);
    this.RRunAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 384, 896, 128, 128, 0.10, 6, true, false);
    this.RRunStartAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 0, 896, 128, 128, 0.05, 3, false, false);
    this.RJumpAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 640, 1024, 128, 128, 1, 1, true, false);
    this.RJumpStartAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 384, 1024, 128, 128, 0.075, 1, false, false);
    this.RFallAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 512, 1152, 128, 128, 1, 1, true, false);
    this.RFallStartAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 256, 1152, 128, 128, 0.05, 2, false, false);
    this.RBallAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"),0, 1280, 128, 128, 0.08, 8, true, false);  // payer has ball
    this.RThrowAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 0, 1408, 128, 128, 0.04, 3, false, false);

    this.jumpingState = 0; // 0 is on the ground, 1 is starting to jump, 2 is rising, 3 is beginning to fall, 4 is falling.  Has priority over running.
    this.runningState = 0; // 0 is idle, 1 is starting to run, 2 is running
    this.ballState = 1; //0- no ball, 1- has ball, 2- throwing.
    this.direction = 0;
    this.facingLeft = false;
    this.canJump = true;
    this.radius = 100;
    this.ground = 400;

    this.x = x;
    this.y = y;
    this.team = team;

    // hit box
    this.hitX = this.x + 25;
    this.hitY = this.y + 25;
    this.height = 128;
    this.width = 128;

    Entity.call(this, game, this.x, this.y, 0, 0, false);
}
Player.prototype = new Entity();
Player.prototype.constructor = Player;

Player.prototype.hasCollided = function(other) {

    return (this.hitX < other.x + other.width &&
            this.hitY + this.width > other.x &&
            this.hitY < other.y + other.height &&
            this.height + this.hitY > other.y);
}

Player.prototype.update = function ()   {
    // hit box
    this.hitX = this.x + 25;
    this.hitY = this.y + 25;

/////***** Collision *****/////
    for (var i = 0; i < this.game.entities.length; i++) {
        var ent = this.game.entities[i];
        if (ent !== this && ent.canCollide && this.team !== ent.team && this.hasCollided(ent)) {
                console.log(ent.team, this.team);
                    this.removeFromWorld = true;
                    ent.removeFromWorld = true;
                    this.speed = 0;
        }
    }

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
    if (this.game.mouseup && this.ballState === 1) {  //
        this.ballState = 2;
        this.game.mouseup = false;
    }

    // reload (for testing)
    if (this.game.rKey) {
        this.ballState = 1;
    }

    if (this.ballState === 2) {
        if (this.LThrowAnimation.isDone()) {
            this.game.addEntity(new Ball(this.game, this.x, this.y, this.team));
            this.LThrowAnimation.elapsedTime = 0;
            this.ballState = 1; //*********** change to 0 to remove ball from player ****************
            throwsound.play();
        } else if (this.RThrowAnimation.isDone()) {
            this.game.addEntity(new Ball(this.game, this.x, this.y, this.team));
            this.RThrowAnimation.elapsedTime = 0;
            this.ballState = 1;  //************change to 0 to remove ball from player ******************
            throwsound.play();
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

	if (this.x > width - 128) //canvasWidth - playerWidth = 1600 - 128 = 1472
		this.x = width - 128;

	if (this.y > height - 128) //canvasHeight - playerHeight = 800 - 128 = 672
		this.y = height - 128;
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
