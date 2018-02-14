/**
 * ELEVATOR STAGE!!
 * 
 */
function LevelZero(game)    {
    this.game = game;
    this.isPlaying = true;
    this.entities = [];
    var bg = new Background(game);
    this.entities.push(bg);
    this.players = 0;
    for (; this.players < game.controllers.length; this.players++)   {
        var player = new Player(game, (1136 * Math.random()), 400, this.players, game.controllers[this.players], this);
        this.entities.push(player);
    }
    

	var dummy = new Dummy(game, 800, 380, 2, this);
    

    var floor = [];
    floor.push(new Animation(ASSET_MANAGER.getAsset("./img/TestPlatform.png"), 0, 0, 1920, 162, 1, 1, true, false));
    var wall = [];
    wall.push(new Animation(ASSET_MANAGER.getAsset("./img/TestWall.png"), 0, 0, 48, 846, 1, 1, true, false));
    var ceiling = [];
    ceiling.push(new Animation(ASSET_MANAGER.getAsset("./img/TestCeiling.png"), 0, 0, 1920, 72, 1, 1, true, false));
    this.entities.push(new Wall(game, 0, 918, 1920, 162, floor));
    this.entities.push(new Wall(game, 21, 72, 48, 846, wall));
	this.entities.push(new Wall(game, 1851, 72, 48, 846, wall));
    this.entities.push(new Wall(game, 0, 0, 1920, 72, ceiling));
    this.entities.push(dummy);
    this.entities.push(new Camera(game, 0, 0, 1920, 1080));

    Scene.call(this, game, this.entities);
}

LevelZero.prototype = new Scene();
LevelZero.prototype.constructor = LevelZero;

LevelZero.prototype.update = function() {
    if (this.game.controllers.length > this.players) {
        var player = new Player(this.game, (1136 * Math.random()), 400, this.players, this.game.controllers[this.players], this);
        this.entities.push(player);
        this.players++;
    }
    Scene.prototype.update.call(this);
}