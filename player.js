/**
 * The Player class is a foundation used by all the characters in our game.
 * This class inherits the Entity class.
 * @param {*} game : The game engine.
 * @param {*} x : The starting x coordinate of our entity.
 * @param {*} y : The starting y coordinate of our entity.
 * @param {*} team : The team number of this Player.
 */
function Player(game, x, y, lives, team, controller, scene)   {
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
    this.LBallRunAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 384, 640, 128, 128, 0.10, 6, true, false);
    this.LBallRunStartAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 0, 640, 128, 128, 0.05, 3, false, false);
    this.LBallJumpAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 640, 768, 128, 128, 1, 1, true, false);
    this.LBallJumpStartAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 384, 768, 128, 128, 0.075, 1, false, false);
    this.LBallFallAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 512, 896, 128, 128, 1, 1, true, false);
    this.LBallFallStartAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 256, 896, 128, 128, 0.05, 2, false, false);
    this.LThrowAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 0, 1024, 128, 128, 0.04, 3, false, false);
	this.LChargeThrowAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 256, 1024, 128, 128, 0.001, 1, true, false);
    this.LFullChargeAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 384, 1024, 128, 128, 1, 1, true, false);

    //// Left Animations ////
    this.RIdleAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 0, 1152 + 0, 128, 128, 0.08, 8, true, false);
    this.RRunAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 384, 1152 + 128, 128, 128, 0.10, 6, true, false);
    this.RRunStartAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 0, 1152 + 128, 128, 128, 0.05, 3, false, false);
    this.RJumpAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 640, 1152 + 256, 128, 128, 1, 1, true, false);
    this.RJumpStartAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 384, 1152 + 256, 128, 128, 0.075, 1, false, false);
    this.RFallAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 512, 1152 + 384, 128, 128, 1, 1, true, false);
    this.RFallStartAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 256, 1152 + 384, 128, 128, 0.05, 2, false, false);
    this.RBallAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"),0, 1152 + 512, 128, 128, 0.08, 8, true, false);  // player has ball
    this.RBallRunAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 384, 1152 + 640, 128, 128, 0.10, 6, true, false);
    this.RBallRunStartAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 0, 1152 + 640, 128, 128, 0.05, 3, false, false);
    this.RBallJumpAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 640, 1152 + 768, 128, 128, 1, 1, true, false);
    this.RBallJumpStartAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 384, 1152 + 768, 128, 128, 0.075, 1, false, false);
    this.RBallFallAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 512, 1152 + 896, 128, 128, 1, 1, true, false);
    this.RBallFallStartAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 256, 1152 + 896, 128, 128, 0.05, 2, false, false);
    this.RThrowAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 0, 1152 + 1024, 128, 128, 0.04, 3, false, false);
	this.RChargeThrowAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 256, 1152 + 1024, 128, 128, 0.001, 1, true, false);
    this.RFullChargeAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 384, 1152 + 1024, 128, 128, 1, 1, true, false);
    // Boom.  Plays on death.
    this.explosion = new Animation(ASSET_MANAGER.getAsset("./img/explosion.png"), 0, 0, 256, 256, 0.01, 48, false, false);
    this.charge = new Animation(ASSET_MANAGER.getAsset("./img/charge.png"), 0, 0, 256, 256, 0.02, 8, true, false);
    this.shield = new Animation(ASSET_MANAGER.getAsset("./img/shield.png"), 0, 0, 192, 192, 0.25/20, 20, false, false);
    this.aura = new Animation(ASSET_MANAGER.getAsset("./img/aura.png"), 0, 0, 204, 228, .05, 4, true, false);
    // Pointer above the player.
    this.pointer = ASSET_MANAGER.getAsset("./img/pointers.png");
//    console.log(this.pointer);
    /*  jumpingState is used to determine if the Player is
        jumping or not.
            0 - Player is on the ground.
            1 - Player is pushing off the ground. (Started jumping)
            2 - Player is rising in the air.
            3 - Player is beginning to fall. (Top of the jump arc)
            4 - Player is falling.
    */
    this.jumpingState = 4;
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
    this.cooldown = 0;

    this.x = x;
    this.y = y;
    this.prevX = x;
    this.prevY = y;
    this.id = 4;
    this.width = 128;
    this.height = 128;
    this.boundingBox = new BoundingBox(this.x + 40, this.y + 30, this.width - 80, this.height - 35);
    this.team = team;
    this.isHit = false;
    this.lives = lives;
    this.lostLives = 0;
    this.isCatching = false;
    this.canCatch = true;
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
    this.canMove = true;

    Entity.call(this, game, this.x, this.y, true, this.id);
}
Player.prototype = new Entity();
Player.prototype.constructor = Player;



Player.prototype.resetBallState = function()    {
    //reset throw animation's elapsed time because we've finished the throw animation.
    this.LThrowAnimation.elapsedTime = 0;
    this.RThrowAnimation.elapsedTime = 0;

    //reset the charging time to 0 since we've thrown the ball.
    this.chargingTime = 0;
    this.mouseUp = false;
    this.mouseDown = false;
    this.triggerUp = false;
    this.triggerDown = false;
    //reset the ball's current state
    this.ballState = 0; // change to 0 to remove ball from player
}




/**
 * This function handles all Jumping functionality.
 */
Player.prototype.calculateJump = function() {
    if (this.controller.jump && this.canJump && this.ballState < 2)    {
        this.jumpingState = 1;
        this.canJump = false;
    }

    if (this.jumpingState === 0 && !this.controller.jump) this.canJump = true;
    if (this.jumpingState === 1) {
        // jumpingState 1 is for the initial jumping wind up animation.  The character is about to kick off the ground.
        if (this.LJumpStartAnimation.elapsedTime + this.game.clockTick >= this.LJumpStartAnimation.totalTime ||
            this.RJumpStartAnimation.elapsedTime + this.game.clockTick >= this.RJumpStartAnimation.totalTime ||
            this.LBallJumpStartAnimation.elapsedTime + this.game.clockTick >= this.LBallJumpStartAnimation.totalTime ||
            this.RBallJumpStartAnimation.elapsedTime + this.game.clockTick >= this.RBallJumpStartAnimation.totalTime) {   //hard coded value of 0.2 from LJumpStartAnimation's animation time
            this.LJumpStartAnimation.elapsedTime = 0;
            this.RJumpStartAnimation.elapsedTime = 0;
            this.RBallJumpStartAnimation.elapsedTime = 0;
            this.LBallJumpStartAnimation.elapsedTime = 0;
            this.jumpingState++;  //increment to next state for next update().
            this.yv = 1500;
        }

    } else if (this.jumpingState === 2) {
        if (this.yv < 100)  {
            this.LJumpAnimation.elapsedTime = 0;
            this.RJumpAnimation.elapsedTime = 0;
            this.LBallJumpAnimation.elapsedTime = 0;
            this.RBallJumpAnimation.elapsedTime = 0;
            this.jumpingState++;
        }
        this.yv -= 100;

    } else if (this.jumpingState === 3) {
        // jumpingState 3 is the transition from rising to falling.
        if (this.RFallStartAnimation.elapsedTime + this.game.clockTick >= this.RFallStartAnimation.totalTime ||
            this.LFallStartAnimation.elapsedTime + this.game.clockTick >= this.LFallStartAnimation.totalTime ||
            this.RBallFallStartAnimation.elapsedTime + this.game.clockTick >= this.RBallFallStartAnimation.totalTime ||
            this.LBallFallStartAnimation.elapsedTime + this.game.clockTick >= this.LBallFallStartAnimation.totalTime) {   //hard coded value of 0.2 from LJumpStartAnimation's animation time

            this.RFallStartAnimation.elapsedTime = 0;
            this.LFallStartAnimation.elapsedTime = 0;
            this.RBallFallStartAnimation.elapsedTime = 0;
            this.LBallFallStartAnimation.elapsedTime = 0;
            this.jumpingState++;  //increment to next state for next update().
        }
        this.yv -= 100;

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
}

/**
 * This function handles all running functionality.
 */
Player.prototype.calculateRun = function() {
    if (this.controller.left && this.ballState < 2) {
        this.facingLeft = true;
        this.moving = true;  //All this does is help with the runningState logic.
        this.xv = -10;
    } else if ((!this.controller.left && !this.controller.right) || this.ballState > 1) {
        if (this.xv < 0) {
            this.xv += 1;
            this.moving = false;
        }
    }

    if (this.controller.right && this.ballState < 2) {
        this.facingLeft = false;
        this.xv = 10;
        this.moving = true;
    } else if ((!this.controller.right && !this.controller.left) || this.ballState > 1) {
        if (this.xv > 0) {
            this.xv -= 1;
            this.moving = false;
        }
    }

    // This is for determining the running state.
    if (this.moving && this.runningState === 0) {
        this.runningState = 1;
    } else if (this.moving && this.runningState === 1 &&
        (this.LRunStartAnimation.elapsedTime + this.game.clockTick >= this.LRunStartAnimation.totalTime ||
            this.RRunStartAnimation.elapsedTime + this.game.clockTick >= this.RRunStartAnimation.totalTime ||
            this.LBallRunStartAnimation.elapsedTime + this.game.clockTick >= this.LBallRunStartAnimation.totalTime ||
            this.RBallRunStartAnimation.elapsedTime + this.game.clockTick >= this.RBallRunStartAnimation.totalTime))    {
                this.runningState = 2;
                this.RRunStartAnimation.elapsedTime = 0;
                this.LRunStartAnimation.elapsedTime = 0;
                this.RBallRunStartAnimation.elapsedTime = 0;
                this.LBallRunStartAnimation.elapsedTime = 0;
    }
    if (!this.moving)   {
        this.RRunAnimation.elapsedTime = 0;
        this.LRunAnimation.elapsedTime = 0;
        this.RBallRunAnimation.elapsedTime = 0;
        this.LBallRunAnimation.elapsedTime = 0;
        this.runningState = 0;
    }
}

/**
 * This function hanles all interactin between player and ball.
 * includes catch, parry, charge and throw.
 */
 Player.prototype.handleBallInteraction = function() {
     // aim with mouse
     if (this.controller.gamepad === null)   {
         var lineX = this.controller.targetX - (this.x+64);
         var lineY = this.controller.targetY - (this.y+40);
         this.controller.aimX = lineX/(Math.abs(lineX) + Math.abs(lineY));
         this.controller.aimY = lineY/(Math.abs(lineX) + Math.abs(lineY));
     }

     if (this.canCatch && this.controller.parry) {
         this.isCatching = true;
         this.canCatch = false;
     }
     if (this.isCatching)    {
         this.catchTimer += this.game.clockTick;
         console.log("CATCHING ", this.catchTimer);

     }
     if (this.catchTimer > this.shield.totalTime)   {
         this.shield.elapsedTime = this.catchTimer;
         this.isCatching = false;
         this.catchTimer = 0;
     }
    //  if (!this.isCatching && !this.controller.parry && this.cooldown === 0) {
    //      this.canCatch = true;
    //  }
     if (this.shield.isDone())   {
        this.cooldown += this.game.clockTick;
        console.log("cooldown: ", this.cooldown);
        if (this.cooldown > 1 && !this.controller.parry)  {
            this.cooldown = 0;
            this.canCatch = true;
            this.shield.elapsedTime = 0;
        }
    }

 	//if we press mouse down, begin charging stopwatch.
 	if (this.ballState === 1 && this.controller.throw) {
//         console.log("ball state is 1");
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
//         console.log(this.chargingTime);
         //increment the total charging time by the game's clock tick.
 		this.chargingTime += this.game.clockTick;
 		if (!this.controller.throw) {
 			//spawn a ball entity
             this.throwBall(this.boundingBox);
 		}
 	}
 }

 // throws ball based on the location of mouse click
 Player.prototype.throwBall = function(boundingBox) {
     this.scene.addEntity(new Ball(this.game, this, this.x + 64,
                  this.y + 40, this.chargingTime, 5, this.scene));
     //reset the ball's current state
     this.ballState = 0; // change to 0 to remove ball from player
     //play the sound of the throw animation
     this.game.throwSound.volume = 1;
     this.game.throwSound.play();

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

/**
 * Handles all collision functionality.
 */
Player.prototype.handleCollision = function() {
    for (var i = 0; i < this.scene.entities.length; i++) {
        var ent = this.scene.entities[i];

        if (ent.id === 1 || ent.id === 2)   { // rigid body collision
            // floor
            if (ent.canCollide && this.boundingBox.hasCollided(ent.boundingBox))  {
                if (this.prevY < this.y && (this.y + this.height - 5) > ent.y && this.prevY + 30 + this.boundingBox.height <= ent.y)  {
                    if (this.y > ent.y - this.height + 5)   {
                        this.y = ent.y - this.height + 5;
                        this.yv = 0;
                        this.jumpingState = 0;
                    }
                }
                // ceiling
                else if (ent.id === 1 && this.prevY > this.y && this.boundingBox.y < (ent.boundingBox.y + ent.boundingBox.height) && this.prevY + 30 >= (ent.boundingBox.y + ent.boundingBox.height))  {

                        this.y = ent.boundingBox.y + ent.boundingBox.height - 30;
                        this.yv = 0;
                        this.jumpingState = 4;

                }
                // left wall
                else if (ent.id === 1 && this.prevX > this.x && (this.x < (ent.x + ent.width)))  {
                    if (this.x + 40 < ent.x + ent.width) {
                        this.x = ent.x + ent.width - 40;
                        this.xv = 0;
                        this.runningState = 0;
                        this.moving = false;
                    }
                }
                // right wall
                else if (ent.id === 1 && this.prevX < this.x && (this.boundingBox.x + this.boundingBox.width) > ent.boundingBox.x)  {
                    if ((this.boundingBox.x + this.boundingBox.width) > ent.boundingBox.x) {
                        this.x = ent.boundingBox.x - this.boundingBox.width -40;
                        this.xv = 0;
                        this.runningState = 0;
                        this.moving = false;
                    }
                }
            }
            else if (this.jumpingState === 0 && (this.boundingBox.hasCollided(ent.cornerBoxLeft) || this.boundingBox.hasCollided(ent.cornerBoxRight)))  {
                this.jumpingState = 4;
            }
        }

        else if (ent !== this && ent.canCollide && this.boundingBox.hasCollided(ent.boundingBox)) {
            //console.log("derp, collision with ", ent.id);

            // ball
            if (ent.id === 5)   {
                if (ent.state !== 0)    {
                    if (this.ballState === 0)   {
                        ent.removeFromWorld = true;
                        this.ballState = 1;  // pickup ball
                        // this.isCatching = false;
                        this.catchTimer = 0;
                    }
                } else if (this.isCatching && this.ballState === 0) {
                    ent.removeFromWorld = true;
                    this.ballState = 1;  // pickup ball
                    // this.isCatching = false;
                    //catching noise
                    this.game.catchSound.play();
                    this.catchTimer = 0;
                } else if (this.isCatching || this.armorlock) {
                    this.game.hitSound.play();
                    ent.speed += 1000;
                    ent.team = this.team;
                } else if (ent.team !== this.team && this.isHit === false) {
                    this.isHit = true;
                    this.canCollide = false;
                    this.lives--;
                }
            }
        }
    }
}

/**
 * update() handles the default behavior of a player class.  The Player
 * class handles all of its own logic to allow us to use any behavior
 * we want in the game.
 */
Player.prototype.update = function ()   {

    this.calculateJump();
    this.calculateRun();
    this.handleBallInteraction();

    // reload (for testing)
    // if (this.game.rKey) {
    //     this.ballState = 1;
    // }

    this.x += 100 * this.xv * this.game.clockTick;
    this.y -= this.yv * this.game.clockTick;
    this.boundingBox = new BoundingBox(this.x + 40, this.y + 30, this.width - 80, this.height - 35);

    this.handleCollision();

    // deathRoutine
    if (this.explosion.isDone()) {
        if (this.lives < 1) {
            console.log("DEAD.");
            this.removeFromWorld = true;
        } else {
        this.deathTimer += this.game.clockTick;
            if (this.deathTimer > 3)  {
                this.canCollide = true;
                this.deathTimer = 0;
                this.explosion.elapsedTime = 0;
                var spawnCoords = this.scene.spawn();
                this.jumpingState = 4;
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
    if (this.isCatching)    {
        this.shield.drawFrame(tick, ctx, this.getX() -34, this.getY(), this.game.drawScale);
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
            if (this.chargingTime > 3)  {
                this.LFullChargeAnimation.drawFrame(tick, ctx, this.getX(), this.getY(), this.game.drawScale);
                this.aura.drawFrame(tick, ctx, this.getX()-48, this.getY()-84, this.game.drawScale);
            } else  {
                this.LChargeThrowAnimation.drawFrame(tick, ctx, this.getX(), this.getY(), this.game.drawScale);
                this.charge.drawFrame(tick, ctx, this.getX(), this.getY(), this.game.drawScale/2);
            }
        }
        else if (this.ballState === 1)  {
            if (this.jumpingState === 1) {  //Drawing initial jump wind up animation
                this.LBallJumpStartAnimation.drawFrame(tick, ctx, this.getX(), this.getY(), this.game.drawScale);
            }
            else if (this.jumpingState === 2)   { //Drawing rising animation
                this.LBallJumpAnimation.drawFrame(tick, ctx, this.getX(), this.getY(), this.game.drawScale);
            }
            else if (this.jumpingState === 3)   { //Drawing transition from rising to falling
                this.LBallFallStartAnimation.drawFrame(tick, ctx, this.getX(), this.getY(), this.game.drawScale);
            }
            else if (this.jumpingState === 4)   { //Drawing falling animation
                this.LBallFallAnimation.drawFrame(tick, ctx, this.getX(), this.getY(), this.game.drawScale);
            }
            else if (this.runningState === 2) {
                this.direction = this.x;
                this.LBallRunAnimation.drawFrame(tick, ctx, this.getX(), this.getY(), this.game.drawScale);
            }
            else if (this.runningState === 1)   {
                this.LBallRunStartAnimation.drawFrame(tick, ctx, this.getX(), this.getY(), this.game.drawScale);
            }
            else    {
                this.LBallAnimation.drawFrame(tick, ctx, this.getX(), this.getY(), this.game.drawScale);
            }
        }
        else    {
            if (this.jumpingState === 1) {  //Drawing initial jump wind up animation
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
            else    {
                this.LIdleAnimation.drawFrame(tick, ctx, this.getX(), this.getY(), this.game.drawScale);
            }
        }
/////////////// Left facing sprites ///////////////////
    } else {  // left facing sprites
		//if we're ready to throw, play throwing animation
        if (this.ballState === 2) {
            this.RThrowAnimation.drawFrame(tick, ctx, this.getX(), this.getY(), this.game.drawScale);
        }
        else if (this.ballState === 3) {  // holding the ball
            if (this.chargingTime > 3)  {
                this.RFullChargeAnimation.drawFrame(tick, ctx, this.getX(), this.getY(), this.game.drawScale);
                this.aura.drawFrame(tick, ctx, this.getX()-48, this.getY()-84, this.game.drawScale);
            } else  {
                this.RChargeThrowAnimation.drawFrame(tick, ctx, this.getX(), this.getY(), this.game.drawScale);
                this.charge.drawFrame(tick, ctx, this.getX(), this.getY(), this.game.drawScale/2);
            }
        }
        else if (this.ballState === 1)  {
            if (this.jumpingState === 1) {  //Drawing initial jump wind up animation
                this.RBallJumpStartAnimation.drawFrame(tick, ctx, this.getX(), this.getY(), this.game.drawScale);
            }
            else if (this.jumpingState === 2)   { //Drawing rising animation
                this.RBallJumpAnimation.drawFrame(tick, ctx, this.getX(), this.getY(), this.game.drawScale);
            }
            else if (this.jumpingState === 3)   { //Drawing transition from rising to falling
                this.RBallFallStartAnimation.drawFrame(tick, ctx, this.getX(), this.getY(), this.game.drawScale);
            }
            else if (this.jumpingState === 4)   { //Drawing falling animation
                this.RBallFallAnimation.drawFrame(tick, ctx, this.getX(), this.getY(), this.game.drawScale);
            }
            else if (this.runningState === 2) {
                this.direction = this.x;
                this.RBallRunAnimation.drawFrame(tick, ctx, this.getX(), this.getY(), this.game.drawScale);
            }
            else if (this.runningState === 1)   {
                this.RBallRunStartAnimation.drawFrame(tick, ctx, this.getX(), this.getY(), this.game.drawScale);
            }
            else    {
                this.RBallAnimation.drawFrame(tick, ctx, this.getX(), this.getY(), this.game.drawScale);
            }
        }
        else    {
            if (this.jumpingState === 1) {  //Drawing initial jump wind up animation
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
            else    {
                this.RIdleAnimation.drawFrame(tick, ctx, this.getX(), this.getY(), this.game.drawScale);
            }
        }
    }
    if (this.controller.isAiming || this.ballState >= 3)    {
        ctx.beginPath();
        if (this.team === 0)
            ctx.strokeStyle = "red";
        else if (this.team === 1)
            ctx.strokeStyle = "blue";
        else if (this.team === 2)
            ctx.strokeStyle = "green";
        else if (this.team === 3)
            ctx.strokeStyle = "yellow";
        else
            ctx.strokeStyle = "black";
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
    }
    if (!this.isHit) {
        if (this.team === 0)    {
            ctx.drawImage(this.pointer, 0, 0, 128, 128, this.x + 32, this.y - 64, 64, 64);
        } else if (this.team === 1) {
            ctx.drawImage(this.pointer, 0, 128, 128, 128, this.x + 32, this.y - 64, 64, 64);
        } else if (this.team === 2) {
            ctx.drawImage(this.pointer, 128, 0, 128, 128, this.x + 32, this.y - 64, 64, 64);
        } else if (this.team === 3) {
            ctx.drawImage(this.pointer, 128, 128, 128, 128, this.x + 32, this.y - 64, 64, 64);
        }
    }

    Entity.prototype.draw.call(this);
}
