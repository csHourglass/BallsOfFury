/**
 * ELEVATOR STAGE!!
 *
 */

 // height and width of frame
 var width = 1920;
 var height = 1080;

// implement player for this sccene and spawn lots of dummies

function SinglePlayer(sceneManager, game, controller)    {
    this.game = game;
    this.sceneManager = sceneManager;
    this.isPlaying = true;
    this.entities = [];
    this.bgAnimation = new Animation(ASSET_MANAGER.getAsset("./img/Stage1Background.png"), 0, 0, width, height, 1, 1, true, false);

    var bg = new Background(game, this.bgAnimation);
    this.entities.push(bg);

    this.dummyCounter = 0;   // will spawn dummy when dummyCounter reaches dummyClock
    this.dummyClock = 1000;  // will get faster as the game goes on

    // var that = this;
    // players.forEach(function(element)   {
    var player = new Player(game, (1620 * Math.random()) + 150, 795, 1, controller, this);
    this.entities.push(player);
    //     that.players++;
    // });

	var dummy = new Dummy(game, (1620 * Math.random()) + 150, 200 + (650 * Math.random()), 2, this);
    this.entities.push(dummy);  // for fun purposes
    var floor = [];
    floor.push(new Animation(ASSET_MANAGER.getAsset("./img/TestPlatform.png"), 0, 0, 1920, 162, 1, 1, true, false));
    floor.push(new Animation(ASSET_MANAGER.getAsset("./img/TestPlatform.png"), 0, 0, 192, 162, 1, 1, true, false));
    var wall = [];
    wall.push(new Animation(ASSET_MANAGER.getAsset("./img/TestWall.png"), 0, 0, 48, 846, 1, 1, true, false));
    var ceiling = [];
    ceiling.push(new Animation(ASSET_MANAGER.getAsset("./img/TestCeiling.png"), 0, 0, 1920, 72, 1, 1, true, false));
    this.entities.push(new Wall(game, 0, 918, 1920, 162, floor));
    this.entities.push(new Wall(game, 21, 72, 48, 846, wall));
	this.entities.push(new Wall(game, 1851, 72, 48, 846, wall));
    this.entities.push(new Wall(game, 0, 0, 1920, 72, ceiling));

    this.entities.push(new Camera(game, 0, 0, 1920, 1080));
	var fight = new Audio("./fight.mp3");
	fight.play();
	fight.volume = .1;
    //var fakeplayer = new Player(game, 100, 795, 99, new Controller(), this);
    // fakeplayer.armorlock = true;
    // this.entities.push(fakeplayer);
    // this.entities.push(new Ball(fakeplayer.game, fakeplayer, fakeplayer.boundingBox.x - 20,
    //     fakeplayer.boundingBox.y, fakeplayer.chargingTime, 5, this));

    Scene.call(this, game, this.entities);
}

SinglePlayer.prototype = new Scene();
SinglePlayer.prototype.constructor = SinglePlayer;

SinglePlayer.prototype.update = function() {
    // if (this.game.controllers.length > this.players) {
    this.dummyCounter++;
    if (this.dummyCounter >= this.dummyClock) {
        var newDummy = new Dummy(this.game, (1620 * Math.random())+150, 200 + (650 * Math.random()), 2, this);
        this.entities.push(newDummy);
        this.dummyCounter = 0
        this.dummyClock /= 1.5;
    }
    //     this.entities.push(player);
    //     this.players++;
    // }
    Scene.prototype.update.call(this);
}

SinglePlayer.prototype.spawn = function()  {
    var coord = new Coords();
    coord.x = 100 + Math.random()*1700;
    coord.y = 795;
    return coord;
}
