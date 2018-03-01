/**
 * Control screen.
 * display the functionality of each button on the controller
 */

 //height and widht of the Frame
 var width = 1920;
 var height = 1080;

 function ControlScreen(sceneManager, game) {
     this.sceneManager = sceneManager;
     this.game = game;
     this.isPlaying = true;
     this.entities = [];
     this.kbAnimation = new Animation(ASSET_MANAGER.getAsset("./img/keyboard-layout.png"), 0, 0, width, height, 1, 1, true, false);
	 this.controlAnimation = new Animation(ASSET_MANAGER.getAsset("./img/ps4-controller-layout.png"), 0, 0, width, height, 1, 1, true, false);
     this.entities.push(new Background(game, this.kbAnimation));
	 this.entities.push(new Background(game, this.controlAnimation));
     this.entities.push(new Camera(game, 0, 0, width, height));
     Scene.call(this, game, this.entities);


 }

ControlScreen.prototype = new Scene();
ControlScreen.prototype.constructor = ControlScreen;

/*
update:
    check for start button from any controllers
    send that controller as player 1 to next scenes

*/
ControlScreen.prototype.update = function() {
    // decouple this
    for (var i = 0; i < this.game.controllers.length; i++) {
        if (this.game.controllers[i].pause === true) {
            this.game.controllers[i].pause = false;
            this.isPlaying = false;
            // i = the controller that pressed start
            // pass controller as player1 to next scene
            var nextScene = new MainMenu(this.sceneManager, this.game);
            //var nextScene = new LevelZero(this.sceneManager, this.game);
            this.game.menuMusic.volume = .25;
            this.game.menuMusic.play();

            this.sceneManager.loadLevel(nextScene);
            // remove this scene now
            this.close();

        } else if (this.game.controllers[i].right === true) {
			this.game.controller[i].right = false;
			this.entities.removeFromWorld = true;
		} else if (this.game.controllers[i].left === true) {
			this.game.controller[i].left = false;
			this.entities.push(new Background(game, this.controlAnimation));
		}
    }
    Scene.prototype.update.call(this);
}
