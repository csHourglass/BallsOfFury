/* the purpose of this class is essentially just for
   collision detection between entities */
function BoundingBox (x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.left = x;
    this.top = y;
    this.right = x + width;
    this.bottom = y + height;
}

BoundingBox.prototype.hasCollided = function (other) {
    return (this.right > other.left && this.left < other.right &&
            this.top < other.bottom && this.bottom > other.top);
}

BoundingBox.prototype.draw = function(ctx) {
    //log red box console.log(this.x, this.y, this.width, this.height);
    //log green box console.log(this.boundingBox.x, this.boundingBox.y, this.boundingBox.width, this.boundingBox.height);

    // ctx.strokeStyle = "red";    // frame
    // ctx.strokeRect(this.x, this.y, this.width, this.height);

    ctx.strokeStyle = "green";  // bounding box
    ctx.strokeRect(this.x, this.y, this.width, this.height);
}

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
    this.LBallAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"),0, 512, 128, 128, 0.08, 8, true, false);  // player has ball
    this.LThrowAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 0, 640, 128, 128, 0.04, 3, false, false);
	this.LChargeThrowAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 256, 640, 128, 128, 0.001, 1, true, false);

    //// Left Animations ////
    this.RIdleAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 0, 768, 128, 128, 0.08, 8, true, false);
    this.RRunAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 384, 896, 128, 128, 0.10, 6, true, false);
    this.RRunStartAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 0, 896, 128, 128, 0.05, 3, false, false);
    this.RJumpAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 640, 1024, 128, 128, 1, 1, true, false);
    this.RJumpStartAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 384, 1024, 128, 128, 0.075, 1, false, false);
    this.RFallAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 512, 1152, 128, 128, 1, 1, true, false);
    this.RFallStartAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 256, 1152, 128, 128, 0.05, 2, false, false);
    this.RBallAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"),0, 1280, 128, 128, 0.08, 8, true, false);  // player has ball
    this.RThrowAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 0, 1408, 128, 128, 0.04, 3, false, false);
	this.RChargeThrowAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 256, 1408, 128, 128, 0.001, 1, true, false);

    this.jumpingState = 0; // 0 is on the ground, 1 is starting to jump, 2 is rising, 3 is beginning to fall, 4 is falling.  Has priority over running.
    this.runningState = 0; // 0 is idle, 1 is starting to run, 2 is running
    this.ballState = 1; //0- no ball, 1- has ball, 2- throwing.
    this.direction = 0;
    this.facingLeft = false;
    this.canJump = true;
    this.radius = 100;
    this.ground = 400;
	this.chargingTime = 0;

    this.x = x;
    this.y = y;
    this.width = 128;
    this.height = 128;
    this.boundingBox = new BoundingBox(this.x + 25, this.y + 25, this.width - 25, this.height - 25);
    this.showBoxes = true;  // show Bounding boxes for testing
    this.team = team;

    Entity.call(this, game, this.x, this.y, 0, 0, false);
}
Player.prototype = new Entity();
Player.prototype.constructor = Player;


// throws ball based on the location of mouse click
Player.prototype.throwBall = function(boundingBox) {
    // throw left
    if (this.game.mousex < this.x) {
        this.game.addEntity(new Ball(this.game, this.boundingBox.x - 20,
                            this.boundingBox.y, this.chargingTime));
    // throw right
    } else {
            this.game.addEntity(new Ball(this.game, this.boundingBox.x + this.boundingBox.width + 1,
                                this.boundingBox.y, this.chargingTime));
        }
}


Player.prototype.update = function ()   {

/////***** Collision *****/////
    for (var i = 0; i < this.game.entities.length; i++) {
        var ent = this.game.entities[i];

        if (ent !== this && ent.canCollide && this.boundingBox.hasCollided(ent.boundingBox)) {
            //ent.canCollide = false;  // need to implement returning to true when picked back up
            if (ent.team != this.team) {
                this.removeFromWorld = true;
            }
        }
    }

/////***** Jumping *****/////
    if (this.game.space && this.canJump)    {
        this.jumpingState = 1;
        this.canJump = false;
    }

    if (this.jumpingState === 0 && this.game.spaceReleased) this.canJump = true;

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

/////***** Running *****/////
    if (this.game.aKey) {
        this.facingLeft = true;
        this.moving = true;  //All this does is help with the runningState logic.
        this.xv = -10;
    } else if (!this.game.aKey && !this.game.dKey) {
        if (this.xv < 0) {
            this.xv += 1;
            this.moving = false;
        }
    }

    if (this.game.dKey) {
        this.facingLeft = false;
        this.xv = 10;
        this.moving = true;
    } else if (!this.game.dKey && !this.game.aKey) {
        if (this.xv > 0) {
            this.xv -= 1;
            this.moving = false;
        }
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

    // reload (for testing)
    if (this.game.rKey) {
        this.ballState = 1;
    }
	//if we press mouse down, begin charging stopwatch.
	if (this.game.mouseDown || this.game.triggerDown) {
		this.ballState = 2;
		//increment the total charging time by the game's clock tick.
		this.chargingTime += this.game.clockTick;
	}
	//if ball state is 2, then winding up our arm
    if (this.ballState === 2) {
        console.log(this.chargingTime);
        if (this.LThrowAnimation.elapsedTime + this.game.clockTick > this.LThrowAnimation.totalTime) {
            this.ballState = 3;
        } else if (this.RThrowAnimation.elapsedTime + this.game.clockTick > this.RThrowAnimation.totalTime) {
			this.ballState = 3;
        }
    }

	if (this.ballState === 3) {
		if (this.game.mouseUp || this.game.triggerUp) {
			//spawn a ball entity
            this.throwBall(this.boundingBox);

            //reset throw animation's elapsed time because we've finished the throw animation.
            this.LThrowAnimation.elapsedTime = 0;
			this.RThrowAnimation.elapsedTime = 0;
			//reset the ball's current state
            this.ballState = 1; // change to 0 to remove ball from player
			//play the sound of the throw animation
            throwsound.play();
			//reset the charging time to 0 since we've thrown the ball.
			this.chargingTime = 0;
			this.game.mouseUp = false;
			this.game.mouseDown = false;
			this.game.triggerUp = false;
			this.game.triggerDown = false;
		}
	}
	// console.log("Ball state = " + this.ballState);
	// console.log("Mouse up = " + this.game.mouseUp);
	// console.log("Mouse down = " + this.game.mouseDown);
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

    // updates position of boundingBoxs.  should happen differently for
    // every animation
    this.boundingBox = new BoundingBox(this.x + 40, this.y + 30, this.width - 80, this.height - 35);
    Entity.prototype.update.call(this);
}

Player.prototype.draw = function(ctx)   {
    ////////// bounding box ////////////
    if (this.showBoxes) {
        this.boundingBox.draw(ctx);
    }
/////////////////////// Right facing sprites ///////////////////////////
    if (this.facingLeft) {
		//if we're ready to throw, play throwing animation
        if (this.ballState === 2) {
            this.LThrowAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        }
		else if (this.ballState === 3) {  // holding the ball
            this.LChargeThrowAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
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
        }
/////////////// Left facing sprites ///////////////////
    } else {  // left facing sprites
		//else if we're ready to throw, play throwing animation
        if (this.ballState === 2) {  // winding up
            this.RThrowAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        }
		else if (this.ballState === 3) {  // holding the ball
            this.RChargeThrowAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
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
        }
    }

    Entity.prototype.draw.call(this);
}
