function LiveMeter(game, x, y, team, controller, scene, otherScene) {
	this.FirstLiveAnimation = new Animation(ASSET_MANAGER.getAsset("./img/heart.png"), 0, 0, 300, 300, 1, 1, true, false);
	this.SecondLiveAnimation = new Animation(ASSET_MANAGER.getAsset("./img/heart.png"), 0, 0, 300, 300, 1, 1, true, false);
	this.ThirdLiveAnimation = new Animation(ASSET_MANAGER.getAsset("./img/heart.png"), 0, 0, 300, 300, 1, 1, true, false);
	
	//this.TwoLivesAnimation = new Animation(ASSET_MANAGER.getAsset("./img/heart.png"), 300, 0, 300, 300, 1, 1, true, false);
	
	this.isFull = true;
	this.isHalf = false;
	this.isDead = false;
	
	this.x = 100;
	this.y = 100;
	this.width = 300;
	this.height = 300;
	
	this.team = team;
	this.isHit = false;
	this.scene = scene;
	this.otherScene = otherScene;
	
	Entity.call(this, game, this.x, this.y, false, 0);
}

LiveMeter.prototype = new Entity();
LiveMeter.prototype.constructor = LiveMeter;

LiveMeter.prototype.update = function() {
	for (var i = 0; i < this.otherScene.entities.length; i++) {
		var ent = this.otherScene.entities[i];
		if (ent.id === 4 && ent.isHit === true && ent.team === this.team) {
			this.isHit = true; //not sure for the logic to trigger this 
		} 
	}
	
	Entity.prototype.update.call(this);
}

LiveMeter.prototype.draw = function(ctx, tick) {
	if (!(this.isHit) && this.isFull) {
		this.FirstLiveAnimation.drawFrame(tick, ctx, this.x, this.y, 0.5);
		this.SecondLiveAnimation.drawFrame(tick, ctx, this.x + 150, this.y, 0.5);
		this.ThirdLiveAnimation.drawFrame(tick, ctx, this.x + 300, this.y, 0.5);
	} else if (this.isHit && this.isFull) {
		this.ThirdLiveAnimation.drawFrame(tick, ctx, this.x + 600, this.y, 0.5);
		//this.ThirdLiveAnimation.frames = 60;
		this.isHit = false;
		this.isFull = false;
		this.isHalf = true;
	} else if (this.isHit && this.isHalf) {
		this.ThirdLiveAnimation.drawFrame(tick, ctx, this.x, this.y, 0.5);
		this.isHit = false;
		this.isDead = true;
		this.isHalf = false;
		this.isFull = false;
	}
	Entity.prototype.draw.call(this);
}
