/**********************************
_____Single Player Mode_____

toDo:   fix ball spawing as if thrown
        moving dummies
        better sprite for dummies
        go back to main menu

****************************************/
 // height and width of frame
 var width = 1920;
 var height = 1080;

// implement player for this sccene and spawn lots of dummies

function SinglePlayer(sceneManager, game, controller)    {
    this.game = game;
    this.sceneManager = sceneManager;
    this.isPlaying = true;
    this.entities = [];
    this.dummies = [];
    this.bgAnimation = new Animation(ASSET_MANAGER.getAsset("./img/Stage1Background.png"), 0, 0, width, height, 1, 1, true, false);

    var bg = new Background(game, this.bgAnimation);
    this.entities.push(bg);

    this.dummyClock = 0;  // count the time since last dummy spawned
    this.spawnTime = 15; // the time till next dummy will spawn
    this.dummyCount = 1; // the number of dummies that have spawned in the game.
    this.balls = 1;  // number of balls in the level.  will increase as enemies are killed.
    this.killCount = 00;
    this.scoreboard = new Scoreboard(this.game, 100 , height - 50); // to display killCount
    // var that = this;
    // players.forEach(function(element)   {
    this.player = new Player(game, (1620 * Math.random()) + 150, 795, 1, controller, this);
    this.entities.push(this.player);
    //     that.players++;
    // });

	var dummy = new Dummy(game, (1620 * Math.random()) + 150, 795, 2, this);
    this.entities.push(dummy);
    this.dummies.push(dummy);
    var floor = [];
    floor.push(new Animation(ASSET_MANAGER.getAsset("./img/TestPlatform.png"), 0, 0, 1920, 162, 1, 1, true, false));
    floor.push(new Animation(ASSET_MANAGER.getAsset("./img/TestPlatform.png"), 0, 0, 192, 162, 1, 1, true, false));
    var wall = [];
    wall.push(new Animation(ASSET_MANAGER.getAsset("./img/TestWall.png"), 0, 0, 48, 846, 1, 1, true, false));
    var ceiling = [];
    ceiling.push(new Animation(ASSET_MANAGER.getAsset("./img/TestCeiling.png"), 0, 0, 1920, 72, 1, 1, true, false));
    this.entities.push(new Wall(game, 0, 918, 1920, 162, floor));
    this.entities.push(new Wall(game, 21, 72, 48, 846, wall));
	this.entities.push(new Wall(game, 1851, 72, 48, 846, wall));
    this.entities.push(new Wall(game, 0, 0, 1920, 72, ceiling));

    this.entities.push(new Camera(game, 0, 0, 1920, 1080));
	var fight = new Audio("./fight.mp3");
	fight.play();
	fight.volume = .1;
    //var fakeplayer = new Player(game, 100, 795, 99, new Controller(), this);
    // fakeplayer.armorlock = true;
    // this.entities.push(fakeplayer);
    // this.entities.push(new Ball(fakeplayer.game, fakeplayer, fakeplayer.boundingBox.x - 20,
    //     fakeplayer.boundingBox.y, fakeplayer.chargingTime, 5, this));
    this.entities.push(this.scoreboard);
    Scene.call(this, game, this.entities);
}

SinglePlayer.prototype = new Scene();
SinglePlayer.prototype.constructor = SinglePlayer;

SinglePlayer.prototype.update = function() {


    this.dummyClock += this.game.clockTick;
    if (this.dummyClock >= this.spawnTime) {
        var newDummy = new Dummy(this.game, (1620 * Math.random())+150, 200 + (650 * Math.random()), 2, this);
        this.entities.push(newDummy);
        this.dummies.push(newDummy);
        this.dummyCount++;
        this.dummyClock = 0
        this.spawnTime = 1 + (this.spawnTime / 1.5);  // spawn next one a little sooner

    }

    // check for killed dummies
    for (var i = 0; i < this.dummies.length; i++) {
        if (this.dummies[i].isKilled) {
            this.killCount++;
            this.dummies.splice(i, 1);
            //spawn a new for every 10 enemies killed, max of 5 balls
            if (this.killCount % 10 === 0 && this.killCount < 40) {
                this.entities.push(new Ball (this.game, this.player, (1620 * Math.random()) + 150, 795, 0, 5, this));
            }
            console.log("KILL COUNT ", this.killCount)
            this.scoreboard.updateScore(this.killCount);
        } else if (this.dummies[i].boundingBox.hasCollided(this.player.boundingBox)) {
            this.player.isHit = true;
            this.player.canCollide = false;
            this.player.lives = 0;  // only one life in single player
            this.scoreboard.gameOver = true;;
            /********************************
             should display game over here
            ********************************/

        }
    }
    Scene.prototype.update.call(this);
}


SinglePlayer.prototype.spawn = function()  {
    var coord = new Coords();
    coord.x = 100 + Math.random()*1700;
    coord.y = 795;
    return coord;
}


/*************************************************
 Scoreboard to display kill count
 ***********************************************/
function Scoreboard(game, x, y) {
     this.x = x;
     this.y = y;
     this.score = 0;
     this.text = "Kills: " + this.score;
     this.color = "red";
     this.gameOver = false;
     Entity.call(this, game, this.x, this.y);

 }

Scoreboard.prototype = new Entity();
Scoreboard.prototype.constructor = Scoreboard;

 Scoreboard.prototype.updateScore = function(score) {
     this.score = score;
     this.text = "Kills: " + this.score;
 }


 Scoreboard.prototype.draw = function(ctx) {
     if (this.gameOver) {
         this.x = width/2;
         this.y = height/2;
         this.text = "GAME OVER";
         ctx.strokeStyle = "black";
         ctx.fillRect(this.x - 600, this.y - 300, 1200, 600);
         ctx.font = "100pt Impact";
         ctx.fillStyle = this.color;
         ctx.fillText(this.text, this.x - 300, this.y -100);
         ctx.font = "50pt Impact";
         ctx.fillText(this.score + " kills", this.x - 115, this.y + 100);
     } else {
         // display kill count
         ctx.strokeStyle = "black";
         ctx.fillRect(this.x - 10, this.y - 80, 400, 100);

         ctx.font = "75pt blippo";
         ctx.fillStyle = this.color;
         ctx.fillText(this.text, this.x, this.y);
         Entity.prototype.draw.call(this);
     }

 }
