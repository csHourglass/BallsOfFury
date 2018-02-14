

function Dummy(game, x, y, team, scene) {
    this.animation = new Animation(ASSET_MANAGER.getAsset("./img/Training_dummy.png"), 0, 0, 122, 146, 1, 1, true, false);
    this.explosion = new Animation(ASSET_MANAGER.getAsset("./img/explosion.png"), 0, 0, 256, 256, 0.05, 48, false, false);
    this.x = x;
    this.y = y;
    this.width = 122;
    this.height = 146;
    this.team = team;
    this.counter = 0;
    this.boundingBox = new BoundingBox(this.x, this.y, 122, 146);
    this.showBox = true;
    this.isHit = false;
    this.scene = scene;

    Entity.call(this, game, this.x, this.y, false, 4);
}

Dummy.prototype = new Entity();
Dummy.prototype.constructor = Dummy;

Dummy.prototype.update = function() {
    for (var i = 0; i < this.scene.entities.length; i++) {
        var ent = this.scene.entities[i];

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
        this.explosion.drawFrame(this.game.clockTick, ctx, this.x - (this.width/2), this.y - (this.height/2));
    } else {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x , this.y);
    }
    Entity.prototype.draw.call(this);
};
