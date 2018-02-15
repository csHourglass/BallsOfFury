
function Ball(game, player, x, y, chargingTime, id, scene) {

    this.idleAnimation = new Animation(ASSET_MANAGER.getAsset("./img/ball.png"), 0, 0, 20, 20, .5, 1, true, false);  // this might be dumb cause it isnt moving
    this.flyingAnimation = new Animation(ASSET_MANAGER.getAsset("./img/ball.png"), 0, 0, 20, 20, .3, 4, true, false);

    this.ctx = game.ctx;
    this.player = player;
    this.x = x;
    this.y = y;
    this.prevX = this.x;
    this.prevY = this.y;
    this.height = 20;
    this.width = 20;
    this.boundingBox = new BoundingBox(this.x, this.y, this.width, this.height);
    this.box = true; // draw box for testing
    this.team = player.team;
    this.speed = 1500;
    this.state = 0;
    this.scene = scene;


	//minimum charge time required for a boost to xspeed and yspeed is 1.
	if (chargingTime < 1) {
		chargingTime = 0;
	}
	//maximum charge time allowed is 3.
	else if (chargingTime > 3) {
		chargingTime = 3;
	}
    this.chargingTime = chargingTime;
    this.speed += chargingTime*500;
    if (this.player.triggerUp) {
        this.targetx = (x + this.player.stickx*100) - x;
        this.targety = (y + this.player.sticky*100) - y;
        this.player.triggerUp = false;
    }
    else    {
        this.targetx = this.player.controller.targetX - x - 50;
        this.targety = this.player.controller.targetY - y - 50;
    }
    this.ySpeed = this.targety / (Math.sqrt(Math.pow(this.targetx, 2) + Math.pow(this.targety, 2)));
	//arbitrary calculation for how much charging affects yspeed
	// this.ySpeed += (this.ySpeed * (chargingTime/2));
    this.xSpeed = this.targetx / (Math.sqrt(Math.pow(this.targetx, 2) + Math.pow(this.targety, 2)));
	//arbitrary calculation for how much charging affects xspeed
    // this.xSpeed += (this.xSpeed * (chargingTime/2));


    Entity.call(this, game, this.x, this.y, true, id);
}

Ball.prototype = new Entity();
Ball.prototype.constructor = Ball;

Ball.prototype.update = function() {
//console.log(this.team);
    if (this.state === 0)   {
        this.x += this.game.clockTick * this.speed * this.xSpeed;
        this.y += this.game.clockTick * this.speed * this.ySpeed;

        if (this.x > width || this.x < 0) {
            this.xSpeed = -this.xSpeed;
            this.speed -= 100;
        }
        if (this.y > height - 64 || this.y < 0)  {
            this.ySpeed = -this.ySpeed;
            this.speed -= 100;
        }
        if (this.speed < 1500)   {
            this.state++;
        }
    }
    else if (this.state === 1)   {  //If in falling state...
        this.ySpeed += .05; //This adds pseudo-gravity to the ball, making it plummet to the ground.
        this.x += this.game.clockTick * this.speed * this.xSpeed;
        this.y += this.game.clockTick * this.speed * this.ySpeed;
        if (this.x > width || this.x < 0)   {
            this.xSpeed = -this.xSpeed; //xSpeed is retained even in falling
        }
        // if (this.y > height - 32)   { //If the ball hits the ground...
        //     this.y = height - 32;
        //     this.speed -= 100; //Lower speed overall
        //     this.ySpeed = -(this.ySpeed/1.5); //Reverse ySpeed on bounce and reduce magnitude.
        //     if (this.speed <= 0)   { //Once speed is completely depleted, enter state 2
        //         this.state = 2;
        //     }
        // }
    }

    //// COLLISION ////
    this.boundingBox = new BoundingBox (this.x, this.y, this.width, this.height);
    for (var i = 0; i < this.scene.entities.length; i++) {
        var ent = this.scene.entities[i];

        if (ent !== this && ent.canCollide && this.boundingBox.hasCollided(ent.boundingBox)) {
            if (ent.id === 1)   {
                console.log("BOUNCE!!!!");
                if (this.prevY < this.y && (this.y + this.height) > ent.y && this.prevY + this.height <= ent.y)  {
                    this.y = ent.y - this.height;
                    this.speed -= 100;
                    this.ySpeed = -(this.ySpeed/1.5); //Reverse ySpeed on bounce and reduce magnitude.
                }
                else if (this.prevY > this.y && this.boundingBox.y < (ent.boundingBox.y + ent.boundingBox.height) && this.prevY >= (ent.boundingBox.y + ent.boundingBox.height))  {

                    this.y = ent.boundingBox.y + ent.boundingBox.height;
                    this.ySpeed = -this.ySpeed;
                    this.speed -= 100;


                }
                else if (this.prevX > this.x && (this.x < (ent.x + ent.width)))  {
                    this.x = ent.x + ent.width;
                    this.xSpeed = -this.xSpeed;
                    this.speed -= 100;
                }
                else if (this.prevX < this.x && (this.boundingBox.x + this.boundingBox.width) > ent.boundingBox.x)  {
                    this.x = ent.x - this.width;
                    this.xSpeed = -this.xSpeed;
                    this.speed -= 100;
                }
            }
            if (ent.id === 4)   {
                if (ent.isCatching || ent.team !== this.team)   {
                    console.log("HIT!!!!");
                    if (this.prevY < this.y && (this.y + this.height) > ent.y && this.prevY + this.height <= ent.y)  {
                        this.speed -= 100;
                        this.ySpeed = -(this.ySpeed/1.5); //Reverse ySpeed on bounce and reduce magnitude.
                    }
                    else if (this.prevY > this.y && this.boundingBox.y < (ent.boundingBox.y + ent.boundingBox.height) && this.prevY >= (ent.boundingBox.y + ent.boundingBox.height))  {
                        this.ySpeed = -this.ySpeed;
                        this.speed -= 100;


                    }
                    else if (this.prevX > this.x && (this.x < (ent.x + ent.width)))  {
                        this.xSpeed = -this.xSpeed;
                        this.speed -= 100;
                    }
                    else if (this.prevX < this.x && (this.boundingBox.x + this.boundingBox.width) > ent.boundingBox.x)  {
                        this.xSpeed = -this.xSpeed;
                        this.speed -= 100;
                    }
                }
            }
        }
    }
    
    if (this.speed < 1) {
        this.state = 2;
    }
    this.prevX = this.x;
    this.prevY = this.y;
    this.boundingBox = new BoundingBox (this.x, this.y, this.width, this.height);
    Entity.prototype.update.call(this);
}

Ball.prototype.draw = function(ctx, tick) {
    if (this.box) {
        this.boundingBox.draw(ctx);
    }
    if (this.state === 0)   {
        ctx.beginPath();
        if ((this.team%2)===0)
            ctx.fillStyle = "green";
        else
            ctx.fillStyle = "red";
        ctx.arc(this.x+10, this.y+10, 15, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.closePath();
    }
    if (this.state === 2)   {
        this.idleAnimation.drawFrame(tick, this.ctx, this.x, this.y);
    }
    else {
        this.flyingAnimation.drawFrame(tick, this.ctx, this.x, this.y);
    }
    Entity.prototype.draw.call(this);
}
