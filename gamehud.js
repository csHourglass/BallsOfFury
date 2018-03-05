/**
 * This is the overlay UI of the game when you're in level zero scene to indicate the live meters for players
 */
function GameHUD(level, maxLives, game) {
	this.game = game;
	this.isPlaying = true;
	this.entities = [];
	this.level = level;
	this.maxLives = maxLives;
	
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
	if (this.level.players > this.players)	{
		//console.log("Need more life meters! # of meters = ", this.players, " | # of players = ", this.level.players);
		this.entities = [];
		this.players = 0;
		for (var i = 0; i < this.level.entities.length; i++) {
			var ent = this.level.entities[i];
			if (ent.id === 4)	{
				for (var drawn = 0, space = 0; drawn < ent.lives; drawn++, space+= 32) {
					if (this.players < 2) {
						this.entities.push(new LiveMeter(this.game, ent, (this.players % 2 * 400) + 200 + space, 985));
					} else {
						this.entities.push(new LiveMeter(this.game, ent, (this.players % 2 * 400) + 1180 + space, 985));
					}
				}
				//console.log("NUMBER OF LIVES =", ent.lives);
				this.players++;
			}
		}
	}

	for (var i = this.entities.length - 1; i >= 0; i--) {
		var ent = this.entities[i];
		if (ent.player.lives + ent.player.lostLives !== this.maxLives) {
			ent.player.lostLives += 1;
			ent.removeFromWorld = true;
		}
	}
	
	for (var i = 0; i < this.entities.length; i++)	{
		this.entities[i].update();
	}
	Scene.prototype.update.call(this);
};
