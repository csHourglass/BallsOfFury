/**
 * Button is an Entity that functions as a clickable object.
 * 
 * @param game : The game engine
 * @param x : The starting x coordinate (left side)
 * @param y : The starting y coordinate (top side)
 * @param width : The width of the button
 * @param height : The height of the button
 * @param animations : An array containing 3 animations for the button
 */
function Button(game, x, y, width, height, animations)	{

	// Getting animations
	if (animations.length < 3) //Incoming crash!! (TODO: handle these issues)
		console.error("WARNING: Button entity created without needed animations!");

	this.idleAnim = animations[0];
	this.clickedAnim = animations[1];
	this.hoveredAnim = animations[2];

	// Setting attributes
	this.game = game;
	this.x = x;
	this.y = y;
	this.clicked = false;
	this.hovered = false;

	Entity.call(this, game, this.x, this.y, 0, 0, false, 0);
}

// Inheriting Entity
Button.prototype = new Entity();
Button.prototype.constructor = Button;

/**
 * The update() function doesn't do anything currently.
 * TODO: Change the clicked and hovered booleans when
 * the mouse hovers and clicks the button.
 */
Button.prototype.update = function()	{
	Entity.prototype.update.call(this);
}

/**
 * draw() draws the correct button animation based on the values
 * of the clicked and hovered booleans.
 * @param {*} ctx : The context.
 */
Button.prototype.draw = function(ctx)	{
	//If the button is being clicked...
	if (this.clicked = true)
		this.clickedAnim.drawFrame(this.game.clockTick, ctx, this.x, this.y);
	//If the button is being hovered over...
	else if (this.hovered = true)
		this.hoveredAnim.drawFrame(this.game.clockTick, ctx, this.x, this.y);
	//Else draw idle animation.
	else
		this.idleAnim.drawFrame(this.game.clockTick, ctx, this.x, this.y);
	Entity.prototype.draw.call(this);
}