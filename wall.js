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

    this.idleAnim = animation[0];

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.team = 0;

    // The bounding box of the wall.  (TODO: Need circles on corners as well)
    this.boundingBox = new BoundingBox(this.x, this.y, this.width, this.height);
    this.cornerBoxLeft = new BoundingBox(this.x - 48, this.y - 20, 20, 20);
    this.cornerBoxRight = new BoundingBox(this.x + this.width + 48, this.y - 20, 20, 20);
    this.x + 40, this.y + 30, this.width - 80, this.height - 35

    Entity.call(this, game, this.x, this.y, true, 1);
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
Wall.prototype.draw = function(ctx, tick)   {
    ////////// bounding box ////////////
    if (this.showBoxes) {
        this.boundingBox.draw(ctx);
    }

    this.idleAnim.drawFrame(tick, ctx, this.getX(), this.getY(), this.game.drawScale);
    Entity.prototype.draw.call(this);
}
