/*
 * This scene will be where players can join the game,
 * select their player and team.
 */

 //height and widht of the frame
 var width = 1920;
 var height = 1080;

function CharacterSelect(sceneManager, game) {
    this.sceneManager = sceneManager;
    this.game = game;
    this.entities = [];
    this.buttons = [];
    this.players = [];
    this.playersReady = 0;
    this.pausable = false;
    this.controllersActive = 0;
    this.bgAnimation = new Animation(ASSET_MANAGER.getAsset("./img/playerselect.png"), 0, 0, width, height, 1, 1, true, false);
    this.entities.push(new Background(game, this.bgAnimation));
    this.menu = [];

    var defaultPlayer = new Portrait(this.game, "./img/playerportrait.png", this, this.nextX(), this.nextY(), 96, 128);
    var blitz = new Portrait(this.game, "./img/unavailable.png", this, this.nextX(), this.nextY(), 96, 128);
    blitz.active = false;
    var enigma = new Portrait(this.game, "./img/unavailable.png", this, this.nextX(), this.nextY(), 96, 128);
    enigma.active = false;
    var golem = new Portrait(this.game, "./img/unavailable.png", this, this.nextX(), this.nextY(), 96, 128);
    golem.active = false;
    var random = new Portrait(this.game, "./img/random.png", this, this.nextX(), this.nextY(), 200, 128);

    this.entities.push(defaultPlayer, blitz, enigma, golem, random);
    this.menu.push(defaultPlayer, blitz, enigma, golem, random);

    this.buttons.push(new Button(0, this, this.game, 100, 100, "white"));                // Top Left
    this.buttons.push(new Button(1, this, this.game, 100, height - 50, "white"));        // Bottom Left
    this.buttons.push(new Button(2, this, this.game, width - 500, 100, "white"));        // Top Right
    this.buttons.push(new Button(3, this, this.game, width -500, height - 50, "white")); // Bottom Right

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

CharacterSelect.prototype = new Scene();
CharacterSelect.prototype.contructor = CharacterSelect;
CharacterSelect.prototype.nextX = function()    {
    if (this.x === undefined || this.x === (1920/2 + 4))   {
        this.x = (1920/2 -100);
    } else  {
        this.x = (1920/2 + 4);
    }
    return this.x;
}
CharacterSelect.prototype.nextY = function()    {
    if (this.y === undefined)
        this.y = 128;
    else if (this.x === (1920/2 - 100)) {
        this.y += 128 + 8;
    }
    return this.y;
}

CharacterSelect.prototype.readyPlayer = function(player)  {
    if (this.menu[player.character].active) {
        var found = false;
        this.players.forEach(function(element)  {
            if (element.controller === player.controller)   {
                element = player;
                found = true;
            }
        });
        if (!found) this.players.push(player);
        return true;
    } else  {
        return false;
    }
}

CharacterSelect.prototype.update = function() {
    // if (this.players >= 1) {
    //     for (var i = 0; i < this.buttons.length; i++) {
    //         if (this.game.controllers[this.buttons[i].ID])
    //     }
    // }
    var that = this;
    if (this.controllersActive < 4) {
        this.game.controllers.forEach(function(element) {
            if (element.jump && !element.ready) {
                element.ready = true;
                console.log(that.controllersActive);
                that.buttons[that.controllersActive].activate(that.controllersActive, element);
                that.controllersActive++;
            }
        });
    }
    if (this.ready) {
        // var nextScene = new CharacterSelect(this.scene.sceneManager, this.game);
        // this.scene.sceneManager.loadLevel(nextScene);
        var nextScene =  new LevelZero(this.sceneManager, this.game, this.players);
        this.game.characterSelect.volume = 0.5;
        this.game.characterSelect.play();
        this.game.menuMusic.pause();
        this.game.bgMusic.volume = 0.5;
        this.game.bgMusic.play();
        this.sceneManager.loadLevel(nextScene);
        var hud = new GameHUD(nextScene, this.game);
        this.sceneManager.loadLevel(hud);
        this.close();
    }


    Scene.prototype.update.call(this);
}

CharacterSelect.prototype.draw = function(ctx) {

    Scene.prototype.draw.call(this, ctx);
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
    this.team;
    this.activated = false;
    this.locked = true;
    this.done = false;
    Entity.call(this, game, x, y);
}

Button.prototype.ready = function()  {
    var player = new ReadyPlayer(this.team, this.controller, this.selector.selection);
    if (this.scene.readyPlayer(player)) {
        this.text = "READY";
        this.done = true;
    } else  {
        console.log("Cannot select that character!");
    }
    
}

Button.prototype.activate = function(team, controller) {
    //this.playerNum = playerNum;
    this.team = team;
    this.controller = controller;
    if (team === 0)
        this.color = "red";
    else if (team === 1)
        this.color = "blue";
    else if (team === 2)
        this.color = "green";
    else if (team === 3)
        this.color = "yellow";
    else
        this.color = "white";
    this.text = "Select your fighter!";
    // this.scene.playersReady++;
    this.activated = true;
    this.selector = new Selector(this.game, "./img/selectors.png", this.scene, this.controller, this.team, 0);
    this.scene.addEntity(this.selector);
}


// not implemented
Button.prototype.deActivate = function() {
    //this.playerNum = null;
    this.color = "red";
    this.text = "Press A to join";
    this.activated = false;
}

Button.prototype.update = function() {
    if (this.done && !this.locked && this.controller.pause) {
        console.log("Starting...");
        this.locked = true;
        this.scene.ready = true;
    }
    else if (this.activated) {
        //console.log(this.controller);
        if (!this.locked && (this.controller.jump || this.controller.pause))   {
            this.locked = true;
            this.ready();
        }
        if (!this.controller.jump && !this.controller.pause)  this.locked = false;
    }
    // if (this.activated) {
    //     if (this.selector.ready)    {

    //     }
    // }
    // if (this.game.controllers.length > this.ID) {
    //     if (this.game.controllers[this.ID].jump === true) {
    //         //console.log("jump=" + this.game.controllers[this.ID].jump);
    //         this.activate();
    //         this.game.controllers[this.ID].ready = true;
    //         console.log("ACTIVATE");
    //     }
    //     if (this.game.controllers[this.ID].ready && this.game.controllers[this.ID].pause) {
    //         this.game.controllers[this.ID].pause = false;

    //     }
    // }
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

function ReadyPlayer(team, controller, character)  {
    this.team = team;
    this.controller = controller;
    this.character = character;
}
ReadyPlayer.prototype.constructor = ReadyPlayer;


function Selector(game, img, scene, controller, corner, selection)    {
    this.game = game;
    this.corner = corner;
    this.locked = false;
    this.selection = selection;
    this.controller = controller;
    this.pauselock = true;
    this.movelock = true;
    var x = 0;
    var y = 0;
    if (this.corner%2 === 1) {
        x = 20;
    }
    if (this.corner > 1)    {
        y = 20;
    }
    this.anim = new Animation(ASSET_MANAGER.getAsset(img), x, y, 20, 20, 1, 1, true, false);
    this.scene = scene;

    Entity.call(this, game, this.x, this.y, false, 0);
}

Selector.prototype = new Entity();
Selector.prototype.constructor = Selector;

Selector.prototype.update = function()  {
    if (this.locked)    {
        // if (!this.pauselock && this.controller.pause)   {
        //     this.scene.nextScene();
        // }
    } else  {
        if (!this.pauselock && (this.controller.pause || this.controller.jump))    {
            this.pauselock = true;
            if (this.scene.menu[this.selection].active)
                this.locked = true;
            else    {
                //play obnoxious noise here
            }
        } else if (!this.movelock)  {
            if (this.controller.left || this.controller.right)    {
                this.movelock = true;
                if (this.selection%2 === 0)
                    this.selection++;
                else
                    this.selection--;
                if (this.selection > 4)
                    this.selection = 4;
            } else if (this.controller.up)   {
                this.movelock = true;
                this.selection -= 2;
                if (this.selection < 0)
                    this.selection = 4;
            } else if (this.controller.down) {
                this.movelock = true;
                this.selection += 2;
                if (this.selection === 5)
                    this.selection = 4;
                else if (this.selection > 5)
                    this.selection = 0;
            }
        }
    }
    if (!this.controller.pause) this.pauselock = false;
    if (!this.controller.left && !this.controller.right && !this.controller.up && !this.controller.down)
        this.movelock = false;
    var portrait = this.scene.menu[this.selection];
    if (this.corner === 0)  {
        this.x = portrait.x;
        this.y = portrait.y;
    } else if (this.corner === 1)   {
        this.x = portrait.x + portrait.width - 40;
        this.y = portrait.y;
    } else if (this.corner === 2)   {
        this.x = portrait.x;
        this.y = portrait.y + portrait.height - 40;
    } else  {
        this.x = portrait.x + portrait.width - 40;
        this.y = portrait.y + portrait.height - 40;
    }

    Entity.prototype.update.call(this);
}

Selector.prototype.draw = function(ctx) {
    this.anim.drawFrame(0, ctx, this.x, this.y, 2);
    Entity.prototype.draw.call(this, ctx);
}

function Portrait(game, img, scene, x, y, width, height) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.anim = new Animation(ASSET_MANAGER.getAsset(img), 0, 0, width, height, 1, 1, true, false);
    this.active = true;

    Entity.call(this, game, this.x, this.y, false, 0);
}

Portrait.prototype = new Entity();
Portrait.prototype.constructor = Portrait;

Portrait.prototype.update = function()  {
    Entity.prototype.update.call(this);
}

Portrait.prototype.draw = function(ctx) {
    this.anim.drawFrame(0, ctx, this.x, this.y);
    Entity.prototype.draw.call(this, ctx);
}