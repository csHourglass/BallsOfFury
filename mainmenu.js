


function MainMenu(sceneManager, game) {
    this.manager = sceneManager;
    this.game = game;
    this.entities = [];

    var singlePlayer = new Button(game, "./img/mainmenu/singleplayer.png", null);
    var multiPlayer = new Button(game, "./img/mainmenu/multiplayer.png", new playerSelectScene);
    var options = new Button(game, "./img/mainmenu/options.png", null);
    var sources = new Button(game, "./img/mainmenu/sources.png", null);

    this.entities.push(singlePlayer, multiPlayer, options, sources);


}

MainMenu.prototype = new Scene();
MainMenu.prototype.constructor = MainMenu;

MainMenu.prototype.update = function()  {

}

MainMenu.prototype.draw = function()    {

}


function Button(game, text, scene)   {
    this.sprite = new Animation(ASSET_MANAGER.getAsset("./img/mainmenu/button.png"), );
    this.text = ASSET_MANAGER.getAsset(text);
    this.x = 0;
    this.y = 0;
    this.width = this.sprite.width;
    this.height = this.sprite.height;
    this.game = game;
    this.scene = scene;
    this.state = 0;
    this.active = true;
    if (this.scene === null)    {
        this.active = false;
    }
}

Button.prototype = new Entity();
Button.prototype.constructor = Button;

Button.prototype.update = function()    {

}
Button.prototype.draw = function(ctx)   {
    ctx.drawImage(this.sprite, this.x, this.y)
}