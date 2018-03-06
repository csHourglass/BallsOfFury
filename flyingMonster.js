/*****************************************************
Flying Monster
    This monster will fly around randomly untill it comes near the
    player.  If it is near the player it will fly directly at the player.
    game: reference to gameEngine
    x: x Coord
    y: y Coord
    team: team that monster is member of (usually 2)
    scene: reference to scene the monster is in

*****************************************************/
function FlyingMonster(game, x, y, team, scene) {
    // this.x = x;
    // this.y = y;
    this.position = new Vector(x, y);
    // this.xSpeed = 10 * (Math.random() - 0.4);
    // this.ySpeed = 10 * (Math.random() - 0.4);
    this.velocity = new Vector(10 * (Math.random() - 0.4), 10 * (Math.random() - 0.4));
    this.acceleration = new Vector(0, 0);  // to accelerate toward a player
    this.maxSpeed = 15;
    this.width = 226;
    this.height = 177;
    this.Ranimation = new Animation(ASSET_MANAGER.getAsset("./img/flyingMonster.png"), 0, 95, this.width, this.height, 0.15, 4, true, false);
    this.Lanimation = new Animation(ASSET_MANAGER.getAsset("./img/flyingMonster.png"), 0, 370, this.width, this.height, 0.15, 4, true, true);
    this.explosion = new Animation(ASSET_MANAGER.getAsset("./img/explosion.png"), 0, 0, 256, 256, 0.01, 48, false, false);

    this.team = team;
    this.isKilled = false;
    this.boundingBox = new BoundingBox(this.position.x + 25, this.position.y + 25, this.width - 25, this.height - 35);
    // vision is for the flyingMonster to detect a player and move toward it.
    this.vision = new BoundingCircle(game, this.position.x + (this.width/2), this.position.y + (this.height/2), 500);
    this.seePlayer = false;
    this.playerSeen; // hold a reference to the player thats been seen
    this.spawnWindow = new BoundingCircle(game, this.position.x + (this.width/2), this.position.y + (this.height/2), 600);
    this.scene = scene;
    Entity.call(this, game, this.position.x, this.position.y, true, 3);

}

FlyingMonster.prototype = new Entity();
FlyingMonster.prototype.constructor = FlyingMonster;

FlyingMonster.prototype.update = function() {

    // move
    // this.x += this.xSpeed;
    // this.y += this.ySpeed;
    this.velocity.limit(15);
    this.position.add(this.velocity);
//    console.log(this.position);
    if (this.velocity.x > 0)
        this.boundingBox = new BoundingBox(this.position.x + 25, this.position.y + 25, this.width - 35, this.height - 25);
    else
        this.boundingBox = new BoundingBox(this.position.x + 10, this.position.y + 25, this.width - 25, this.height - 25);

    this.vision.setXY(this.position.x, this.position.y);
    this.spawnWindow.setXY(this.position.x, this.position.y);
    // check for collisions
    for (var i = 0; i < this.scene.entities.length; i++) {
        var ent = this.scene.entities[i];
        // look for a player
        if (ent instanceof Player) {
            if (this.vision.canSee(ent.boundingBox)) {
                this.seePlayer = true;
                this.playerSeen = ent;
            } else {
                this.seePlayer = false;
            }
        }
        if (ent.id === 5 && ent.canCollide && ent.state === 0 && this.boundingBox.hasCollided(ent.boundingBox)) {
            this.isKilled = true;
        } else if (ent.id === 4 && this.boundingBox.hasCollided(ent.boundingBox)) {
            ent.isKilled = true;
        }

        if (ent != this && (ent instanceof Wall || ent instanceof FlyingMonster) && this.boundingBox.hasCollided(ent.boundingBox)) {
            if (this.boundingBox.collideLeft(ent.boundingBox)) {
            //    console.log("LEFT");
                this.velocity.x = -this.velocity.x;
                this.position.x = ent.boundingBox.x + ent.boundingBox.width;
            } else if (this.boundingBox.collideRight(ent.boundingBox)) {
            //    console.log("RIGHT");
                this.velocity.x = -this.velocity.x;
                this.position.x = ent.boundingBox.x - this.boundingBox.width - 25;
            } else if (this.boundingBox.collideTop(ent.boundingBox)) {
            //    console.log("TOP");
                this.velocity.y = -this.velocity.y;
                this.position.y = ent.boundingBox.y + ent.boundingBox.height;
            } else if (this.boundingBox.collideBottom(ent.boundingBox)) {
            //    console.log("BOTTOM");
                this.velocity.y = -this.velocity.y;
                this.position.y = ent.boundingBox.y - this.boundingBox.height - 25;
            }
        }
    }
    // move toward a player if seen
    if (this.seePlayer) {
        // console.log("I SEE YOU");
        var loc = new Vector(this.position.x, this.position.y);
        var direction = new Vector(this.playerSeen.x, this.playerSeen.y);
        direction.sub(loc);
        direction.normalize();

        direction.mult(0.3); // slow down
        this.acceleration = direction;
        this.velocity.add(this.acceleration);
    }

    if (this.explosion.isDone()) {
        this.explosion.elapsedTime = 0;
        this.removeFromWorld = true;
    }
    Entity.prototype.update.call(this);
}

FlyingMonster.prototype.draw = function(ctx, tick) {
    if (this.showBoxes) this.boundingBox.draw(ctx);
    if (this.isKilled) {
        this.explosion.drawFrame(tick, ctx, this.position.x, this.position.y);
    } else if (this.velocity.x < 0) {
        this.Lanimation.drawFrame(tick, ctx, this.position.x, this.position.y);
    } else {
        this.Ranimation.drawFrame(tick, ctx, this.position.x, this.position.y);
    }
    Entity.prototype.draw.call(this);
}

/**
 * Bounding Circle
 * used specifically for flying monster to detect player and move toward it.
 */
function BoundingCircle(x, y, rad) {
    this.x = x;
    this.y = y;
    this.radius = rad;
}
/**
 * player is a rectangular boundingBox
 */
BoundingCircle.prototype.canSee = function(playerBB) {
    return (((this.x - this.radius < playerBB.right && playerBB.right < this.x + this.radius)
      || (this.x - this.radius < playerBB.left && playerBB.left < this.x + this.radius))
      && ((this.y + this.radius > playerBB.top && playerBB.top > this.y - this.radius)
      || (this.y - this.radius < playerBB.bottom && playerBB.bottom < this.y + this.radius)));
}

BoundingCircle.prototype.setXY = function(x, y) {
    this.x = x;
    this.y = y;
}


function Vector(x, y){
    this.x = x;
    this.y = y;
}
Vector.prototype.add = function(other){
    this.x += other.x;
    this.y += other.y;
}
Vector.prototype.sub = function(other) {
    this.x -= other.x;
    this.y -= other.y;
}
Vector.prototype.mag = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
}
Vector.prototype.mult = function(num) {
    this.x *= num;
    this.y *= num;
}
Vector.prototype.div = function(num) {
    this.x /= num;
    this.y /= num;
}
Vector.prototype.normalize = function() {
    var m = this.mag();

    if (m > 0) {
        this.div(m);
    }
}
Vector.prototype.limit = function(num) {
    if (this.mag() > num) {
        this.normalize();
        this.mult(num);
    }
}
