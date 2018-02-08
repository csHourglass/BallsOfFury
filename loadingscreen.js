

function LoadingScreen(game) {
    this.background = new Animation(ASSET_MANAGER.getAsset("./img/bof.png"), 0, 0, 1920, 1080, 1, 1, true, false);
	this.multiPlayer = new Animation(ASSET_MANAGER.getAsset("./img/text.png"), 0, 0, 357, 80, 1, 1, true, false);
	this.singlePlayer = new Animation(ASSET_MANAGER.getAsset("./img/text.png"), 357, 0, 357, 80, 1, 1, true, false);
	this.settings = new Animation(ASSET_MANAGER.getAsset("./img/text.png"), 357 * 2, 0, 357, 80, 1, 1, true, false);
	this.playerOne = new Animation(ASSET_MANAGER.getAsset("./img/text.png"), 0, 80, 357, 80, 1, 1, true, false);
	this.playerTwo = new Animation(ASSET_MANAGER.getAsset("./img/text.png"), 357, 80, 357, 80, 1, 1, true, false);
	this.playerThree = new Animation(ASSET_MANAGER.getAsset("./img/text.png"), 357*2, 80, 357, 80, 1, 1, true, false);
	this.playerFour = new Animation(ASSET_MANAGER.getAsset("./img/text.png"), 0, 80*2, 357, 80, 1, 1, true, false);
	this.baller = new Animation(ASSET_MANAGER.getAsset("./img/ball.png"), 0, 0, 20, 20, .3, 4, true, false);
	this.game = game;
    Entity.call(this, game, this.x, this.y, 0, 0, false, 10);
}

LoadingScreen.prototype = new Entity();
LoadingScreen.prototype.constructor = LoadingScreen;

LoadingScreen.prototype.update = function() {
    Entity.prototype.update.call(this);
};

LoadingScreen.prototype.draw = function(ctx){
    this.background.drawFrame(this.game.clockTick, ctx, 0 , 0);
	this.singlePlayer.drawFrame(this.game.clockTick, ctx, 1920/25, 1080/2);
	this.multiPlayer.drawFrame(this.game.clockTick, ctx, 1920/25, 1080/2 + 80);
	this.settings.drawFrame(this.game.clockTick, ctx, 1920/25, 1080/2 + 80*2);
	
	this.playerOne.drawFrame(this.game.clockTick, ctx, 1920/8, 1080 - 80 * 3);
	this.playerTwo.drawFrame(this.game.clockTick, ctx, 1920/8 + 357, 1080 - 80 * 3);
	this.playerThree.drawFrame(this.game.clockTick, ctx, 1920/8 + 357*2, 1080 - 80 * 3);
	this.playerFour.drawFrame(this.game.clockTick, ctx, 1920/8 + 357*3, 1080 - 80 * 3);
	
	number = ballNearest(this.game.mousex, this.game.mousey);
	
	//single player hover
	if (number === 1) {
		this.baller.drawFrame(this.game.clockTick, ctx, (1920/25) + 357 - 60, 1080/2 + 30);
	}
	//multi player hover
	else if (number === 2) {
		this.baller.drawFrame(this.game.clockTick, ctx, (1920/25) + 357 - 60, 1080/2 + 110);
	}
	//settings hover
	else if (number === 3) {
		this.baller.drawFrame(this.game.clockTick, ctx, (1920/25) + 357-150, 1080/2 + 190);
	}
	//player one hover
	else if (number === 4) {
		this.baller.drawFrame(this.game.clockTick, ctx, 1920/8, (1080 - 80 * 3) + 30);
	}
	//player two hover
	else if (number === 5) {
		this.baller.drawFrame(this.game.clockTick, ctx, 1920/8 + 357, (1080 - 80 * 3) + 30);
	}
	//player three hover
	else if (number === 6) {
		this.baller.drawFrame(this.game.clockTick, ctx, 1920/8 + 357*2, (1080 - 80 * 3) + 30);
	}
	//player four hover
	else if (number === 7) {
		this.baller.drawFrame(this.game.clockTick, ctx, 1920/8 + 357*3, (1080 - 80 * 3) + 30);
	}
	
    Entity.prototype.draw.call(this);
};

function ballNearest(x, y) {
	if (x > (1920/25) && x < (1920/25) + 357) {
		if (y > (1080/2) && y < (1080/2) + 80) {
			return 1;
		}
		else if (y > (1080/2) + 80 && y < (1080/2) + 80*2) {
			return 2;
		}
		else if (y > (1080/2) + 80*2 && y < (1080/2) + 80*3) {
			return 3;
		}
	}
	if (x > (1920/8) && x < (1920/8) + 357*4) {
		if (y > 1080 - 80*3 && y < (1080 - 80*3) + 80) {
			if (x > (1920/8) && x < (1920/8) + 357*1) {
				return 4;
			}
			else if (x > (1920/8) + 357*1 && x < (1920/8) + 357*2) {
				return 5;
			}
			else if (x > (1920/8) + 357*2 && x < (1920/8) + 357*3) {
				return 6;
			}
			else if (x > (1920/8) + 357*3 && x < (1920/8) + 357*4) {
				return 7;
			}
		}
	}
	else {
		return 0;
	}
}