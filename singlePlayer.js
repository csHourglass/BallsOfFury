/**********************************
_____Single Player Mode_____

toDo:   fix ball spawing as if thrown
        moving dummies
        better sprite for dummies

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
    this.enemies = [];
    this.bgAnimation = new Animation(ASSET_MANAGER.getAsset("./img/Stage1Background.png"), 0, 0, width, height, 1, 1, true, false);
//	this.pause = new Animation(ASSET_MANAGER.getAsset("./img/pause-menu.png"), 0, 0, 1920, 1080, 1, 1, true, false);
    this.isPaused = false;
    var bg = new Background(game, this.bgAnimation, 0, 0);
    this.entities.push(bg);

    this.dummyClock = 0;  // count the time since last dummy spawned
    this.spawnTime = 8; // the time till next dummy will spawn. will be set when dummy is killed
//    this.dummyCount = 1; // the number of dummies that have spawned in the game.
//    this.balls = 1;  // number of balls in the level.  will increase as enemies are killed.
    this.killCount = 0;

    // var that = this;
    // players.forEach(function(element)   {

    //     that.players++;
    // });

	this.dummy = new Dummy(game, 1200 + 150, 775, 2, this);
    this.entities.push(this.dummy);
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
    this.entities.push(new Platform(game, 69, 750, 1920, 162, floor, .1));
//    this.entities.push(new Platform(game, (1920/2)-.1*(1920/2), 750, 1920, 162, floor, .1));

    this.entities.push(new Platform(game, (1920/2)-.1*(1920/2), 390, 1920, 162, floor, .1));
    this.entities.push(new Platform(game, 1660, 750, 1920, 162, floor, .1));
    this.entities.push(new Platform(game, 430, 582, 1920, 162, floor, .1));
    this.entities.push(new Platform(game, 1299, 582, 1920, 162, floor, .1));
    this.entities.push(new Platform(game, 69, 414, 1920, 162, floor, .1));
    this.entities.push(new Platform(game, 1660, 414, 1920, 162, floor, .1));
    //this.entities.push(new Platform(game, ))
    this.entities.push(new Camera(game, 0, 0, 1920, 1080));
	// var fight = new Audio("./fight.mp3");
	// fight.play();
	// fight.volume = .1;
    //var fakeplayer = new Player(game, 100, 795, 99, new Controller(), this);
    // fakeplayer.armorlock = true;
    // this.entities.push(fakeplayer);
    // this.entities.push(new Ball(fakeplayer.game, fakeplayer, fakeplayer.boundingBox.x - 20,
    //     fakeplayer.boundingBox.y, fakeplayer.chargingTime, 5, this));
    this.player = new Player(game, 200, 795, 4 ,0, controller, this);
    this.player.controller.pause = false;
    this.entities.push(this.player);
    this.scoreboard = new Scoreboard(this.game, 100 , height - 50, 0); // to display killCount
    this.entities.push(this.scoreboard);
//    this.game.bgMusic.play();
    Scene.call(this, game, this.entities);
}

SinglePlayer.prototype = new Scene();
SinglePlayer.prototype.constructor = SinglePlayer;

SinglePlayer.prototype.update = function() {

    if (this.isPlaying && this.dummy == undefined) {
        this.dummyClock += this.game.clockTick;
    }
    if (this.dummy !== undefined && this.dummy.isKilled) {
        this.dummy = undefined;
        this.dummyClock = 7;
    }

    if (this.dummyClock >= this.spawnTime && this.player.lives > 0) {
        //console.log(this.spawnTime);
        //var newDummy = new Dummy(this.game, (1620 * Math.random())+150, 795, 2, this);
        var newEnemy = new FlyingMonster(this.game, (1500 * Math.random()) + 100, (500 * Math.random()) + 200, 2, this);
        for (var i = 0; i < this.entities.length; i++) {
            var ent = this.entities[i];
            for (var j = 0; j < this.entities.length; j++) {
                if (ent != this && (ent instanceof Player || ent instanceof FlyingMonster)) {
                    // prevent from spawning on top of eachother
                    while (newEnemy.boundingBox.hasCollided(ent.boundingBox) || (ent instanceof Player && newEnemy.vision.canSee(ent.boundingBox))) {
                        //console.log("TOO CLOSE")
                        newEnemy = new FlyingMonster(this.game, (1500 * Math.random()) + 100, (500 * Math.random()) + 200, 2, this);

                    }
                }
            }

        }
        console.log(newEnemy.vision.canSee(this.player));
        this.entities.push(newEnemy);
        this.enemies.push(newEnemy);
        this.dummyCount++;
        this.dummyClock = 0
        this.spawnTime -= (this.spawnTime/8);
        if (this.spawnTime < 1)
            this.spawnTime = 1;
    }

    // check for killed dummies
    for (var i = 0; i < this.enemies.length; i++) {
        // if (this.enemies[i].x <= 0) this.enemies[i].x = 50; // set it back in frame
        // else if (this.enemies[i].x >= width) this.enemies[i].x = width - 50;
        // else if (this.enemies[i].y <= 0) this.enemies[i].y = 50;
        // else if (this.enemies[i].y > 795) this.enemies[i].y = 795;  //795 is the current location of the floor

        if (this.enemies[i].isKilled) {
            if (this.enemies[i] instanceof Boss_Enigma)
                this.killCount += 5;
            else
                this.killCount++;
            this.enemies.splice(i, 1);
            //spawn a new for every 10 enemies killed, max of 5 balls
            if (this.killCount % 10 === 0 && this.killCount < 40) {
                var ball = new Ball (this.game, this.player, (1620 * Math.random()) + 150, 898, 0, 5, this);
                ball.state = 2;
                this.entities.push(ball);
            }
            if (this.killCount % 50 === 0)  {
                var bossHitpoints = 5;
                var bossController = new Controller(null);
                this.boss = new Boss_Enigma(this.game, 1920/2, 200, bossHitpoints, 99, bossController, this);
                this.entities.push(this.boss);
                this.enemies.push(this.boss);
            }
            this.scoreboard.updateScore(this.killCount);
        } else if ((this.enemies[i].boundingBox.hasCollided(this.player.boundingBox) && !(this.enemies[i] instanceof Boss_Enigma)) ||this.player.isHit) {
            this.player.isHit = true;
            this.player.canCollide = false;
            this.player.lives = 0;  // only one life in single player
            this.player.controller.jump = false;  // to prevent skipping through gameover screen
            /********************************
             should display game over here
            ********************************/

            this.scoreboard.gameOver = true;
            this.entities.pop(this.scoreboard);
            this.scoreboard = new Scoreboard(this.game, 0, 0, this.killCount);
            this.scoreboard.gameOver = true;
            this.entities.push(this.scoreboard);
            this.isPlaying = false;
        }
    }

    // game over, return to main menu
    if (this.player.lives <= 0 && (this.player.controller.pause || this.player.controller.jump)) {
        var nextScene = new MainMenu(this.sceneManager, this.game);
        // this.game.bgMusic.pause();
        // this.game.bgMusic.currentTime = 0;
        // this.game.optionSelect.play();
        // this.game.menuMusic = getRandomMenuMusic();
        // this.game.menuMusic.loop = true;
        // this.game.menuMusic.volume = .25;
        // this.game.menuMusic.play();
        this.sceneManager.loadLevel(nextScene);
        this.close();
    }

    // if (this.game.bgMusic != null && !this.isPlaying) {
    //     this.game.bgMusic.pause();
    //
    // }else if (this.game.bgMusic != null && this.isPlaying) {
    //     this.game.bgMusic.play();
    // }



    // if (this.player.controller.pause) {
    //     this.isPaused = !this.isPaused;
    //     this.isPlaying = !this.isPlaying;
    // }

    Scene.prototype.update.call(this);
}

// SinglePlayer.prototype.draw = function(ctx) {
//     // if (this.isPaused) {
//     //     this.pause.drawFrame(this.game.clockTick, ctx, 0, 0);
//     // }
//     Scene.prototype.draw.call(ctx);
// }

SinglePlayer.prototype.spawn = function()  {
    var coord = new Coords();
    coord.x = 100 + Math.random()*1700;
    coord.y = 795;
    return coord;
}


/*************************************************
 Scoreboard to display kill count
 ***********************************************/
function Scoreboard(game, x, y, score) {
     this.x = x;
     this.y = y;
     this.score = score;
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
         ctx.beginPath();
         this.text = "GAME OVER";
         ctx.strokeStyle = "black";
         ctx.fillRect(this.x - 600, this.y - 300, 1200, 600);
         ctx.font = "100pt Impact";
         ctx.fillStyle = this.color;
         ctx.fillText(this.text, this.x - 300, this.y -100);
         ctx.font = "50pt Impact";
         ctx.fillText(this.score + " kills", this.x - 100, this.y + 100);
         ctx.fillStyle = "yellow";
         ctx.font = "30pt Impact";
         ctx.fillText("Press Start to Return to Menu", this.x - 250, this.y + 200);
         ctx.fillStyle = "black";  // idk why
         ctx.closePath();

     } else {
         // display kill count
         ctx.beginPath();
         ctx.strokeStyle = "black";
         ctx.fillRect(this.x - 10, this.y - 80, 400, 100);

         ctx.font = "75pt blippo";
         ctx.fillStyle = this.color;
         ctx.fillText(this.text, this.x, this.y);
         ctx.closePath();
         Entity.prototype.draw.call(this);
     }

 }
