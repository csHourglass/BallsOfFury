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
		for (var i = 0; i < this.level.entities.length; i++) {
			var ent = this.level.entities[i];
			if (ent.id === 4)	{
				for (var drawn = 0, space = 0; drawn < ent.lives; drawn++, space+= 32) {
					if (this.players < 2) {
						this.entities.push(new LiveMeter(this.game, ent, (this.players % 2 * 200) + 130 + space, 985));
					} else {
						this.entities.push(new LiveMeter(this.game, ent, (this.players % 2 * 200) + 130 + space, 985 + 40));
					}
				}
				console.log("NUMBER OF LIVES =", ent.lives);
				this.players++;
			}
		}
	}
	/* for (var i = 0; i < this.level.entities.length; i++) {
		var ent = this.level.entities[i];
		if (ent.lives < this.maxLives) {
			count = this.maxLives - ent.lives;
			if (ent.id === 4) {
				for (var j = 0; j < this.entities.length; j++) {
					if (count === 0) {
						break;
					}
					if (this.entities[j].team === ent.team && count !== 0) {
						this.entities[j].removeFromWorld = true;
						count--;
						//this.entities.slice(j, 1);
						console.log("NUMBER OF ENTITIES LEFT =", this.entities.length);
					}
				}
			}
		}
		
	} */
	
	for (var i = this.entities.length - 1; i >= 0; i--) {
		var ent = this.entities[i];
		if (ent.player.lives + ent.player.lostLives !== this.maxLives) {
			ent.player.lostLives += 1;
			ent.removeFromWorld = true;
		}
		/* if (count > ent.player.lives) {
			ent.removeFromWorld = true;
			count--;
		}
		if (count === 0) count = this.maxLives; */
		//if (count === 0 && ent.player.team !== this.entities[i+1].player.team) removed = 0;

		//console.log("NUMBER OF ENTITIES LEFT =", this.entities.length);


	
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
