
//////////////// the "main" code begins here  ////////////////////////

var ASSET_MANAGER = new AssetManager();


ASSET_MANAGER.queueDownload("./img/animbg.png");
ASSET_MANAGER.queueDownload("./img/bg20.png");
ASSET_MANAGER.queueDownload("./img/bof.png");
ASSET_MANAGER.queueDownload("./img/load.png");
ASSET_MANAGER.queueDownload("./img/text.png");
ASSET_MANAGER.queueDownload("./img/Stage1Background.png");
ASSET_MANAGER.queueDownload("./img/titlebg.png");
ASSET_MANAGER.queueDownload("./img/playerselect.png");
ASSET_MANAGER.queueDownload("./img/TestPlatform.png");
ASSET_MANAGER.queueDownload("./img/TestWall.png");
ASSET_MANAGER.queueDownload("./img/TestCeiling.png");
ASSET_MANAGER.queueDownload("./img/player.png");
ASSET_MANAGER.queueDownload("./img/ball.png");
ASSET_MANAGER.queueDownload("./img/Training_dummy.png");
ASSET_MANAGER.queueDownload("./img/explosion.png");
ASSET_MANAGER.queueDownload("./img/fulllive.png");
ASSET_MANAGER.queueDownload("./img/halflive.png");
ASSET_MANAGER.queueDownload("./img/nolive.png");
ASSET_MANAGER.queueDownload("./img/fulllive1.png");
ASSET_MANAGER.queueDownload("./img/halflive1.png");
ASSET_MANAGER.queueDownload("./img/nolive1.png");
ASSET_MANAGER.queueDownload("./img/fulllive3.png");
ASSET_MANAGER.queueDownload("./img/halflive3.png");
ASSET_MANAGER.queueDownload("./img/nolive3.png");
ASSET_MANAGER.queueDownload("./img/fulllive2.png");
ASSET_MANAGER.queueDownload("./img/halflive2.png");
ASSET_MANAGER.queueDownload("./img/nolive2.png");
ASSET_MANAGER.queueDownload("./img/multiplayer.png");
ASSET_MANAGER.queueDownload("./img/singleplayer.png");
ASSET_MANAGER.queueDownload("./img/options.png");
ASSET_MANAGER.queueDownload("./img/controls.png");
ASSET_MANAGER.queueDownload("./img/playerportrait.png");
ASSET_MANAGER.queueDownload("./img/unavailable.png");
ASSET_MANAGER.queueDownload("./img/random.png");
ASSET_MANAGER.queueDownload("./img/selectors.png");
ASSET_MANAGER.queueDownload("./img/ps4-controller-layout.png");
ASSET_MANAGER.queueDownload("./img/keyboard-layout.png");
ASSET_MANAGER.queueDownload("./img/pause-menu.png");
ASSET_MANAGER.queueDownload("./img/balls-of-fury.png");
ASSET_MANAGER.queueDownload("./img/flyingMonster.png");


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
