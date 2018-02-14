/**
 * The SceneManager object stores all the currently running
 * scenes in the game.
 */
function SceneManager() {
	this.gameEngine = null;
	this.scenes = [];
	this.scene = 0;
	this.clickedWhereX = null;
	this.clickedWhereY = null;
}

SceneManager.prototype.constructor = SceneManager;

/**
 * Scene Manager initialization function.
 * @param {*} gameEngine : The game engine.
 */
SceneManager.prototype.init = function (gameEngine) {
	this.gameEngine = gameEngine;
	this.scenes.push(new LevelZero(gameEngine));
	console.log('Scene Manager Initialized!');
}

/**
 * play() calls each scene's update() functions, then
 * their draw() functions.
 * @param {*} ctx : The context.  Needed to draw the entities.
 */
SceneManager.prototype.play = function (ctx)	{
	// Updating each scene.
	for (var i = 0; i < this.scenes.length; i++)	{
		this.scenes[i].update();
	}
	
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	ctx.save();
	// Drawing each entity.
	for (var i = 0; i < this.scenes.length; i++)	{
		this.scenes[i].draw(ctx);
	}
	ctx.restore();
}










