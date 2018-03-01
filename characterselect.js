function CharacterSelect(sceneManager, game)  {
    this.manager = sceneManager;
    this.game = game;
    this.pausable = false;
    this.entities = [];
    this.menu = [];

    var defaultPlayer = new Portrait(this.game, "./img/playerportrait.png", this, this.nextX, this.nextY, 96, 128);
    var blitz = new Portrait(this.game, "./img/unavailable.png", this, this.nextX, this.nextY, 96, 128);
    blitz.active = false;
    var enigma = new Portrait(this.game, "./img/unavailable.png", this, this.nextX, this.nextY, 96, 128);
    enigma.active = false;
    var golem = new Portrait(this.game, "./img/unavailable.png", this, this.nextX, this.nextY, 96, 128);
    golem.active = false;
    var random = new Portrait(this.game, "./img/random.png", this, this.nextX, this.nextY, 200, 128);

    this.entities.push(defaultPlayer, blitz, enigma, golem, random);
    this.menu.push(defaultPlayer, blitz, enigma, golem, random);

    var corner = 0;
    for (var i = 0; i < this.game.controllers.length; i++)  {
        var c = this.game.controllers[i];
        if (c.ready) {
            this.entities.push(new Selector(this.game, "./img/selectors.png", this, c, corner, 0));
            corner++;
        }
    }

    Scene.call(this, this.game, this.entities);
}

CharacterSelect.prototype = new Scene();
CharacterSelect.prototype.constructor = CharacterSelect;

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

CharacterSelect.prototype.nextScene = function()    {
    var nextScene =  new LevelZero(this.sceneManager, this.game);
    this.scene.sceneManager.loadLevel(nextScene);
    var hud = new GameHUD(nextScene, this.game);
    this.scene.sceneManager.loadLevel(hud);
    this.scene.close();
}

CharacterSelect.prototype.update = function()  {

    Scene.prototype.update.call(this);
}

function Selector(game, img, scene, player, corner, selection)    {
    this.game = game;
    this.corner = corner;
    this.locked = false;
    this.selection = selection;
    this.player = player;
    var x = 0;
    var y = 0;
    if (this.corner === 1) {
        x = 20;
    }
    else if (this.corner === 2)    {
        y = 20;
    }
    else if (this.corner === 3)     {
        x = 20;
        y = 20;
    }
    this.anim = new Animation(ASSET_MANAGER.getAsset(img), x, y, 20, 20, 1, 1, true, false);
    this.scene = scene;

    Entity.call(this, game, this.x, this.y, 0, 0, false, 0);
}

Selector.prototype = new Entity();
Selector.prototype.constructor = Selector;

Selector.prototype.update = function()  {
    if (this.locked)    {
        if (this.player.controller.pause)   {
            this.scene.nextScene();
        }
    } else  {
        if (this.player.controller.pause || this.player.controller.jump)    {
            if (this.scene.menu[this.selection].active)
                this.locked = true;
            else    {
                //play obnoxious noise here
            }
        } else if (this.player.controller.left || this.player.controller.right)    {
            if (this.selection%2 === 0)
                this.selection++;
            else
                this.selection--;
            if (this.selection > 4)
                this.selection = 4;
        } else if (this.player.controller.up)   {
            this.selection -= 2;
            if (this.selection < 0)
                this.selection = 4;
        } else if (this.player.controller.down) {
            this.selection += 2;
            if (this.selection === 5)
                this.selection = 4;
            else if (this.selection > 5)
                this.selection = 0;
        }
    }
    var portrait = this.scene.menu[this.selection];
    if (this.corner === 0)  {
        this.x = portrait.x;
        this.y = portrait.y;
    } else if (this.corner === 1)   {
        this.x = portrait.x + portrait.width - 20;
        this.y = portrait.y;
    } else if (this.corner === 2)   {
        this.x = portrait.x;
        this.y = portrait.y + portrait.height - 20;
    } else  {
        this.x = portrait.x + portrait.width - 20;
        this.y = portrait.y + portrait.height - 20;
    }

    Entity.prototype.update.call(this);
}

Selector.prototype.draw = function(ctx) {
    this.anim.drawFrame(0, ctx, this.x, this.y);
    Entity.prototype.draw.call(this, ctx);
}

function Portrait(game, img, scene, x, y, width, height) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.anim = new Animation(ASSET_MANAGER.getAsset(img), 0, 0, width, height, 1, 1, true, false);
    this.active = true;

    Entity.call(this, game, this.x, this.y, 0, 0, false, 0);
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
