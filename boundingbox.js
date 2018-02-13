/**
 * The purpose of this class is essentially just for
 * collision detection between entities.
 * @param {*} x : The left side of the box.
 * @param {*} y : The top of the box.
 * @param {*} width : The width of the box.
 * @param {*} height : The height of the box.
 */
   function BoundingBox (x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.left = x;
    this.top = y;
    this.right = x + width;
    this.bottom = y + height;
}
/**
 * hasCollided() returns true if this bounding box overlaps with the
 * other bounding box.
 * @param {*} other : A different bounding box class
 */
BoundingBox.prototype.hasCollided = function (other) {
    return (this.right > other.left && this.left < other.right &&
            this.top < other.bottom && this.bottom > other.top);
}

/**
 * draw() draws a colored rectangle representing the size of
 * the bounding box.
 * NOTE: The code is outdated and does not draw the box based
 *  on camera position.
 * @param {*} ctx : The context.
 */
BoundingBox.prototype.draw = function(ctx) {

    ctx.strokeStyle = "green";
    ctx.strokeRect(this.x, this.y, this.width, this.height);
}