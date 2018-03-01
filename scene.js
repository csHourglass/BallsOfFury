function Coords() {
    this.x = 0;
    this.y = 0;
}

/**
 * The Scene object handles a set of entities that will
 * appear on the canvas.
 * @param {*} game : The game engine.  Needed for clock ticks.
 * @param {*} entities : An array of entities.
 */
function Scene(game, entities)    {
    this.game = game;
    this.entities = entities;
    if (this.pausable === undefined)    {
        this.pausable = true;
    }

    // isPlaying determines if the entities in this scene
    // will update and animate.
    this.isPlaying = true;
    // isInteractable determines if user input will be checked
    // for the entities in this scene. (TODO: actually implement this.)
    this.isInteractable = false;
    // remove is a boolean flag used by the scene manager.
    // When true, this Scene instance will be removed from the game.
    this.remove = false;
}

/**
 * The update() function will go through all the entities
 * in this scene of isPlaying is true.  Otherwise, it does
 * nothing.
 */
Scene.prototype.update = function()    {
    if (this.isPlaying) {
        var entityCount = this.entities.length;
        for (var i = 0; i < entityCount; i++)   {
            if (!this.entities[i].removeFromWorld)   {
                this.entities[i].update();
            }
        }

        //Checking entities for deletion.
        for (var j = this.entities.length - 1; j >= 0; --j) {
            if (this.entities[j].removeFromWorld) {
                this.entities.splice(j, 1);
            }
        }
    }
    if (this.pausable)  {
        if (this.game.pauseGame && this.canPause)   {
            this.canPause = false;
            if (this.isPlaying) this.isPlaying = false;
            else this.isPlaying = true;
        }
        if (!this.game.pauseGame && !this.canPause) {
            this.canPause = true;
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
    //if we're paused
    // if (!this.isPlaying) {
    //     //draw the dark rectangle over CTX to darken the background
    //     ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
    //     ctx.fillRect(0, 0, 1920, 1080);

    //     //pause the music
    //     this.game.bgmusic.pause();

    // }

    //draw our paused screen here possibly

    // If the scene is playing,
    if (this.isPlaying) {
        //if the bgmusic is paused, then resume it.
        // if (this.game.bgMusic.paused)
        //     this.game.bgMusic.paused = false;
        //change clockTick  to the clock tick on the game engine.
        clockTick = this.game.clockTick;
    }
    var entityCount = this.entities.length;
    for (var i = 0; i < entityCount; i++)   {
        this.entities[i].draw(ctx, clockTick);
    }
}

Scene.prototype.addEntity = function (entity) {
    console.log('added entity');
    return this.entities.push(entity);
}

Scene.prototype.close = function()  {
    console.log("Closing Scene");
    var entityCount = this.entities.length;
    for (var i = 0; i < entityCount; i++)   {
        this.entities[i].removeFromWorld = true;
    }
    this.remove = true;
}

Scene.prototype.spawn = function()  {
    var coord = new Coords();
    coord.x = Math.random()*1920;
    coord.y = Math.random()*1080;
    return coord;
}
