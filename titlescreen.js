/**
 * Title screen.
 * controller to press start will be player1 on character screen
 */

 //height and widht of the Frame
 var width = 1920;
 var height = 1080;

 function TitleScreen(sceneManager, game) {
    this.sceneManager = sceneManager;
    this.game = game;
    this.isPlaying = true;
    this.entities = [];
    this.bgAnimation = new Animation(ASSET_MANAGER.getAsset("./img/animbg.png"), 0, 0, width, height, .25, 8, true, false);
	this.titleAnimation = new Animation(ASSET_MANAGER.getAsset("./img/balls-of-fury.png"), 0, 0, width, height, 1, 1, true, false);
    this.loadAnimation = new Animation(ASSET_MANAGER.getAsset("./img/load.png"), 0, 0, 256, 256, .15, 8, true, false);
    this.startAnimation = new Animation(ASSET_MANAGER.getAsset("./img/pressstart.png"), 0, 0, 828, 822, .75, 4, true, false);

    var load = new Background(game, this.loadAnimation, width/2-256/2, height/2 + 200);
    this.entities.push(new Background(game, this.bgAnimation, 0, 0));
	this.entities.push(new Background(game, this.titleAnimation, 0, 0));
    this.entities.push(load);
    this.entities.push(new Camera(game, 0, 0, width, height));
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
    ASSET_MANAGER.queueDownload("./img/pointers.png");
    ASSET_MANAGER.queueDownload("./img/flyingMonster.png");
    ASSET_MANAGER.queueDownload("./img/pointers.png");
    ASSET_MANAGER.queueDownload("./img/itemindicator.png");
    ASSET_MANAGER.queueDownload("./img/flyingMonster.png");
    ASSET_MANAGER.queueDownload("./img/charge.png");
    ASSET_MANAGER.queueDownload("./img/shield.png");
    game.startInput();
    load.removeFromWorld = true;
    this.entities.push(new Background(game, this.startAnimation, width/2 - 828/2, height/4));

ASSET_MANAGER.downloadAll(function () {
    console.log("Powering up!");
});
     Scene.call(this, game, this.entities);
 }

TitleScreen.prototype = new Scene();
TitleScreen.prototype.constructor = TitleScreen;

/*
update:
    check for start button from any controllers
    send that controller as player 1 to next scenes

*/
TitleScreen.prototype.update = function() {
    // decouple this
    for (var i = 0; i < this.game.controllers.length; i++) {
        if (this.game.controllers[i].pause === true || this.game.controllers[i].jump === true) {
            this.game.controllers[i].pause = false;
            this.game.controllers[i].jump = false;
            this.isPlaying = false;
            // i = the controller that pressed start
            // pass controller as player1 to next scene
            var nextScene = new MainMenu(this.sceneManager, this.game);
            //var nextScene = new LevelZero(this.sceneManager, this.game);
            this.game.optionSelect.play();
            this.game.menuMusic.volume = .25;
            this.game.menuMusic.play();
            this.sceneManager.loadLevel(nextScene);
            // remove this scene now
            this.close();

        }
    }
    Scene.prototype.update.call(this);
}
