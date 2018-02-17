/**
 * This is the overlay UI of the game when you're in level zero scene to indicate the live meters for players
 */
function GameHUD(otherScene, game) {
	this.game = game;
	this.isPlaying = true;
	this.entities = [];
	this.otherScene = otherScene;
	
	this.players = 0;
	for (; this.players < game.controllers.length; this.players++)   {
        var live = new LiveMeter(game, (this.players * 100) + 10, 0, this.players, game.controllers[this.players], this, this.otherScene);
        this.entities.push(live);
    }
	
	this.entities.push(new LiveMeter(game, 0, 0, this.players, game.controllers[this.players], this, this.otherScene));
	
	Scene.call(this, game, this.entities);
}

GameHUD.prototype = new Scene();
GameHUD.prototype.constructor = GameHUD;

GameHUD.prototype.update = function() {
	if (this.game.controllers.length > this.players) {
		var live = new LiveMeter(game, (this.players * 100) + 10, 0, this.players, game.controllers[this.players], this, this.otherScene);
		this.entities.push(live);
		this.players++;
	}
	Scene.prototype.update.call(this);
};
