function Background(game, animation) {
//    this.bgAnimation = new Animation(ASSET_MANAGER.getAsset("./img/bg15.png"), 0, 0, width, height, 0.1, 8, true, false);
    this.animation = animation;


    Entity.call(this, game, 0, 0, 0, 0, false);
}
Background.prototype = new Entity();
Background.prototype.constructor = Background;

Background.prototype.update = function () {
}

Background.prototype.draw = function (ctx) {
    this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);

}
