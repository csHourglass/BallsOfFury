
function Entity(game, x, y, xv, yv, canCollide) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.xv = xv;
    this.yv = yv;
    this.canCollide = canCollide;
    this.removeFromWorld = false;
}

Entity.prototype.update = function () {
}

Entity.prototype.constructor = Entity;

Entity.prototype.draw = function (ctx) {
    if (this.game.showOutlines && this.radius) {
        this.game.ctx.beginPath();
        this.game.ctx.strokeStyle = "green";
        var tempX = this.x + this.xv;
        var tempY = this.y + this.yv;
        this.game.ctx.arc(tempX, tempY, this.radius, 0, Math.PI * 2, false);
        this.game.ctx.stroke();
        this.game.ctx.closePath();
    }
}

// Entity.prototype.rotateAndCache = function (image, angle) {
//     var offscreenCanvas = document.createElement('canvas');
//     var size = Math.max(image.width, image.height);
//     offscreenCanvas.width = size;
//     offscreenCanvas.height = size;
//     var offscreenCtx = offscreenCanvas.getContext('2d');
//     offscreenCtx.save();
//     offscreenCtx.translate(size / 2, size / 2);
//     offscreenCtx.rotate(angle);
//     offscreenCtx.translate(0, 0);
//     offscreenCtx.drawImage(image, -(image.width / 2), -(image.height / 2));
//     offscreenCtx.restore();
//     //offscreenCtx.strokeStyle = "red";
//     //offscreenCtx.strokeRect(0,0,size,size);
//     return offscreenCanvas;
// }