

function Wall(game, x, y, width, height, path, team)   {
    //Loading Animations
//// Right Animations ////
    this.anim = new Animation(ASSET_MANAGER.getAsset(path), 0, 0, width, height, 1, 1, true, false);

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.boundingBox = new BoundingBox(this.x, this.y, this.width, this.height);
    this.showBoxes = true;  // show Bounding boxes for testing
    this.team = team;

    Entity.call(this, game, this.x, this.y, 0, 0, true, 1);
}
Wall.prototype = new Entity();
Wall.prototype.constructor = Wall;


Wall.prototype.update = function ()   {

/////***** Collision *****/////
    for (var i = 0; i < this.game.entities.length; i++) {
        var ent = this.game.entities[i];

        if (ent !== this && ent.canCollide && this.boundingBox.hasCollided(ent.boundingBox)) {
            console.log("hurp, collision");

        }
    }

    Entity.prototype.update.call(this);
}

Wall.prototype.draw = function(ctx)   {
    ////////// bounding box ////////////
    if (this.showBoxes) {
        this.boundingBox.draw(ctx);
    }

    this.anim.drawFrame(0, ctx, this.getX(), this.getY(), this.game.drawScale);

    Entity.prototype.draw.call(this);
}