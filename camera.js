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
    // var canvas = document.getElementsByTagName('canvas')[0];
    // canvas.width = $(window).width();
    // canvas.height = $(window).height();
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
    var xMin = 1920;
    var xMax = 0;
    var yMin = 1080;
    var yMax = 0;
    if (players === 0)  {
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
        this.goalx = (xMax + xMin)/2;
        this.goaly = (yMax + yMin)/2;
    }
    if (this.goalx - xMin > xMax - this.goalx)  this.goalWidth = this.goalx - xMin + 500;
    else    this.goalWidth = xMax - this.goalx + 500;
    if (this.goaly - yMin > yMax - this.goaly)  this.goalHeight = this.goaly - yMin + 250;
    else    this.goalHeight = yMax - this.goaly + 250;


    if (this.defaultRatio > this.goalWidth/this.goalHeight) {
        var newHeight = this.goalWidth/this.defaultRatio;
        this.goaly += newHeight - this.goalHeight;
        this.goalHeight = newHeight;
    } else  {
        var newWidth = this.goalHeight*this.defaultRatio;
        this.goalx += newWidth - this.goalWidth;
        this.goalWidth = newWidth;
    }
    this.goalWidth *= this.defaultRatio;
    this.goalheight /= this.defaultRatio;
    this.width = this.goalWidth*2;
    this.height = this.goalHeight*2;

    this.x = this.goalx - this.goalWidth;
    this.y = this.goaly - this.goalHeight;
    this.scale = this.defaultWidth/this.width;
    this.game.xOffset = this.x;
    this.game.yOffset = this.y;
    this.game.drawScale = this.scale;

    console.log(this.x, this.y, this.width, this.height);
    Entity.prototype.update.call(this);
}

Camera.prototype.draw = function(ctx) {
    //hurp.
}