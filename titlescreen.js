/**
 * Title screen.
 * controller to press start will be player1 on character screen
 */

 //height and widht of drawFrame
 var width = 1920;
 var height = 1080;

 function TitleScreen(game) {
     this.game = game;
     this.isPlaying = true;
     this.entities = [];
     this.bgAnimation = new Animation(ASSET_MANAGER.getAsset("./img/titlebg.png"), 0, 0, width, height, 1, 1, true, false);
     this.entities.push(new Background(game, this.bgAnimation));
     this.entities.push(new Camera(game, 0, 0, width, height));
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
    // find a way to decouple this
    for (var i = 0; i < this.game.controllers.length; i++) {
        if (this.game.controllers[i].pause == true) {
            // i = the controller that pressed start
            // pass controller as player1 to next scene
            var nextScene = new LevelZero(this.game);
            // remove this scene now

        }
    }
    Scene.prototype.update.call(this);
}
