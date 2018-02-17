/*
 * This scene will be where players can join the game,
 * select their player and team.
 */

 //height and widht of the frame
 var width = 1920;
 var height = 1080;

function PlayerSelectScene(sceneManager, game) {
    this.sceneManager = sceneManager;
    this.game = game;
    this.entities = [];
    this.buttons = [];
    this.playersReady = 0;
    this.bgAnimation = new Animation(ASSET_MANAGER.getAsset("./img/playerselect.png"), 0, 0, width, height, 1, 1, true, false);
    this.entities.push(new Background(game, this.bgAnimation));

    this.buttons.push(new Button(0, this, this.game, 100, 100, "red"));                // Top Left
    this.buttons.push(new Button(1, this, this.game, 100, height - 50, "red"));        // Bottom Left
    this.buttons.push(new Button(2, this, this.game, width - 500, 100, "red"));        // Top Right
    this.buttons.push(new Button(3, this, this.game, width -500, height - 50, "red")); // Bottom Right

    this.ReadyButton = new Button(4, this, this.game, width/2, height/2, "yellow");  // sends players into game

    this.buttons.push(this.ReadyButton);

    for(var i = 0; i < this.buttons.length; i++){
        this.entities.push(this.buttons[i]);
    }
    //
    // for(var i = 0; i < this.buttons.length; i++) {
    //     console.log(this.buttons[i]);
    // }

    Scene.call(this, this.game, this.entities);
}

PlayerSelectScene.prototype = new Scene();
PlayerSelectScene.prototype.contructor = PlayerSelectScene;

PlayerSelectScene.prototype.update = function() {
    // if (this.players >= 1) {
    //     for (var i = 0; i < this.buttons.length; i++) {
    //         if (this.game.controllers[this.buttons[i].ID])
    //     }
    // }


    Scene.prototype.update.call(this);
}





/*
 * Buttons to indicate players joined and teams assigned to Player
 */
function Button(ID, scene, game, x, y, color) {
    this.ID = ID;
    this.text = "Press A to join";
    this.color = color;
    this.game = game;
    this.scene = scene;
    this.ctx = this.game.ctx;
    this.x = x;
    this.y = y;
    this.activated = false;
    Entity.call(this, game, x, y);
}

Button.prototype.activate = function() {
    //this.playerNum = playerNum;
    this.color = 'green';
    this.text = "Ready!";
    this.scene.playersReady++;
    this.activated = true;
}


// not implemented
Button.prototype.deActivate = function() {
    //this.playerNum = null;
    this.color = "red";
    this.text = "Press A to join";
    this.activated = false;
}

Button.prototype.update = function() {

    if (this.game.controllers.length > this.ID) {
        if (this.game.controllers[this.ID].jump === true) {
            //console.log("jump=" + this.game.controllers[this.ID].jump);
            this.activate();
            this.game.controllers[this.ID].ready = true;
            console.log("ACTIVATE");
        }
        if (this.game.controllers[this.ID].ready && this.game.controllers[this.ID].pause) {
            this.game.controllers[this.ID].pause = false;
            var nextScene =  new LevelZero(this.sceneManager, this.game);
            this.scene.sceneManager.loadLevel(nextScene);
            this.scene.close();
        }
    }
    //Scene.prototype.update.call(this);

}

Button.prototype.draw = function(ctx) {
    if (this.ID < 4) {
        ctx.font = "50pt Impact";
        ctx.fillStyle = this.color;
        ctx.fillText(this.text, this.x, this.y);
    }
    if (this.ID == 4 && this.scene.playersReady >= 1) {
        //console.log("anything");
        ctx.font = "50 Impact";
        ctx.fillStyle = this.color;
        ctx.fillText("GO!", 500, 500);

        //wait for an active controller to press start
        //Entity.prototype.draw.call(this);
    }
    Entity.prototype.draw.call(this);
}
