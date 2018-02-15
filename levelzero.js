/**
 * ELEVATOR STAGE!!
 *
 */

 // height and width of frame
 var width = 1920;
 var height = 1080;



function LevelZero(sceneManager, game)    {
    this.game = game;
    this.sceneManager = sceneManager;
    this.isPlaying = true;
    this.entities = [];
    this.bgAnimation = new Animation(ASSET_MANAGER.getAsset("./img/Stage1Background.png"), 0, 0, width, height, 1, 1, true, false);

    var bg = new Background(game, this.bgAnimation);
    this.entities.push(bg);

    this.players = 0;
    for (; this.players < this.game.controllers.length; this.players++)   {
        var player = new Player(game, (1136 * Math.random()) + 100, 795, this.players, game.controllers[this.players], this);
        this.entities.push(player);
    }

	var dummy = new Dummy(game, 1500, 772, 2, this);

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
    var fakeplayer = new Player(game, 100, 795, 99, new Controller(), this);
    fakeplayer.armorlock = true;
    this.entities.push(fakeplayer);
    this.entities.push(new Ball(fakeplayer.game, fakeplayer, fakeplayer.boundingBox.x - 20,
        fakeplayer.boundingBox.y, fakeplayer.chargingTime, 5, this));

    Scene.call(this, game, this.entities);
}

LevelZero.prototype = new Scene();
LevelZero.prototype.constructor = LevelZero;

LevelZero.prototype.update = function() {
    if (this.game.controllers.length > this.players) {
        var player = new Player(this.game, (1136 * Math.random())+100, 795, this.players, this.game.controllers[this.players], this);
        this.entities.push(player);
        this.players++;
    }
    Scene.prototype.update.call(this);
}
