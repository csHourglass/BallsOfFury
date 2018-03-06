/**
 * A Scene that contains the Enigma boss fight.
 * @param {*} sceneManager - Scene Manager
 * @param {*} gameEngine - Game Engine
 * @param {*} players - An array of Players
 */

function Stage_Enigma(sceneManager, game, player, lives)   {
    this.manager = sceneManager;
    this.game = game;
    this.entities = [];
    this.width = 1920;
    this.height = 1080;
    this.endTimer = 3; // A timer for after the boss or the players die.


    //// GET BACKGROUND ////
    this.bgAnimation = new Animation(ASSET_MANAGER.getAsset("./img/Stage1Background.png"), 0, 0, this.width, this.height, 1, 1, true, false);
    var bg = new Background(game, this.bgAnimation, 0, 0);
    this.entities.push(bg);
    //// END BACKGROUND ////

    //// GET MAP ////
    // Setting up animation arrays
    var floor = [];
    floor.push(new Animation(ASSET_MANAGER.getAsset("./img/TestPlatform.png"), 0, 0, 1920, 162, 1, 1, true, false));
    var wall = [];
    wall.push(new Animation(ASSET_MANAGER.getAsset("./img/TestWall.png"), 0, 0, 48, 846, 1, 1, true, false));
    var ceiling = [];
    ceiling.push(new Animation(ASSET_MANAGER.getAsset("./img/TestCeiling.png"), 0, 0, 1920, 72, 1, 1, true, false));

    // Boxing in arena
    this.entities.push(new Wall(game, 0, 918, 1920, 162, floor));
    this.entities.push(new Wall(game, 21, 72, 48, 846, wall));
    this.entities.push(new Wall(game, 1851, 72, 48, 846, wall));
    this.entities.push(new Wall(game, 0, 0, 1920, 72, ceiling));

    // Adding platforms
    this.entities.push(new Platform(game, 430, 750, 1920, 162, floor, .1));
    this.entities.push(new Platform(game, 1299, 750, 1920, 162, floor, .1));

    // Adding camera
    this.entities.push(new Camera(game, 0, 0, 1920, 1080));
    //// END MAP ////

    //// GET PLAYERS ////
    var that = this;
    this.numPlayers = 0;
    // playerArray.forEach(function(element)   {
    //     var player = new Player(game, 150 + numPlayers*100, 200, lives, element.team, element.controller, that);
    //     element.controller.ready = false;
    //     that.entities.push(player);
    //     numPlayers++;
    // });
    this.player = new Player(game, 150, 200, lives, 0, player, that);
    this.entities.push(this.player);
    this.numPlayers++;
    //// END PLAYERS ////
    
    //// GET BOSS ////
    var bossHitpoints = 20;
    var bossController = new Controller(null);
    this.boss = new Boss_Enigma(game, this.width/2, 200, bossHitpoints, 99, bossController, that);
    this.entities.push(this.boss);
    Scene.call(this, game, this.entities);
    //// END BOSS ////
}

// Inheriting Scene and setting constructor.
Stage_Enigma.prototype = new Scene();
Stage_Enigma.prototype.constructor = Boss_Enigma;

/**
 * Updates Scene for one clocktick.
 */
Stage_Enigma.prototype.update = function()   {
    if (this.player.lives < 1)      {
        this.numPlayers = 0;
    }
    if (this.endTimer < 0)  {
        this.gotoMenu();
    }
    if (this.numPlayers === 0 || this.boss.isKilled)   {
        this.endTimer -= this.game.clockTick;
    }

    Scene.prototype.update.call(this);
}

Stage_Enigma.prototype.draw = function(ctx)  {
    Scene.prototype.draw.call(this, ctx);
    if (this.numPlayers < 1)   {
        ctx.font = "50pt Impact";
        ctx.fillStyle = "black";
        ctx.fillText("GAME OVER", 200, 200);
    } else if (this.boss.isKilled)    {
        ctx.font = "50pt Impact";
        ctx.fillStyle = "black";
        ctx.fillText("VICTORY", 200, 200);
    }
}

Stage_Enigma.prototype.spawn = function()  {
    var coord = new Coords();
    coord.x = 150 + Math.random()*(this.width-300);
    coord.y = 200;
    return coord;
}

Stage_Enigma.prototype.gotoMenu = function() {
    var nextScene = new MainMenu(this.manager, this.game);

    this.game.optionSelect.play();
    this.game.menuMusic = getRandomMenuMusic();
    this.game.menuMusic.loop = true;
    this.game.menuMusic.volume = .25;
    this.game.menuMusic.play();
    this.manager.loadLevel(nextScene);

    this.close();
}



function Boss_Enigma(game, startX, startY, hitpoints, team, controller, scene)    {
    this.id = 4; //Considered a character entity.
    this.game = game;
    this.startX = startX;
    this.startY = startY;
    this.x = startX;
    this.y = startY;
    this.width = 128;
    this.height = 128;
    this.hitpoints = hitpoints;
    this.team = team;
    this.controller = controller;
    this.scene = scene;
    this.isCatching = true;
    this.isKilled = false;
    this.flying = true;
    this.stunned = false;
    this.boundingBox = new BoundingBox(this.x + 40, this.y + 30, this.width - 80, this.height - 35);
    this.tick = 0;
    this.attackTimer = 0;
    this.explosions = 20;
    this.deathTimer = 0;
    this.stunTimer = 1;
    this.shake = 1;

    //// GET ANIMATIONS ////
    // Left animations
    this.LIdleAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 0, 0, 128, 128, 0.08, 8, true, false);
    this.LRunAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 384, 128, 128, 128, 0.10, 6, true, false);
    this.LRunStartAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 0, 128, 128, 128, 0.05, 3, false, false);
    this.LJumpAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 640, 256, 128, 128, 1, 1, true, false);
    this.LJumpStartAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 384, 256, 128, 128, 0.075, 1, false, false);
    this.LFallAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 512, 384, 128, 128, 1, 1, true, false);
    this.LFallStartAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 256, 384, 128, 128, 0.05, 2, false, false);
    this.LBallAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"),0, 512, 128, 128, 0.08, 8, true, false);  // player has ball
    this.LBallRunAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 384, 640, 128, 128, 0.10, 6, true, false);
    this.LBallRunStartAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 0, 640, 128, 128, 0.05, 3, false, false);
    this.LBallJumpAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 640, 768, 128, 128, 1, 1, true, false);
    this.LBallJumpStartAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 384, 768, 128, 128, 0.075, 1, false, false);
    this.LBallFallAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 512, 896, 128, 128, 1, 1, true, false);
    this.LBallFallStartAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 256, 896, 128, 128, 0.05, 2, false, false);
    this.LThrowAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 0, 1024, 128, 128, 0.04, 3, false, false);
	this.LChargeThrowAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 256, 1024, 128, 128, 0.001, 1, true, false);
    this.LFullChargeAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 384, 1024, 128, 128, 1, 1, true, false);
    // Right animations
    this.RIdleAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 0, 1152 + 0, 128, 128, 0.08, 8, true, false);
    this.RRunAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 384, 1152 + 128, 128, 128, 0.10, 6, true, false);
    this.RRunStartAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 0, 1152 + 128, 128, 128, 0.05, 3, false, false);
    this.RJumpAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 640, 1152 + 256, 128, 128, 1, 1, true, false);
    this.RJumpStartAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 384, 1152 + 256, 128, 128, 0.075, 1, false, false);
    this.RFallAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 512, 1152 + 384, 128, 128, 1, 1, true, false);
    this.RFallStartAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 256, 1152 + 384, 128, 128, 0.05, 2, false, false);
    this.RBallAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"),0, 1152 + 512, 128, 128, 0.08, 8, true, false);  // player has ball
    this.RBallRunAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 384, 1152 + 640, 128, 128, 0.10, 6, true, false);
    this.RBallRunStartAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 0, 1152 + 640, 128, 128, 0.05, 3, false, false);
    this.RBallJumpAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 640, 1152 + 768, 128, 128, 1, 1, true, false);
    this.RBallJumpStartAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 384, 1152 + 768, 128, 128, 0.075, 1, false, false);
    this.RBallFallAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 512, 1152 + 896, 128, 128, 1, 1, true, false);
    this.RBallFallStartAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 256, 1152 + 896, 128, 128, 0.05, 2, false, false);
    this.RThrowAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 0, 1152 + 1024, 128, 128, 0.04, 3, false, false);
	this.RChargeThrowAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 256, 1152 + 1024, 128, 128, 0.001, 1, true, false);
    this.RFullChargeAnimation = new Animation(ASSET_MANAGER.getAsset("./img/player.png"), 384, 1152 + 1024, 128, 128, 1, 1, true, false);
    // Other Animations
    this.deathAnimation = new Animation(ASSET_MANAGER.getAsset("./img/explosion.png"), 0, 0, 256, 256, 0.01, 48, false, false);
    this.charge = new Animation(ASSET_MANAGER.getAsset("./img/charge.png"), 0, 0, 256, 256, 0.02, 8, true, false);
    this.shield = new Animation(ASSET_MANAGER.getAsset("./img/shield.png"), 0, 0, 192, 192, 0.25/20, 20, false, false);
    this.hitAnimation = new Animation(ASSET_MANAGER.getAsset("./img/aura.png"), 0, 0, 204, 228, .05, 4, true, false);
    //// END ANIMATIONS ////

    Entity.call(this, game, this.x, this.y, true, this.id);
}

Boss_Enigma.prototype = new Entity();
Boss_Enigma.prototype.constructor = Boss_Enigma;

Boss_Enigma.prototype.update = function()  {
    this.tick += this.game.clockTick;
    this.attackTimer += this.game.clockTick;
    if (!this.isKilled && !this.stunned) {
        var newX = this.startX + Math.cos(this.tick/2)*700;
        if (newX < this.x)
            this.facingLeft = true;
        else
            this.facingLeft = false;
        this.x = newX;
        this.y = this.startY + Math.cos(this.tick*5)*10;
    }
    this.boundingBox = new BoundingBox(this.x + 40, this.y + 30, this.width - 80, this.height - 35);
    this.handleCollision();
    if (this.invincibleTimer > 0)   {
        this.invincibleTimer -= this.game.clockTick;
    }
    else if (this.invincible)   {
        this.invincible = false;
        this.isHit = false;
    }
    else if (this.isHit) {
        this.invincibleTimer = 3;
        this.invincible = true;
    }
    // if (this.invincibleTimer > 0)   {
    //     this.invincibleTimer -= this.game.clockTick;
    // }
    // if (this.invincibleTimer < 0)   {
    //     this.invincibleTimer = 0;
    //     this.isHit = false;
    // }
    if (this.isKilled) {
        this.deathTimer += this.game.clockTick;
        if (this.explosions > 0 && this.deathTimer/.10 > 1) {
            this.deathTimer = 0;
            var explosion = new Explosion(this.x-256 + Math.random()*384, this.y-256 + Math.random()*384, this.game);
            this.scene.addEntity(explosion);
            this.explosions--;
        }
        if (this.explosions < 1)
            this.removeFromWorld = true;
    } else if (this.hitpoints < 1)  {
        this.stunned = true;
        this.stunTimer -= this.game.clockTick;
        this.x += this.shake*10;
        this.shake *= -1;
        if (this.stunTimer < 0) {
            this.isKilled = true;
        }
    } else {
        if (this.attackTimer > 1) {
            this.attackTimer = 0;
            this.randomAttack();
        }
    }
    Entity.prototype.update.call(this);
}

Boss_Enigma.prototype.draw = function(ctx, tick)   {
    ////////// bounding box ////////////
    if (this.showBoxes) {
        this.boundingBox.draw(ctx);
    }
    if (!this.isKilled) {
        if (this.isHit) {
            this.hitAnimation.drawFrame(tick, ctx, this.x - (this.width/2), this.y - (this.height/2), this.game.drawScale);
        }

    //if ((this.invincibleTimer*10)%2 !== 0)  {
        if (this.stunned)   {
            if (this.facingLeft)
                this.LJumpAnimation.drawFrame(tick, ctx, this.x, this.y, this.game.drawScale);
            else
                this.RJumpAnimation.drawFrame(tick, ctx, this.x, this.y, this.game.drawScale);
        }
        else if (this.flying)    {
            if (this.facingLeft)
                this.LFallAnimation.drawFrame(tick, ctx, this.x, this.y, this.game.drawScale);
            else
                this.RFallAnimation.drawFrame(tick, ctx, this.x, this.y, this.game.drawScale);
        }
    //}
    }
    else {
        this.deathAnimation.drawFrame(tick, ctx, this.x, this.y, this.game.drawScale);
    }

    Entity.prototype.draw.call(this);
}
/**
 * Handles all collision functionality.
 */
Boss_Enigma.prototype.handleCollision = function() {
    this.controller.targetX = this.scene.player.x+64;
    this.controller.targetY = this.scene.player.y+64;
    for (var i = 0; i < this.scene.entities.length; i++) {
        var ent = this.scene.entities[i];

        if (ent !== this && ent.canCollide && this.boundingBox.hasCollided(ent.boundingBox)) {

            // Ball Collision
            if (ent.id === 5)   {

                if (ent.state === 0 && ent.team !== this.team) {
                    if (this.hitpoints > 1) {
                        this.attack();
                        ent.speed += 5000;
                        ent.team = this.team;
                        this.game.catchSound.play();
                        this.isHit = true;
                    }
                    this.hitpoints--;

                }
            }
        }
    }
}

Boss_Enigma.prototype.attack = function()   {
    this.adjustAim();
    var extraball = new Ball(this.game, this, this.x, this.y, 3, 5, this.scene);
    extraball.speed = 5000;
    this.scene.addEntity(extraball);
    this.controller.targetX -= 64;
    this.controller.targetY -= 64;
    this.adjustAim();
    var extraball2 = new Ball(this.game, this, this.x, this.y, 3, 5, this.scene);
    extraball2.speed = 5000;
    this.scene.addEntity(extraball2);
    this.controller.targetX += 128;
    this.controller.targetY += 128;
    this.adjustAim();
    var extraball3 = new Ball(this.game, this, this.x, this.y, 3, 5, this.scene);
    extraball3.speed = 5000;
    this.scene.addEntity(extraball3);

}

Boss_Enigma.prototype.randomAttack = function() {
    this.randomizeAim();
    this.adjustAim();
    var extraball = new Ball(this.game, this, this.x, this.y, 0, 5, this.scene);
    this.scene.addEntity(extraball);
}

Boss_Enigma.prototype.randomizeAim = function() {
    this.controller.targetX = Math.random()*1920;
    this.controller.targetY = Math.random()*1080;
}

Boss_Enigma.prototype.adjustAim = function()    {
    var lineX = this.controller.targetX - (this.x+64);
    var lineY = this.controller.targetY - (this.y+40);
    this.controller.aimX = lineX/(Math.abs(lineX) + Math.abs(lineY));
    this.controller.aimY = lineY/(Math.abs(lineX) + Math.abs(lineY));
}

function Explosion(x, y, game)    {
    this.game = game;
    this.x = x;
    this.y = y;
    this.anim = new Animation(ASSET_MANAGER.getAsset("./img/explosion.png"), 0, 0, 256, 256, 0.01, 48, false, false);
    Entity.call(this, game, this.x, this.y, false, 0);
}

Explosion.prototype = new Entity();
Explosion.prototype.constructor = Explosion;

Explosion.prototype.update = function() {
    if (this.anim.isDone())
        this.removeFromWorld = true;
    Entity.prototype.update.call(this);
}

Explosion.prototype.draw = function(ctx, tick)    {
    this.anim.drawFrame(tick, ctx, this.x, this.y, 1);
    Entity.prototype.draw.call(this, ctx);
}