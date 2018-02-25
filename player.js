/**
 * The Player class is a foundation used by all the characters in our game.
 * This class inherits the Entity class.
 * @param {*} game : The game engine.
 * @param {*} x : The starting x coordinate of our entity.
 * @param {*} y : The starting y coordinate of our entity.
 * @param {*} team : The team number of this Player.
 */
function Player(game, x, y, team, controller, scene)   {
    // Loading animations...
    // NOTE: This needs to be moved out of Player like the Button class,
    //  otherwise we can never have a Player that uses different sprites!
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
    // Boom.  Plays on death.
    this.explosion = new Animation(ASSET_MANAGER.getAsset("./img/explosion.png"), 0, 0, 256, 256, 0.05, 48, false, false);

    /*  jumpingState is used to determine if the Player is
        jumping or not.
            0 - Player is on the ground.
            1 - Player is pushing off the ground. (Started jumping)
            2 - Player is rising in the air.
            3 - Player is beginning to fall. (Top of the jump arc)
            4 - Player is falling.
    */
    this.jumpingState = 0;
    /*  runningState is used to determine if the Player is
        running or not.
            0 - Player is standing still.
            1 - Player is starting to run.
            2 - Player is running!
    */
    this.runningState = 0;
    /*  ballState is used to determine if the Player is equipped
        with a ball and what the Player is doing with it!
            0 - Player has no ball!
            1 - Player is holding a ball.
            2 - Player is getting ready to throw the ball
            3 - Player threw the ball!
    */
    this.ballState = 1;

    this.direction = 0; //wtf is this?

    this.facingLeft = false; // Is the Player facing left?
    this.canJump = true; // Used to restrict jumping
    this.radius = 100; //wtf is this?
    this.ground = 400; //Obsolete with the inclusion of collision.
	this.chargingTime = 0; //The amount of time the Player has charged the ball.

    this.x = x;
    this.y = y;
    this.prevX = x;
    this.prevY = y;
    this.id = 4;
    this.width = 128;
    this.height = 128;
    this.boundingBox = new BoundingBox(this.x + 40, this.y + 30, this.width - 80, this.height - 35);
    this.showBoxes = true;  // show Bounding boxes for testing
    this.team = team;
    this.isHit = false;
    this.lives = 2;
    this.isCatching = false;
    this.catchTimer = 0;
    this.deathTimer = 0;

    //// Controls ////
    this.controller = controller;
    this.aKey = false;
    this.dKey = false;
    this.space = false;
    this.spaceReleased = false;
    this.triggerUp = false;
    this.triggerDown = false;
    this.mouseUp = false;
    this.mouseDown = false;
    this.mousex = 1;
    this.mousey = 0;
    this.stickx = 1;
    this.sticky = 0;
    this.scene = scene;
    this.armorlock = false; //This makes the player invincible to enemy balls, parrying nonstop.

    Entity.call(this, game, this.x, this.y, true, this.id);
}
Player.prototype = new Entity();
Player.prototype.constructor = Player;


// throws ball based on the location of mouse click
Player.prototype.throwBall = function(boundingBox) {
    // throw left
    // if (this.controller.aimX < 0) {
    //     this.scene.addEntity(new Ball(this.game, this, this.boundingBox.x - 20,
    //                         this.boundingBox.y, this.chargingTime, 5, this.scene));
    // // throw right
    // } else {
    //     this.scene.addEntity(new Ball(this.game, this, this.boundingBox.x + this.boundingBox.width + 1,
    //         this.boundingBox.y, this.chargingTime, 5, this.scene));
    // }
    this.scene.addEntity(new Ball(this.game, this, this.x + 64,
                 this.y + 40, this.chargingTime, 5, this.scene));
    //reset the ball's current state
    this.ballState = 0; // change to 0 to remove ball from player
    //play the sound of the throw animation
    throwsound.play();
}

/**
 * update() handles the default behavior of a player class.  The Player
 * class handles all of its own logic to allow us to use any behavior
 * we want in the game.
 */
Player.prototype.update = function ()   {

/////***** Jumping *****/////
    if (this.controller.jump && this.canJump)    {
        this.jumpingState = 1;
        this.canJump = false;
    }

    if (this.jumpingState === 0 && !this.controller.jump) this.canJump = true;

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
        // if (this.y > 400) {
        //     this.y = 400;
        //     this.LFallAnimation.elapsedTime = 0;
        //     this.RFallAnimation.elapsedTime = 0;
        //     this.jumpingState = 0;  // Instead of making this 0, we should increment this by 1 so it progresses to the next jumpingState.
        //     this.yv = 0;
        // }
    }

    /////***** Running *****/////
    if (this.controller.left) {
        this.facingLeft = true;
        this.moving = true;  //All this does is help with the runningState logic.
        this.xv = -10;
    } else if (!this.controller.left && !this.controller.right) {
        if (this.xv < 0) {
            this.xv += 1;
            this.moving = false;
        }
    }

    if (this.controller.right) {
        this.facingLeft = false;
        this.xv = 10;
        this.moving = true;
    } else if (!this.controller.right && !this.controller.left) {
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
    // if (this.game.rKey) {
    //     this.ballState = 1;
    // }

    // if player has no ball, we down want mouse clicks
    if (this.canCatch && this.controller.parry) {
        this.isCatching = true;
        this.canCatch = false;
    }
    if (this.isCatching)    {
        this.catchTimer += this.game.clockTick;
        console.log("CATCHING ", this.catchTimer);

    }
    if (this.catchTimer > .5)   {
        this.isCatching = false;
        this.catchTimer = 0;
    }
    if (!this.isCatching && !this.controller.parry) {
        this.canCatch = true;
    }

	//if we press mouse down, begin charging stopwatch.
	if (this.ballState === 1 && this.controller.throw) {
        console.log("ball state is 1");
        this.mouseUp = false;
        this.triggerUp = false;
        this.ballState = 2;

	}
	//if ball state is 2, then winding up our arm
    if (this.ballState === 2) {

        if (this.LThrowAnimation.elapsedTime + this.game.clockTick > this.LThrowAnimation.totalTime) {
            this.ballState = 3;
        } else if (this.RThrowAnimation.elapsedTime + this.game.clockTick > this.RThrowAnimation.totalTime) {
			this.ballState = 3;
        }
    }

	if (this.ballState === 3) {
        console.log(this.chargingTime);
        //increment the total charging time by the game's clock tick.
		this.chargingTime += this.game.clockTick;
		if (!this.controller.throw) {
			//spawn a ball entity
            this.throwBall(this.boundingBox);

            //reset throw animation's elapsed time because we've finished the throw animation.
            this.LThrowAnimation.elapsedTime = 0;
			this.RThrowAnimation.elapsedTime = 0;

			//reset the charging time to 0 since we've thrown the ball.
			this.chargingTime = 0;
			this.mouseUp = false;
			this.mouseDown = false;
			this.triggerUp = false;
			this.triggerDown = false;
		}
	}
	// console.log("Ball state = " + this.ballState);
	// console.log("Mouse up = " + this.game.mouseUp);
	// console.log("Mouse down = " + this.game.mouseDown);
///////////////////////  End Throwing ///////////////////////////////////////////


    // ///////////////////////////// WALL COLLISION ////////////////////////////////

    this.x += 100 * this.xv * this.game.clockTick;
    this.y -= this.yv * this.game.clockTick;
    this.boundingBox = new BoundingBox(this.x + 40, this.y + 30, this.width - 80, this.height - 35);

    for (var i = 0; i < this.scene.entities.length; i++) {
        var ent = this.scene.entities[i];

        if (ent !== this && ent.canCollide && this.boundingBox.hasCollided(ent.boundingBox)) {
            //console.log("derp, collision with ", ent.id);
            if (ent.id === 1)   {
                if (this.prevY < this.y && (this.y + this.height - 5) > ent.y && this.prevY + 30 + this.boundingBox.height <= ent.y)  {
                    if (this.y > ent.y - this.height + 5)   {
                        this.y = ent.y - this.height + 5;
                        this.yv = 0;
                        this.jumpingState = 0;
                    }
                }
                else if (this.prevY > this.y && this.boundingBox.y < (ent.boundingBox.y + ent.boundingBox.height) && this.prevY + 30 >= (ent.boundingBox.y + ent.boundingBox.height))  {

                        this.y = ent.boundingBox.y + ent.boundingBox.height - 30;
                        this.yv = 0;
                        this.jumpingState = 4;

                }
                else if (this.prevX > this.x && (this.x < (ent.x + ent.width)))  {
                    if (this.x + 40 < ent.x + ent.width) {
                        this.x = ent.x + ent.width - 40;
                        this.xv = 0;
                        this.runningState = 0;
                        this.moving = false;
                    }
                }
                else if (this.prevX < this.x && (this.boundingBox.x + this.boundingBox.width) > ent.boundingBox.x)  {
                    if ((this.boundingBox.x + this.boundingBox.width) > ent.boundingBox.x) {
                        this.x = ent.boundingBox.x - this.boundingBox.width -40;
                        this.xv = 0;
                        this.runningState = 0;
                        this.moving = false;
                    }
                }
            }
            // if (ent.team !== this.team && ent.speed > 1) {
            //     this.isHit = true;
            // }
        //    console.log(ent.id);
            if (ent.id === 5)   {
                if (ent.state !== 0)    {
                    if (this.ballState === 0)   {
                        ent.removeFromWorld = true;
                        this.ballState = 1;  // pickup ball
                        this.isCatching = false;
                        this.catchTimer = 0;
                    }
                } else if (this.isCatching && this.ballState === 0) {
                    ent.removeFromWorld = true;
                    this.ballState = 1;  // pickup ball
                    this.isCatching = false;
                    this.catchTimer = 0;
                } else if (this.isCatching || this.armorlock) {
                    ent.speed += 1000;
                    ent.team = this.team;
                } else if (ent.team !== this.team && this.isHit === false) {
                    this.isHit = true;
                    this.canCollide = false;
                    this.lives--;
                }
            }
            // if (ent.id === 5 && this.ballState === 0 && ent.state !== 0) {
            //     console.log("MINE");
            //     ent.removeFromWorld = true;
            //     this.ballState = 1;  // pickup ball
            // }
        }
    }
    if (this.explosion.isDone()) {
        if (this.lives < 1) {
            console.log("DEAD.");
            this.removeFromWorld = true;
        } else {
        this.deathTimer += this.game.clockTick;
            if (this.deathTimer > 3)  {
                console.log("IM ALIIIIVE!");
                this.canCollide = true;
                this.deathTimer = 0;
                this.explosion.elapsedTime = 0;
                var spawnCoords = this.scene.spawn();
                this.x = spawnCoords.x;
                this.y = spawnCoords.y;
                this.ballState = 1;
                this.isHit = false;
            }
        }
    }
    this.prevX = this.x;
    this.prevY = this.y;
    this.boundingBox = new BoundingBox(this.x + 40, this.y + 30, this.width - 80, this.height - 35);

    Entity.prototype.update.call(this);
}

Player.prototype.draw = function(ctx, tick)   {
    ////////// bounding box ////////////
    if (this.showBoxes) {
        this.boundingBox.draw(ctx);
    }
    /////////////// explosion animation /////////////
    if (this.isHit) {
        this.explosion.drawFrame(tick, ctx, this.x - (this.width/2), this.y - (this.height/2), this.game.drawScale);
    }
/////////////////////// Right facing sprites ///////////////////////////
    else if (this.facingLeft) {
		//if we're ready to throw, play throwing animation
        if (this.ballState === 2) {
            this.LThrowAnimation.drawFrame(tick, ctx, this.getX(), this.getY(), this.game.drawScale);
        }
		else if (this.ballState === 3) {  // holding the ball
            this.LChargeThrowAnimation.drawFrame(tick, ctx, this.getX(), this.getY(), this.game.drawScale);
        }
        else if (this.jumpingState === 1) {  //Drawing initial jump wind up animation
            this.LJumpStartAnimation.drawFrame(tick, ctx, this.getX(), this.getY(), this.game.drawScale);
        }
        else if (this.jumpingState === 2)   { //Drawing rising animation
            this.LJumpAnimation.drawFrame(tick, ctx, this.getX(), this.getY(), this.game.drawScale);
        }
        else if (this.jumpingState === 3)   { //Drawing transition from rising to falling
            this.LFallStartAnimation.drawFrame(tick, ctx, this.getX(), this.getY(), this.game.drawScale);
        }
        else if (this.jumpingState === 4)   { //Drawing falling animation
            this.LFallAnimation.drawFrame(tick, ctx, this.getX(), this.getY(), this.game.drawScale);
        }
        else if (this.runningState === 2) {
            this.direction = this.x;
            this.LRunAnimation.drawFrame(tick, ctx, this.getX(), this.getY(), this.game.drawScale);
        }
        else if (this.runningState === 1)   {
            this.LRunStartAnimation.drawFrame(tick, ctx, this.getX(), this.getY(), this.game.drawScale);
        }
        else if (this.ballState === 0) {
            this.LIdleAnimation.drawFrame(tick, ctx, this.getX(), this.getY(), this.game.drawScale);
        }
        else if (this.ballState === 1) {
            this.LBallAnimation.drawFrame(tick, ctx, this.getX(), this.getY(), this.game.drawScale);
        }
        else {
            this.LIdleAnimation.drawFrame(tick, ctx, this.getX(), this.getY(), this.game.drawScale);
        }
/////////////// Left facing sprites ///////////////////
    } else {  // left facing sprites
		//else if we're ready to throw, play throwing animation
        if (this.ballState === 2) {  // winding up
            this.RThrowAnimation.drawFrame(tick, ctx, this.getX(), this.getY(), this.game.drawScale);
        }
		else if (this.ballState === 3) {  // holding the ball
            this.RChargeThrowAnimation.drawFrame(tick, ctx, this.getX(), this.getY(), this.game.drawScale);
        }
        else if (this.jumpingState === 1) {  //Drawing initial jump wind up animation
            this.RJumpStartAnimation.drawFrame(tick, ctx, this.getX(), this.getY(), this.game.drawScale);
        }
        else if (this.jumpingState === 2)   { //Drawing rising animation
            this.RJumpAnimation.drawFrame(tick, ctx, this.getX(), this.getY(), this.game.drawScale);
        }
        else if (this.jumpingState === 3)   { //Drawing transition from rising to falling
            this.RFallStartAnimation.drawFrame(tick, ctx, this.getX(), this.getY(), this.game.drawScale);
		}
        else if (this.jumpingState === 4)   { //Drawing falling animation
            this.RFallAnimation.drawFrame(tick, ctx, this.getX(), this.getY(), this.game.drawScale);
        }
        else if (this.runningState === 2) {
            this.direction = this.x;
            this.RRunAnimation.drawFrame(tick, ctx, this.getX(), this.getY(), this.game.drawScale);
        }
        else if (this.runningState === 1)   {
            this.RRunStartAnimation.drawFrame(tick, ctx, this.getX(), this.getY(), this.game.drawScale);
        }
        else if (this.ballState === 0) {  // no ball
            this.RIdleAnimation.drawFrame(tick, ctx, this.getX(), this.getY(), this.game.drawScale);
        }
        else if (this.ballState === 1) {  // holding ball
            this.RBallAnimation.drawFrame(tick, ctx, this.getX(), this.getY(), this.game.drawScale);
        }
        else {
            this.RIdleAnimation.drawFrame(tick, ctx, this.getX(), this.getY(), this.game.drawScale);
        }
    }
	ctx.beginPath();
	ctx.strokeStyle = "blue";
    ctx.moveTo(this.x + 64, this.y + 40);
    if (this.controller.gamepad === null)   {
        var lineX = this.controller.targetX - (this.x+64);
        var lineY = this.controller.targetY - (this.y+40);
        this.controller.aimX = lineX/(Math.abs(lineX) + Math.abs(lineY));
        this.controller.aimY = lineY/(Math.abs(lineX) + Math.abs(lineY));
    }
	ctx.lineTo(this.x + (this.controller.aimX * 100) + 64, this.y + (this.controller.aimY * 100) + 40);
	ctx.closePath();
	ctx.stroke();
		
    Entity.prototype.draw.call(this);
}
