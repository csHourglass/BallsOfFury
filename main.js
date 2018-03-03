
//////////////// the "main" code begins here  ////////////////////////

var ASSET_MANAGER = new AssetManager();


ASSET_MANAGER.queueDownload("./img/animbg.png");
ASSET_MANAGER.queueDownload("./img/balls-of-fury.png");
ASSET_MANAGER.queueDownload("./img/load.png");
ASSET_MANAGER.queueDownload("./img/pressstart.png");

//ASSET_MANAGER.queueDownload("./bgmusic.mp3");
//ASSET_MANAGER.queueDownload("./fight.mp3");

ASSET_MANAGER.downloadAll(function () {
    console.log("Powering up!");
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');

    var gameEngine = new GameEngine();
    // var bg = new Background(gameEngine);
    // var player = new Player(gameEngine);
/*	var dummy = new Dummy(gameEngine, 800, 380, 2, ASSET_MANAGER.getAsset("./img/Training_dummy.png"));

    // gameEngine.addEntity(bg);
    // gameEngine.addEntity(player);
    //var player1 = new Player(gameEngine, 128, 700, 1, ASSET_MANAGER.getAsset("./img/player.png"));
    //var player2 = new Player (gameEngine, 800, 400, 2, ASSET_MANAGER.getAsset("./img/player.png"));

    gameEngine.addEntity(new Background(gameEngine, ASSET_MANAGER.getAsset("./img/Stage1Background.png")));
    gameEngine.addEntity(new Wall(gameEngine, 0, 918, 1920, 162, "./img/TestPlatform.png", 0, ASSET_MANAGER.getAsset("./img/TestPlatform.png")));
    gameEngine.addEntity(new Wall(gameEngine, 21, 72, 48, 846, "./img/TestWall.png", 0, ASSET_MANAGER.getAsset("./img/TestWall.png")));
    gameEngine.addEntity(new Wall(gameEngine, 1851, 72, 48, 846, "./img/TestWall.png", 0, ASSET_MANAGER.getAsset("./img/TestWall.png")));
    gameEngine.addEntity(new Wall(gameEngine, 0, 0, 1920, 72, "./img/TestCeiling.png", 0, ASSET_MANAGER.getAsset("./img/TestCeiling.png")));
    // gameEngine.addEntity(player1);
    gameEngine.addEntity(dummy);
    gameEngine.addEntity(new Camera(gameEngine, 0, 0, 1920, 1080));
    //gameEngine.addEntity(player2);
*/


	var sceneManager = new SceneManager();
	//sceneManager.levelOne();
	/*setTimeout(function(){
    sceneManager.removeLevelOne();
}, 10000);*/
    gameEngine.init(ctx, sceneManager);


    gameEngine.start();
});
//var bgmusic = new Audio('bgmusic.mp3');
//audio.currentTime = "50";
