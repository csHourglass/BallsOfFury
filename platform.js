

function Platform(game, x, y, width, height, path, team, scale)   {
    //Loading Animations
//// Right Animations ////
    this.anim = new Animation(ASSET_MANAGER.getAsset(path), 0, 0, width, height, 1, 1, true, false);

    this.x = x;
    this.y = y;
    this.width = width * scale;
    this.height = height * scale;
    this.scale = scale;
    this.boundingBox = new BoundingBox(this.x, this.y, this.width, 0);
    this.showBoxes = true;  // show Bounding boxes for testing
    this.team = team;

    Entity.call(this, game, this.x, this.y, 0, 0, true, 2);
}
Platform.prototype = new Entity();
Platform.prototype.constructor = Platform;


Platform.prototype.update = function ()   {

/////***** Collision *****/////
    for (var i = 0; i < this.game.entities.length; i++) {
        var ent = this.game.entities[i];

        if (ent !== this && ent.canCollide && this.boundingBox.hasCollided(ent.boundingBox)) {
            console.log("hurp, collision");

        }
    }

    Entity.prototype.update.call(this);
}

Platform.prototype.draw = function(ctx)   {
    ////////// bounding box ////////////
    if (this.showBoxes) {
        this.boundingBox.draw(ctx);
    }

    this.anim.drawFrame(0, ctx, this.getX(), this.getY(), this.game.drawScale*this.scale);

    Entity.prototype.draw.call(this);
}