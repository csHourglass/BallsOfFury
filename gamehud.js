/**
 * This is the overlay UI of the game when you're in level zero scene to indicate the live meters for players
 */
function GameHUD(level, game) {
	this.game = game;
	this.isPlaying = true;
	this.entities = [];
	this.level = level;
	
	this.players = 0;
	// for (; this.players < game.controllers.length; this.players++)   {
    //     var live = new LiveMeter(this.game, (this.players * 200) + 100, 100, this.players, this.game.controllers[this.players], this, this.otherScene, 1);

	// 	this.entities.push(live);
	// }

	
	
	//this.entities.push(new LiveMeter(game, 0, 0, this.players, game.controllers[this.players], this, this.otherScene));
	
	Scene.call(this, game, this.entities);
}

GameHUD.prototype = new Scene();
GameHUD.prototype.constructor = GameHUD;

GameHUD.prototype.update = function() {
	// if (this.game.controllers.length > this.players) {
	// 	var live = new LiveMeter(this.game, (this.players * 200) + 100, 100, this.players, this.game.controllers[this.players], this, this.otherScene, 2);
	// 	this.entities.push(live);
	// 	this.players++;
	// }
	// for (var i = 0; i < this.entities.length; i++) {
	// 	if (this.entities[i].isHit === true) {
	// 		if (this.entities[i].currentstatus < 3) {
	// 			this.entities[i].currentstatus += 1;
	// 			var live = new LiveMeter(this.game, this.entities[i].x, 100, this.entities[i].team, this.game.controllers[this.entities[i].team], this, this.otherScene, this.entities[i].currentstatus);
	// 			this.entities.push(live);
			
	// 			this.entities[i].removeFromWorld = true;
	// 		}
	// 	}
	// 	break;
	// }
	if (this.level.players > this.players)	{
		console.log("Need more life meters! # of meters = ", this.players, " | # of players = ", this.level.players);
		this.entities = [];
		this.players = 0;
		for (var i = 0; i < this.level.entities.length; i++)	{
			var ent = this.level.entities[i];
			if (ent.id === 4)	{
				this.entities.push(new LiveMeter(this.game, ent, (this.players * 200) + 100, 100));
				this.players++;
			}
		}
	}
	for (var i = 0; i < this.entities.length; i++)	{
		this.entities[i].update();
	}
	/* for (var i = 0; i < this.otherScene.entities.length; i++) {
		var ent = this.otherScene.entities[i];
		if (ent.id === 4 && ent.isHit === true) {
			this.isHit = true; //not sure for the logic to trigger this 
		} 
	} */
	Scene.prototype.update.call(this);
};
