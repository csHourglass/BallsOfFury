/**
 * The Scene class handles a set of entities that will
 * appear on the canvas.
 * @param {*} game : The game engine.  Needed for clock ticks.
 * @param {*} entities : An array of entities.
 */
function Scene(game, entities)    {
    this.game = game;
    this.entities = entities;

    // isPlaying determines if the entities in this scene
    // will update and animate.
    this.isPlaying = false;
    // isInteractable determines if user input will be checked
    // for the entities in this scene. (TODO: actually implement this.)
    this.isInteractable = false;
    // remove is a boolean flag used by the scene manager.
    // When true, this Scene instance will be removed from the game.
    this.remove = false;
}

Scene.prototype.constructor = Scene;

/**
 * The update() function will go through all the entities
 * in this scene of isPlaying is true.  Otherwise, it does
 * nothing.
 */
Scene.prototype.update = function()    {
    if (this.isPlaying) {
        var entityCount = entities.length;
        for (var i = 0; i < entityCount; i++)   {
            if (!entities[i].removeFromWorld)   {
                entities[i].update();
            }
        }

        //Checking entities for deletion.
        for (var j = this.entities.length - 1; j >= 0; --j) {
            if (this.entities[j].removeFromWorld) {
                this.entities.splice(j, 1);
            }
        }
    }
}

/**
 * The draw() function draws every entity in this scene.
 * @param {*} ctx : The context.
 */
Scene.prototype.draw = function(ctx)    {
    // clockTick is initially 0. (time is frozen)
    var clockTick = 0;
    // If the scene is playing, change clockTick
    // to the clock tick on the game engine.
    if (this.isPlaying) {
        clockTick = this.game.clockTick;
    }
    var entityCount = entities.length;
    for (var i = 0; i < entityCount; i++)   {
        entities[i].draw(clockTick);
    }
}

Scene.prototype.close = function()  {
    var entityCount = entities.length;
    for (var i = 0; i < entityCount; i++)   {
        entities[i].deleteFromWorld = true;
    }
    this.remove = true;
}