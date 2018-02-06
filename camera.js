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
    this.left = -1000;
    this.top = -1000;
    this.right = -1000;
    this.bottom = -1000;

    Entity.call(this, game, this.x, this.y, 0, 0, false, 0);
}

Camera.prototype = new Entity();
Camera.prototype.constructor = Camera;

Camera.prototype.update = function ()   {
    var xCoord = [];
    var yCoord = [];
    var players = 0;
    for (var i = 0; i < this.game.entities.length; i++) {
        var ent = this.game.entities[i];
        if (ent.id === 4)   {
            xCoord[players] = ent.x;
            yCoord[players] = ent.y;
            players++;
        }
    }
    var xMin = 480;
    var xMax = 960;
    var yMin = 270;
    var yMax = 540;
    if (players === 0)  {
        this.goalx = this.defaultWidth/2;
        this.goaly - this.defaultHeight/2;
    } else  {
        this.goalx = 0;
        this.goaly = 0;
        for (var i = 0; i < players; i++) {
            this.goalx += xCoord[i];
            this.goaly += yCoord[i];

        }
        this.goalx /= players;
        this.goaly /= players;
    }

    this.x = this.goalx - xMax;
    this.y = this.goaly - yMax;
    this.width = (this.width + this.goalWidth)/2;
    this.height = (this.height + this.goalHeight)/2;
    this.scale = this.defaultWidth/(this.x+(this.goalx*2));
    this.game.xOffset = this.x;
    this.game.yOffset = this.y;
    this.game.drawScale = this.scale;

    // console.log(this.x, this.y, this.width, this.height);
    Entity.prototype.update.call(this);
}

Camera.prototype.draw = function(ctx) {
    //hurp.
}