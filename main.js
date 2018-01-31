var width = 1136;
var height = 544;


function Background(game) {
//    this.bgAnimation = new Animation(ASSET_MANAGER.getAsset("./img/bg15.png"), 0, 0, width, height, 0.1, 8, true, false);
    this.bgAnimation = new Animation(ASSET_MANAGER.getAsset("./img/bg20.png"), 0, 0, width, height, 0.1, 23, true, false);


    Entity.call(this, game, 0, 0, 0, 0, false);
}
Background.prototype = new Entity();
Background.prototype.constructor = Background;

Background.prototype.update = function () {
}

Background.prototype.draw = function (ctx) {
    this.bgAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
}

//////////////// the "main" code begins here  ////////////////////////

var ASSET_MANAGER = new AssetManager();


//ASSET_MANAGER.queueDownload("./img/bg15.png");
ASSET_MANAGER.queueDownload("./img/bg20.png");
ASSET_MANAGER.queueDownload("./img/player.png");
ASSET_MANAGER.queueDownload("./img/ball.png");
//ASSET_MANAGER.queueDownload("./bgmusic.mp3");
//ASSET_MANAGER.queueDownload("./fight.mp3");

ASSET_MANAGER.downloadAll(function () {
    console.log("Powering up!");
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');

    var gameEngine = new GameEngine();
    // var bg = new Background(gameEngine);
    // var player = new Player(gameEngine);


    // gameEngine.addEntity(bg);
    // gameEngine.addEntity(player);
    var player1 = new Player(gameEngine, 0, 400, 1, ASSET_MANAGER.getAsset("./img/player.png"));
    //var player2 = new Player (gameEngine, 800, 400, 2, ASSET_MANAGER.getAsset("./img/player.png"));

    gameEngine.addEntity(new Background(gameEngine, ASSET_MANAGER.getAsset("./img/bg20.png")));
    gameEngine.addEntity(player1);
    //gameEngine.addEntity(player2);


    gameEngine.init(ctx);
    gameEngine.start();
});

var fight = new Audio("./fight.mp3");
fight.play();
fight.volume = .1;

var bgmusic = new Audio("./bgmusic.mp3");

bgmusic.play();
bgmusic.volume = 0.05;

var throwsound = new Audio("./throw.mp3");
throwsound.volume = .25;
//var bgmusic = new Audio('bgmusic.mp3');
//audio.currentTime = "50";
