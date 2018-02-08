function SceneManager() {
    this.gameEngine = null;
}

SceneManager.prototype.constructor = SceneManager;

SceneManager.prototype.init = function (gameEngine) {
    this.gameEngine = gameEngine;
    console.log('scene manager initialized');
}

SceneManager.prototype.loadingScreen = function () {
    console.log("loading the loading screen");
    
}

SceneManager.prototype.removeLoadingScreen = function () {
    console.log("removing the loading screen");
    
}

SceneManager.prototype.levelOne = function () {
    console.log("loading level one screen");
    // var bg = new Background(gameEngine);
	// var player = new Player(gameEngine);
	var dummy = new Dummy(this.gameEngine, 800, 380, 2, ASSET_MANAGER.getAsset("./img/Training_dummy.png"));

	// gameEngine.addEntity(bg);
	// gameEngine.addEntity(player);
	//var player1 = new Player(gameEngine, 128, 700, 1, ASSET_MANAGER.getAsset("./img/player.png"));
	//var player2 = new Player (gameEngine, 800, 400, 2, ASSET_MANAGER.getAsset("./img/player.png"));
	var newLength= this.gameEngine.addEntity(new Background(this.gameEngine, ASSET_MANAGER.getAsset("./img/Stage1Background.png")));
	console.log(newLength - 1);
	this.gameEngine.addEntity(new Wall(this.gameEngine, 0, 918, 1920, 162, "./img/TestPlatform.png", 0, ASSET_MANAGER.getAsset("./img/TestPlatform.png")));
	this.gameEngine.addEntity(new Wall(this.gameEngine, 21, 72, 48, 846, "./img/TestWall.png", 0, ASSET_MANAGER.getAsset("./img/TestWall.png")));
	this.gameEngine.addEntity(new Wall(this.gameEngine, 1851, 72, 48, 846, "./img/TestWall.png", 0, ASSET_MANAGER.getAsset("./img/TestWall.png")));
	this.gameEngine.addEntity(new Wall(this.gameEngine, 0, 0, 1920, 72, "./img/TestCeiling.png", 0, ASSET_MANAGER.getAsset("./img/TestCeiling.png")));
	// gameEngine.addEntity(player1);
	this.gameEngine.addEntity(dummy);
	this.gameEngine.addEntity(new Camera(this.gameEngine, 0, 0, 1920, 1080));
	//gameEngine.addEntity(player2);
}

SceneManager.prototype.removeLevelOne = function () {
    console.log("removing level one screen");
	
	this.removeEntity();
}

SceneManager.prototype.removeEntity = function () {
	//ent.removeFromWorld = true;
	//loop over all entities in game engine
	var i;
    for (i = 0; i < this.gameEngine.entities.length; i++) {
		//remove the entity from gameEngine's entity array
		this.gameEngine.entities[i].removeFromWorld = true;
	}
	
	//loop over all players in game engine
	for (i = 0; i < this.gameEngine.players.length; i++) {
		//remove the player from gameEngine's entity array
		this.gameEngine.players[i].removeFromWorld = true;
	}
}














