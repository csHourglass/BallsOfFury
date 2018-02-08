var width = 1920;
var height = 1080;


function Background(game, bg) {
//    this.bgAnimation = new Animation(ASSET_MANAGER.getAsset("./img/bg15.png"), 0, 0, width, height, 0.1, 8, true, false);
    var xscale = width/bg.width;
    var yscale = height/bg.height;

    if (xscale > yscale) this.scale = xscale;
    else this.scale = yscale;
    
    this.bgAnimation = new Animation(bg, 0, 0, bg.width, bg.height, 1, 1, true, false);


    Entity.call(this, game, 0, 0, 0, 0, false);
}
Background.prototype = new Entity();
Background.prototype.constructor = Background;

Background.prototype.update = function () {
}

Background.prototype.draw = function (ctx) {
    this.bgAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale);

}
//////////////// the "main" code begins here  ////////////////////////

var ASSET_MANAGER = new AssetManager();


//ASSET_MANAGER.queueDownload("./img/bg15.png");
ASSET_MANAGER.queueDownload("./img/bg20.png");
ASSET_MANAGER.queueDownload("./img/Stage1Background.png");
ASSET_MANAGER.queueDownload("./img/bg1.jpg");
ASSET_MANAGER.queueDownload("./img/TestPlatform.png");
ASSET_MANAGER.queueDownload("./img/TestWall.png");
ASSET_MANAGER.queueDownload("./img/TestCeiling.png");
ASSET_MANAGER.queueDownload("./img/player.png");
ASSET_MANAGER.queueDownload("./img/ball.png");
ASSET_MANAGER.queueDownload("./img/Training_dummy.png");
ASSET_MANAGER.queueDownload("./img/explosion.png");
//ASSET_MANAGER.queueDownload("./bgmusic.mp3");
//ASSET_MANAGER.queueDownload("./fight.mp3");

ASSET_MANAGER.downloadAll(function () {
    console.log("Powering up!");
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');

    var gameEngine = new GameEngine();
    // var bg = new Background(gameEngine);
    // var player = new Player(gameEngine);
    var dummy = new Dummy(gameEngine, 960, 772, 2, ASSET_MANAGER.getAsset("./img/Training_dummy.png"));

    // gameEngine.addEntity(bg);
    // gameEngine.addEntity(player);
    //var player1 = new Player(gameEngine, 128, 700, 1, ASSET_MANAGER.getAsset("./img/player.png"));
    //var player2 = new Player (gameEngine, 800, 400, 2, ASSET_MANAGER.getAsset("./img/player.png"));

    gameEngine.addEntity(new Background(gameEngine, ASSET_MANAGER.getAsset("./img/bg1.jpg")));
    gameEngine.addEntity(new Wall(gameEngine, 0, 918, 1920, 162, "./img/TestPlatform.png", 0, ASSET_MANAGER.getAsset("./img/TestPlatform.png")));
    gameEngine.addEntity(new Wall(gameEngine, 21, 72, 48, 846, "./img/TestWall.png", 0, ASSET_MANAGER.getAsset("./img/TestWall.png")));
    gameEngine.addEntity(new Wall(gameEngine, 1851, 72, 48, 846, "./img/TestWall.png", 0, ASSET_MANAGER.getAsset("./img/TestWall.png")));
    gameEngine.addEntity(new Wall(gameEngine, 0, 0, 1920, 72, "./img/TestCeiling.png", 0, ASSET_MANAGER.getAsset("./img/TestCeiling.png")));
    // gameEngine.addEntity(new Platform(gameEngine, 69, 1020, ))
    // gameEngine.addEntity(player1);
    gameEngine.addEntity(dummy);
    gameEngine.addEntity(new Camera(gameEngine, 0, 0, 1920, 1080));
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
