function Camera(game, x, y, width, height)  {
    this.x = x;
    this.y = y;
    this.goalx = this.x;
    this.goaly = this.y;
    this.defaultWidth = width;
    this.width = this.defaultWidth;
    this.goalWidth = this.width;
    this.defaultHeight = height;
    this.height = this.defaultHeight;
    this.goalHeight = this.height;
    this.defaultRatio = this.defaultWidth/this.defaultHeight;
    this.scale = 1.00;

    // This is here due to collision coupling.  As soon as that is rewritten, this can be removed.
    this.left = -1000;
    this.top = -1000;
    this.right = -1000;
    this.bottom = -1000;

    Entity.call(this, game, this.x, this.y, 0, 0, false, 0);
}

Camera.prototype = new Entity();
Camera.prototype.constructor = Camera;

Camera.prototype.update = function ()   {
    //Store the coordinates of every Player entity.
    var xCoord = [];
    var yCoord = [];
    var players = 0; //Player counter

    //Iterate through the entity array, searching for players.
    for (var i = 0; i < this.game.entities.length; i++) {
        var ent = this.game.entities[i];
        if (ent.id === 4)   {
            xCoord[players] = ent.x;
            yCoord[players] = ent.y;
            players++;
        }
    }

    // These variables store the min and max x and y across all current Players.
    var xMin = 1920;
    var xMax = 0;
    var yMin = 1080;
    var yMax = 0;


    if (players === 0)  { // If no players are present...

        this.goalx = this.defaultWidth/2;
        this.goaly = this.defaultHeight/2;

    } else  {

        this.goalx = 0;
        this.goaly = 0;
        for (var i = 0; i < players; i++) {
            var playerX = xCoord[i];
            var playerY = yCoord[i];
            if (playerX > xMax) xMax = playerX;
            if (playerX < xMin) xMin = playerX;
            if (playerY > yMax) yMax = playerY;
            if (playerY < yMin) yMin = playerY;
            // this.goalx += playerX;
            // this.goaly += playerY;

        }
        // The midpoint is the center of the camera.
        this.goalx = (xMax + xMin)/2;
        this.goaly = (yMax + yMin)/2;

    }

    this.goalWidth = (xMax - xMin)*1.5; // The bare minimum width to show all Players + 50%
    this.goalHeight = (yMax - yMin)*1.5; // The bare minimum height + 50%
    //If the camera width and height are below half the default width and height, increase it
    if (this.goalWidth < this.defaultWidth)  this.goalWidth = this.defaultWidth;
    if (this.goalHeight < this.defaultHeight)  this.goalHeight = this.defaultHeight;

    // Getting the actual coords for the camera
    this.x = this.goalx - this.goalWidth/2;
    this.y = this.goaly - this.goalHeight/2;
    // The scale needed for drawing all entities
    this.scale = this.defaultWidth/this.goalWidth;
    // Store camera coords and scale in the GameEngine
    this.game.xOffset = this.x;
    this.game.yOffset = this.y;
    this.game.drawScale = this.scale;

    // console.log(this.x, this.y, this.width, this.height);
    Entity.prototype.update.call(this);
}

Camera.prototype.draw = function(ctx) {
    //hurp.
}