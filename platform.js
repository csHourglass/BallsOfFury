

function Platform(game, x, y, width, height, animation, scale)   {
    //Loading Animations
//// Right Animations ////
    this.anim = animation[0];

    this.x = x;
    this.y = y;
    this.width = width * scale;
    this.height = height * scale;
    this.scale = scale;
    this.boundingBox = new BoundingBox(this.x, this.y, this.width, 0);
    this.cornerBoxLeft = new BoundingBox(this.x - 48 - 20, this.y - 20, 20, 20);
    this.cornerBoxRight = new BoundingBox(this.x + this.width + 48, this.y - 20, 20, 20);
    this.showBoxes = true;  // show Bounding boxes for testing

    Entity.call(this, game, this.x, this.y, true, 2);
}
Platform.prototype = new Entity();
Platform.prototype.constructor = Platform;


Platform.prototype.update = function ()   {

/////***** Collision *****/////
    // for (var i = 0; i < this.game.entities.length; i++) {
    //     var ent = this.game.entities[i];

    //     if (ent !== this && ent.canCollide && this.boundingBox.hasCollided(ent.boundingBox)) {
    //         console.log("hurp, collision");

    //     }
    // }

    Entity.prototype.update.call(this);
}

Platform.prototype.draw = function(ctx, tick)   {
    ////////// bounding box ////////////
    if (this.showBoxes) {
        this.boundingBox.draw(ctx);
    }

    this.anim.drawFrame(tick, ctx, this.getX(), this.getY(), this.game.drawScale*this.scale);

    Entity.prototype.draw.call(this);
}