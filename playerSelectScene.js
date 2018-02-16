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

    this.buttons.push(new Button(0, this, this.game, 100, 100));                // Top Left
    this.buttons.push(new Button(1, this, this.game, 100, height - 50));        // Bottom Left
    this.buttons.push(new Button(2, this, this.game, width - 500, 100));        // Top Right
    this.buttons.push(new Button(3, this, this.game, width -500, height - 50)); // Bottom Right

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

            //this.playersReady++;
        // } else if (this.game.controllers[i].pause == false){
        //     this.bdeActivate();
        //     console.log("DeActivate")

    Scene.prototype.update.call(this);
}


/*
 * Buttons to indicate players joined and teams assigned to Player
 */
function Button(ID, scene, game, x, y) {
    this.ID = ID;
    this.text = "Press start";
    this.color = "red";
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

Button.prototype.deActivate = function() {
    //this.playerNum = null;
    this.color = "red";
    this.text = "Press Start";
    this.scene.playersReady--;
    this.activated = false;
}

Button.prototype.update = function() {
    // for (var i = 0; i < this.game.controllers.length; i++) {
    //     if (this.game.controllers[i].pause == true) {
    //         this.scene.buttons[i].activate();
    //         console.log("ACTIVATE!");
    //     }
    // }
    if (this.game.controllers.length > this.ID) {
        if (this.game.controllers[this.ID].pause === true) {
            this.activate();
            console.log("ACTIVATE");
        }
    }
}

Button.prototype.draw = function(ctx) {
    ctx.font = "50pt Impact";
    ctx.fillStyle = this.color;
    ctx.fillText(this.text, this.x, this.y);

    Entity.prototype.draw.call(this);
}
