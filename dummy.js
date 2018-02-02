

function Dummy(game, x, y, team) {
    this.animation = new Animation(ASSET_MANAGER.getAsset("./img/Training_dummy.png"), 0, 0, 122, 146, 1, 1, true, false);
    this.explosion = new Animation(ASSET_MANAGER.getAsset("./img/explosion.png"), 0, 0, 256, 256, 0.05, 48, false, false);
    this.x = x;
    this.y = y;
    this.team = team;
    this.counter = 0;
    //this.boundingBox = new BoundingBox(this.x, this.y, 122, 146);
    this.showBox = true;
    this.isHit = false;

    Entity.call(this, game, this.x, this.y, 0, 0, false);
}


Dummy.prototype = new Entity();
Dummy.prototype.constructor = Dummy;

Dummy.prototype.update = function() {
    for (var i = 0; i < this.game.entities.length; i++) {
        var ent = this.game.entities[i];

        if (ent != this && ent.canCollide && ent.speed >= 1 && this.boundingBox.hasCollided(ent.boundingBox)) {
            this.isHit = true;
            //ent.canCollide = false;
        }
    }

    if (this.explosion.isDone()) {
        this.explosion.elapsedTime = 0;
        this.isHit = false;
    }

    Entity.prototype.update.call(this);
};

Dummy.prototype.draw = function(ctx){
    if (this.showBox) this.boundingBox.draw(ctx);
    if (this.isHit) {
        this.explosion.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    } else {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    }
    Entity.prototype.draw.call(this);
};
