function LiveMeter(game, player, x, y) {
	this.FullLiveAnimation = new Animation(ASSET_MANAGER.getAsset("./img/fulllive.png"), 0, 0, 300, 300, 1, 1, true, false);
	this.HalfLiveAnimation = new Animation(ASSET_MANAGER.getAsset("./img/halflive.png"), 0, 0, 300, 300, 1, 1, true, false);
	this.NoLiveAnimation = new Animation(ASSET_MANAGER.getAsset("./img/nolive.png"), 0, 0, 300, 300, 10, 1, true, false);
	this.FullLiveAnimation2 = new Animation(ASSET_MANAGER.getAsset("./img/fulllive1.png"), 0, 0, 300, 300, 1, 1, true, false);
	this.HalfLiveAnimation2 = new Animation(ASSET_MANAGER.getAsset("./img/halflive1.png"), 0, 0, 300, 300, 1, 1, true, false);
	this.NoLiveAnimation2 = new Animation(ASSET_MANAGER.getAsset("./img/nolive1.png"), 0, 0, 300, 300, 10, 1, true, false);
	this.FullLiveAnimation3 = new Animation(ASSET_MANAGER.getAsset("./img/fulllive2.png"), 0, 0, 300, 300, 1, 1, true, false);
	this.HalfLiveAnimation3 = new Animation(ASSET_MANAGER.getAsset("./img/halflive2.png"), 0, 0, 300, 300, 1, 1, true, false);
	this.NoLiveAnimation3 = new Animation(ASSET_MANAGER.getAsset("./img/nolive2.png"), 0, 0, 300, 300, 10, 1, true, false);
	this.FullLiveAnimation4 = new Animation(ASSET_MANAGER.getAsset("./img/fulllive3.png"), 0, 0, 300, 300, 1, 1, true, false);
	this.HalfLiveAnimation4 = new Animation(ASSET_MANAGER.getAsset("./img/halflive3.png"), 0, 0, 300, 300, 1, 1, true, false);
	this.NoLiveAnimation4 = new Animation(ASSET_MANAGER.getAsset("./img/nolive3.png"), 0, 0, 300, 300, 10, 1, true, false);
	
	this.currentstatus = 1;
	this.player = player;
	this.x = x;
	this.y = y;
	this.width = 300;
	this.height = 300;
	this.game = game;
	this.team = this.player.team;
	this.isHit = false;
	
	Entity.call(this, game, this.x, this.y, false, 0);
}

LiveMeter.prototype = new Entity();
LiveMeter.prototype.constructor = LiveMeter;

LiveMeter.prototype.update = function() {
	// for (var i = 0; i < this.otherScene.entities.length; i++) {
	// 	var ent = this.otherScene.entities[i];
	// 	if (ent.id === 4 && ent.isHit === true && ent.team === this.team) {
	// 		this.isHit = true; //not sure for the logic to trigger this 
	// 	} 
	// }
	this.currentstatus = this.player.lives;
	
	Entity.prototype.update.call(this);
}

LiveMeter.prototype.draw = function(ctx, tick) {
	if (this.currentstatus === 2) {
		if (this.team === 1) {
			this.FullLiveAnimation1.drawFrame(tick, ctx, this.x, this.y, 0.25);
		} else if (this.team === 2) {
			this.FullLiveAnimation2.drawFrame(tick, ctx, this.x, this.y, 0.25);
		} else if (this.team === 3) {
			this.FullLiveAnimation3.drawFrame(tick, ctx, this.x, this.y, 0.25);
		} else {
			this.FullLiveAnimation.drawFrame(tick, ctx, this.x, this.y, 0.25);
		}
	} else if (this.currentstatus === 1) {
		if (this.team === 1) {
			this.HalfLiveAnimation1.drawFrame(tick, ctx, this.x, this.y, 0.25);
		} else if (this.team === 2) {
			this.HalfLiveAnimation2.drawFrame(tick, ctx, this.x, this.y, 0.25);
		} else if (this.team === 3) {
			this.HalfLiveAnimation3.drawFrame(tick, ctx, this.x, this.y, 0.25);
		} else {
			this.HalfLiveAnimation.drawFrame(tick, ctx, this.x, this.y, 0.25);
		}
	} else if (this.currentstatus === 0) {
		if (this.team === 1) {
			this.NoLiveAnimation1.drawFrame(tick, ctx, this.x, this.y, 0.25);
		} else if (this.team === 2) {
			this.NoLiveAnimation2.drawFrame(tick, ctx, this.x, this.y, 0.25);
		} else if (this.team === 3) {
			this.NoLiveAnimation3.drawFrame(tick, ctx, this.x, this.y, 0.25);
		} else {
			this.NoLiveAnimation.drawFrame(tick, ctx, this.x, this.y, 0.25);
		}
	}

	Entity.prototype.draw.call(this);
}
