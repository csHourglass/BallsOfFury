/**
 * Wall is an Entity that prevents anything from entering it's bounding box.
 * @param game : The game engine
 * @param x : The starting x coordinate (left side)
 * @param y : The starting y coordinate (top side)
 * @param width : The width of the wall
 * @param height : The height of the wall
 * @param animation : The animation of the wall
 */

function Wall(game, x, y, width, height, animation)   {

    this.idleAnim = animation;

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.team = team;

    // The bounding box of the wall.  (TODO: Need circles on corners as well)
    this.boundingBox = new BoundingBox(this.x, this.y, this.width, this.height);

    this.showBoxes = true;  // Shows the bounding box.  (this should be moved to game engine.)

    Entity.call(this, game, this.x, this.y, 0, 0, true, 1);
}
Wall.prototype = new Entity();
Wall.prototype.constructor = Wall;

/**
 * The update() function for Wall does nothing except call the parent class.
 */
Wall.prototype.update = function ()   {
    Entity.prototype.update.call(this);
}

/**
 * draw() draws the wall animation at its current location.
 * @param {*} ctx : The context.
 */
Wall.prototype.draw = function(ctx)   {
    ////////// bounding box ////////////
    if (this.showBoxes) {
        this.boundingBox.draw(ctx);
    }

    this.anim.drawFrame(this.game.clockTick, ctx, this.getX(), this.getY(), this.game.drawScale);
    Entity.prototype.draw.call(this);
}