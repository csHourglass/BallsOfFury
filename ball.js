function Ball(game, x, y, team, chargingTime) {
    this.idleAnimation = new Animation(ASSET_MANAGER.getAsset("./img/ball.png"), 0, 0, 20, 20, .5, 1, true, false);  // this might be dumb cause it isnt moving
    this.flyingAnimation = new Animation(ASSET_MANAGER.getAsset("./img/ball.png"), 0, 0, 20, 20, .3, 4, true, false);

    this.ctx = game.ctx;

    // if (left) { // ball will go left
    //     this.speed = -1500;
    // } else {  // ball will go right
    //     this.speed = 1500;
    // }

    this.x = x + 75;
    this.y = y + 75;
    this.height = 20;
    this.width = 20;
    this.team = team;

    this.state = 0;
    this.targetx = game.stickx - x - 50;
    this.targety = game.sticky - y - 50;
    //console.log(this.targetx, this.targety);

	//minimum charge time required for a boost to xspeed and yspeed is 1.
	if (chargingTime < 1) {
		chargingTime = 0;
	}
	//maximum charge time allowed is 3.
	else if (chargingTime > 3) {
		chargingTime = 3;
	}
	this.chargingTime = chargingTime;
    //max charge time will double the speed of the ball.
    this.speedDefault = 1500;
    this.speed = this.speedDefault + (this.speedDefault * chargingTime/3);
    //how much the speed will decrease by
    this.speedDecrease = 100;

    this.ySpeed = this.targety / (Math.sqrt(Math.pow(this.targetx, 2) + Math.pow(this.targety, 2)));
    this.xSpeed = this.targetx / (Math.sqrt(Math.pow(this.targetx, 2) + Math.pow(this.targety, 2)));

    Entity.call(this, game, this.x, this.y, 0, 0, true);

}

Ball.prototype = new Entity();
Ball.prototype.constructor = Ball;

Ball.prototype.update = function() {
    if (this.speed > 1500) {
        this.speedDecrease = 400;
    }
    else {
        this.speedDecrease = 100;
    }
//console.log(this.team);
    if (this.state === 0)   {
        this.x += this.game.clockTick * this.speed * this.xSpeed;
        this.y += this.game.clockTick * this.speed * this.ySpeed;

        if (this.x > width || this.x < 0) {
            this.xSpeed = -this.xSpeed;
            this.speed -= this.speedDecrease;
        }
        if (this.y > height - 64 || this.y < 0)  {
            this.ySpeed = -this.ySpeed;
            this.speed -= this.speedDecrease;
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
        if (this.y > height - 32)   { //If the ball hits the ground...
            this.y = height - 32;
            this.speed -= this.speedDecrease; //Lower speed overall
            this.ySpeed = -(this.ySpeed/1.5); //Reverse ySpeed on bounce and reduce magnitude.
            if (this.speed <= 0)   { //Once speed is completely depleted, enter state 2
                this.state = 2;
            }
        }
    }
    Entity.prototype.update.call(this);
}

Ball.prototype.draw = function() {
    if (this.state === 2)   {
        this.idleAnimation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    }
    else {
        this.flyingAnimation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    }
    Entity.prototype.draw.call(this);
}
function Ball(game, x, y, chargingTime) {
    this.idleAnimation = new Animation(ASSET_MANAGER.getAsset("./img/ball.png"), 0, 0, 20, 20, .5, 1, true, false);  // this might be dumb cause it isnt moving
    this.flyingAnimation = new Animation(ASSET_MANAGER.getAsset("./img/ball.png"), 0, 0, 20, 20, .3, 4, true, false);

    this.ctx = game.ctx;
    this.x = x;
    this.y = y;
    this.height = 20;
    this.width = 20;
    this.boundingBox = new BoundingBox(this.x, this.y, this.width, this.height);
    this.box = true; // draw box for testing
    this.team = 1;
    this.speed = 1500;
    this.state = 0;
    if (game.triggerUp) {
        this.targetx = (x + game.stickx*100) - x;
        this.targety = (y + game.sticky*100) - y;
        game.triggerUp = false;
    }
    else    {
        this.targetx = game.mousex - x - 50;
        this.targety = game.mousey - y - 50;
    }

	//minimum charge time required for a boost to xspeed and yspeed is 1.
	if (chargingTime < 1) {
		chargingTime = 0;
	}
	//maximum charge time allowed is 3.
	else if (chargingTime > 3) {
		chargingTime = 3;
	}
	this.chargingTime = chargingTime;
    this.ySpeed = this.targety / (Math.sqrt(Math.pow(this.targetx, 2) + Math.pow(this.targety, 2)));
	//arbitrary calculation for how much charging affects yspeed
	this.ySpeed += (this.ySpeed * (chargingTime/2));
    this.xSpeed = this.targetx / (Math.sqrt(Math.pow(this.targetx, 2) + Math.pow(this.targety, 2)));
	//arbitrary calculation for how much charging affects xspeed
	this.xSpeed += (this.xSpeed * (chargingTime/2));

    Entity.call(this, game, this.x, this.y, 0, 0, true);
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
        if (this.y > height - 32)   { //If the ball hits the ground...
            this.y = height - 32;
            this.speed -= 100; //Lower speed overall
            this.ySpeed = -(this.ySpeed/1.5); //Reverse ySpeed on bounce and reduce magnitude.
            if (this.speed <= 0)   { //Once speed is completely depleted, enter state 2
                this.state = 2;
            }
        }
    }
    this.boundingBox = new BoundingBox (this.x, this.y, this.width, this.height);
    Entity.prototype.update.call(this);
}

Ball.prototype.draw = function(ctx) {
    if (this.box) {
        this.boundingBox.draw(ctx);
    }
    if (this.state === 2)   {
        this.idleAnimation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    }
    else {
        this.flyingAnimation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    }
    Entity.prototype.draw.call(this);
}
