/**
 * Audio screen.
 */

 //height and widht of the Frame
 var width = 1920;
 var height = 1080;

 function AudioScene(sceneManager, game) {
    this.sceneManager = sceneManager;
    this.game = game;
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

    Scene.call(this, game, this.entities);
 }

AudioScene.prototype = new Scene();
AudioScene.prototype.constructor = AudioScene;

/*
update:
    check for start button from any controllers
    send that controller as player 1 to next scenes

*/
AudioScene.prototype.update = function() {
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
