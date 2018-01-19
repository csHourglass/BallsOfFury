function Animation(spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse) {
    this.spriteSheet = spriteSheet;
    this.startX = startX;
    this.startY = startY;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.reverse = reverse;
}

Animation.prototype.drawFrame = function (tick, ctx, x, y, scaleBy) {
    var scaleBy = scaleBy || 1;
    this.elapsedTime += tick;
    if (this.loop) {
        if (this.isDone()) {
            this.elapsedTime = 0;
        }
    } else if (this.isDone()) {
        return;
    }
    var index = this.reverse ? this.frames - this.currentFrame() - 1 : this.currentFrame();
    var vindex = 0;
    if ((index + 1) * this.frameWidth + this.startX > this.spriteSheet.width) {
        index -= Math.floor((this.spriteSheet.width - this.startX) / this.frameWidth);
        vindex++;
    }
    while ((index + 1) * this.frameWidth > this.spriteSheet.width) {
        index -= Math.floor(this.spriteSheet.width / this.frameWidth);
        vindex++;
    }

    var locX = x;
    var locY = y;
    var offset = vindex === 0 ? this.startX : 0;
    ctx.drawImage(this.spriteSheet,
                  index * this.frameWidth + offset, vindex * this.frameHeight + this.startY,  // source from sheet
                  this.frameWidth, this.frameHeight,
                  locX, locY,
                  this.frameWidth * scaleBy,
                  this.frameHeight * scaleBy);
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}
function Background(game) {
    Entity.call(this, game, 0, 400);
    this.radius = 200;
}
Background.prototype = new Entity();
Background.prototype.constructor = Background;

Background.prototype.update = function () {
}

Background.prototype.draw = function (ctx) {
    ctx.fillStyle = "SaddleBrown";
    ctx.fillRect(0,500,800,300);
    Entity.prototype.draw.call(this);
}

function Player(game)   {
    //Loading Animations
    this.idleAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 0, 0, 128, 128, 0.2, 8, true, false);
    this.runAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 384, 128, 128, 128, 0.2, 8, true, false);
    this.runStartAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 0, 128, 128, 128, 0.2, 3, false, false);
    this.jumpAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 640, 256, 128, 128, 1, 5, false, false);
    this.jumpStartAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 384, 256, 128, 128, 0.2, 2, false, false);
    this.fallAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 512, 384, 128, 128, 0.2, 4, true, false);
    this.fallStartAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 256, 384, 128, 128, 0.2, 2, false, false);

    this.state = 0;
    this.direction = 0;
    this.canJump = true;
    this.radius = 100;
    this.ground = 400;
    Entity.call(this, game, 0, 400);

}
Player.prototype = new Entity();
Player.prototype.constructor = Player;

Player.prototype.update = function ()   {
    if (this.game.space && this.canJump)    {
        this.state = 1;
        this.canJump = false;
    }
    if (this.state !== 1 && this.game.spaceReleased) this.canJump = true;
    this.direction = this.game.direction;
    if (this.state === 1) {
        if (this.y > 400) {
            this.jumpAnimation.elapsedTime = 0;
            this.state = 0;
        }
        var jumpDistance = this.jumpAnimation.elapsedTime / this.jumpAnimation.totalTime;
        var totalHeight = 75;

        if (jumpDistance > 0.5)
            jumpDistance = 1 - jumpDistance;

        //var height = jumpDistance * 2 * totalHeight;
        var height = totalHeight*(-4 * (jumpDistance * jumpDistance - jumpDistance));
        this.y = this.ground - height;
    }
    this.direction = this.x;
    if (this.game.aKey) {
        this.x -= 10;
    }
    if (this.game.dKey) this.x += 10;

    Entity.prototype.update.call(this);
}

Player.prototype.draw = function(ctx)   {
    if (this.state === 1) {
        this.jumpAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y - 34);
    }
    else if (this.x !== this.direction) {
        this.direction = this.x;
        this.runAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    }
    else {
        this.idleAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    }
    Entity.prototype.draw.call(this);
}

// the "main" code begins here

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./img/player.png");
ASSET_MANAGER.queueDownload("./img/background.gif");

ASSET_MANAGER.downloadAll(function () {
    console.log("Powering up!");
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');

    var gameEngine = new GameEngine();
    var bg = new Background(gameEngine);
    var player = new Player(gameEngine);

    gameEngine.addEntity(bg);
    gameEngine.addEntity(player);
 
    gameEngine.init(ctx);
    gameEngine.start();
});
