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
    this.x = x;
    this.y = y;
    this.xSpeed = 10 * (Math.random() - 0.4);
    this.ySpeed = 10 * (Math.random() - 0.4);
    this.width = 226;
    this.height = 177;
    this.Ranimation = new Animation(ASSET_MANAGER.getAsset("./img/flyingMonster.png"), 0, 95, this.width, this.height, 0.15, 4, true, false);
    this.Lanimation = new Animation(ASSET_MANAGER.getAsset("./img/flyingMonster.png"), 0, 370, this.width, this.height, 0.15, 4, true, true);
    this.explosion = new Animation(ASSET_MANAGER.getAsset("./img/explosion.png"), 0, 0, 256, 256, 0.01, 48, false, false);

    this.team = team;
    this.isKilled = false;

    this.boundingBox = new BoundingBox(this.x + 10, this.y + 25, this.width - 25, this.height - 25);
    this.showBoxes = true;

    this.scene = scene;
    Entity.call(this, game, this.x, this.y, true, 3);

}

FlyingMonster.prototype = new Entity();
FlyingMonster.prototype.constructor = FlyingMonster;

FlyingMonster.prototype.update = function() {

    // move
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    this.boundingBox = new BoundingBox(this.x + 25, this.y + 25, this.width - 25, this.height - 25);

    // check for collisions
    for (var i = 0; i < this.scene.entities.length; i++) {
        var ent = this.scene.entities[i];

        if (ent.id === 5 && ent.canCollide && ent.state === 0 && this.boundingBox.hasCollided(ent.boundingBox)) {
            this.isKilled = true;
        } else if (ent.id === 4 && this.boundingBox.hasCollided(ent.boundingBox)) {
            ent.isKilled = true;
        }

        if (ent != this && (ent instanceof Wall || ent instanceof FlyingMonster) && this.boundingBox.hasCollided(ent.boundingBox)) {
            if (this.boundingBox.collideLeft(ent.boundingBox)) {
                console.log("LEFT");
                this.xSpeed = -this.xSpeed;
                this.x = ent.boundingBox.x + ent.boundingBox.width;
            } else if (this.boundingBox.collideRight(ent.boundingBox)) {
                console.log("RIGHT");
                this.xSpeed = -this.xSpeed;
                this.x = ent.boundingBox.x - this.boundingBox.width - 25;
            } else if (this.boundingBox.collideTop(ent.boundingBox)) {
                console.log("TOP");
                this.ySpeed = -this.ySpeed;
                this.y = ent.boundingBox.y + ent.boundingBox.height;
            } else if (this.boundingBox.collideBottom(ent.boundingBox)) {
                console.log("BOTTOM");
                this.ySpeed = -this.ySpeed;
                this.y = ent.boundingBox.y - this.boundingBox.height - 25;
            }
        }
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
        this.explosion.drawFrame(tick, ctx, this.x, this.y);
    } else if (this.xSpeed < 0) {
        this.Lanimation.drawFrame(tick, ctx, this.x, this.y);
    } else {
        this.Ranimation.drawFrame(tick, ctx, this.x, this.y);
    }

    Entity.prototype.draw.call(this);

}
