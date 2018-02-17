function LiveMeter(game, x, y, team, controller, scene, otherScene, currentstatus) {
	this.FullLiveAnimation = new Animation(ASSET_MANAGER.getAsset("./img/fulllive.png"), 0, 0, 300, 300, 1, 1, true, false);
	this.HalfLiveAnimation = new Animation(ASSET_MANAGER.getAsset("./img/halflive.png"), 0, 0, 300, 300, 1, 1, true, false);
	this.NoLiveAnimation = new Animation(ASSET_MANAGER.getAsset("./img/nolive.png"), 0, 0, 300, 300, 10, 1, true, false);
	
	this.currentstatus = currentstatus;
	this.x = x;
	this.y = y;
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
	if (this.currentstatus === 1) {
		this.FullLiveAnimation.drawFrame(tick, ctx, this.x, this.y, 0.5);
	} else if (this.currentstatus === 2) {
		this.HalfLiveAnimation.drawFrame(tick, ctx, this.x, this.y, 0.5);
	} else if (this.currentstatus === 3) {
		this.NoLiveAnimation.drawFrame(tick, ctx, this.x, this.y, 0.5);
	}

	Entity.prototype.draw.call(this);
}
