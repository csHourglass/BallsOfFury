/**
 * An Entity object.  Used primarily as a parent class.
 * 
 * @param game : The game engine
 * @param x : The starting x coordinate (left side)
 * @param y : The starting y coordinate (top side)
 * @param canCollide : Determines this entity will be checked for collision
 * @param id : An ID value to aid in determining collision
 */

function Entity(game, x, y, canCollide, id) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.xv = 0;
    this.yv = 0;
	this.canCollide = canCollide;
	this.id = id;
    this.removeFromWorld = false;
}

Entity.prototype.update = function () {
}

Entity.prototype.draw = function (ctx) {
    if (this.game.showOutlines && this.radius) {
        this.game.ctx.beginPath();
        this.game.ctx.strokeStyle = "green";
        this.game.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.game.ctx.stroke();
        this.game.ctx.closePath();
    }
}

Entity.prototype.rotateAndCache = function (image, angle) {
    var offscreenCanvas = document.createElement('canvas');
    var size = Math.max(image.width, image.height);
    offscreenCanvas.width = size;
    offscreenCanvas.height = size;
    var offscreenCtx = offscreenCanvas.getContext('2d');
    offscreenCtx.save();
    offscreenCtx.translate(size / 2, size / 2);
    offscreenCtx.rotate(angle);
    offscreenCtx.translate(0, 0);
    offscreenCtx.drawImage(image, -(image.width / 2), -(image.height / 2));
    offscreenCtx.restore();
    //offscreenCtx.strokeStyle = "red";
    //offscreenCtx.strokeRect(0,0,size,size);
    return offscreenCanvas;
}

/*
    getX() and getY() check the offsets and scale stored in
    the game engine to draw the character. 
    (It might be better to move this into the Entity draw() 
    function so we do not need to call this method in our code.)
*/
Entity.prototype.getX = function()	{
    // Shift horizontally, then scale distance.
	return (this.x-this.game.xOffset)*this.game.drawScale;
}

Entity.prototype.getY = function()	{
    // Shift vertically, then scale distance.
	return (this.y-this.game.yOffset)*this.game.drawScale;
}