function MainMenu(sceneManager, game) {
    this.manager = sceneManager;
    this.game = game;
    this.entities = [];
    this.buttons = 3;
    this.selectedlocation = 256;
    this.selectedEntry = 0;
    this.nextScene;

    var singleplayer = new mButton(game, "./img/singleplayer.png");
    singleplayer.y = this.selectedlocation;
    singleplayer.state = 1;
    var multiplayer = new mButton(game, "./img/multiplayer.png");
    multiplayer.y = this.selectedlocation + 128;
    var options = new mButton(game, "./img/options.png");
    options.y = this.selectedlocation + 256;

    this.entities.push(singleplayer, multiplayer, options);

    Scene.call(this, this.game, this.entities);
}

MainMenu.prototype = new Scene();
MainMenu.prototype.constructor = MainMenu;

MainMenu.prototype.decrement = function()   {
    this.selectedEntry--;
    if (this.selectedEntry < 0)
        this.selectedEntry = this.entities.length-1;
}
MainMenu.prototype.increment = function()   {
    this.selectedEntry++;
    if (this.selectedEntry >= this.entities.length)
        this.selectedEntry = 0;
}
MainMenu.prototype.updateButtons = function()   {
    for (var i = 0; i < this.entities.length; i++)  {
        if (i === this.selectedEntry)
            this.entities[i].state = 1;
        else
            this.entities[i].state = 0;
    }
}

MainMenu.prototype.update = function()  {
    for (var i = 0; i < this.game.controllers.length; i++)  {
        var c = this.game.controllers[i];
        if (!c.menulocked)  {
            if (c.up)   {
                this.decrement();
                c.menulocked = true;
            }
            if (c.down) {
                this.increment();
                c.menulocked = true;
            }
        } else if (!c.up && !c.down)    {
            c.menulocked = false;
        }
        if (c.jump || c.pause)  {
            if (this.selectedEntry === 0)
                this.nextScene = undefined;
                this.game.menuMusic.volume *= .5;
                this.game.optionSelect.play();
                this.game.menuMusic.volume /= .5;
            if (this.selectedEntry === 1) {
                this.nextScene = new CharacterSelect(this.manager, this.game);
                this.game.menuMusic.volume *= .5;
                this.game.optionSelect.play();
                this.game.chooseYourCharacter.play();
                this.game.menuMusic.volume /= .5;
            }
            if (this.selectedEntry === 2)
                this.nextScene = undefined;
                this.game.menuMusic.volume *= .5;
                this.game.optionSelect.play();
                this.game.menuMusic.volume /= .5;
            i = this.game.controllers.length;
        }
    }
    this.updateButtons();
    if (this.nextScene !== undefined)    {
        this.manager.loadLevel(this.nextScene);
        this.close();
    }
    Scene.prototype.update.call(this);
}

MainMenu.prototype.draw = function(ctx)    {
    ctx.fillRect(0, 0, 1920, 1080);
    Scene.prototype.draw.call(this, ctx);
}


function mButton(game, text, scene)   {
    this.standardAnim = new Animation(ASSET_MANAGER.getAsset(text), 0, 0, 960, 128, 1, 1, true, false);
    this.highlightedAnim = new Animation(ASSET_MANAGER.getAsset(text), 128, 0, 960, 128, 1, 1, true, false);
    // this.text = ASSET_MANAGER.getAsset(text);
    this.x = 0;
    this.y = 0;
    // this.width = this.sprite.width;
    // this.height = this.sprite.height;
    this.game = game;
    this.scene = scene;
    this.state = 0;
    this.active = true;
    if (this.scene === null)    {
        this.active = false;
    }
    Entity.call(this, game, this.x, this.y, 0, 0, false, 0);
}

mButton.prototype = new Entity();
mButton.prototype.constructor = mButton;

mButton.prototype.update = function()    {
    Entity.prototype.update.call(this);
}

mButton.prototype.draw = function(ctx)   {
    if (this.state === 1)
        this.highlightedAnim.drawFrame(0, ctx, this.x, this.y);
    else
        this.standardAnim.drawFrame(0, ctx, this.x, this.y);
    Entity.prototype.draw.call(this, ctx);
}