    // This game shell was happily copied from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011
window.onload = function() {
    document.getElementById("gameWorld").focus();
};
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (/* function */ callback, /* DOMElement */ element) {
                window.setTimeout(callback, 1000 / 60);
            };
})();


function Timer() {
    this.gameTime = 0;
    this.maxStep = 0.05;
    this.wallLastTimestamp = 0;
}

Timer.prototype.tick = function () {
    var wallCurrent = Date.now();
    var wallDelta = (wallCurrent - this.wallLastTimestamp) / 1000;
    this.wallLastTimestamp = wallCurrent;

    var gameDelta = Math.min(wallDelta, this.maxStep);
    this.gameTime += gameDelta;
    return gameDelta;
}

function Controller()	{
	this.jump = false;
	this.left = false;
	this.right = false;
	this.up = false;
	this.down = false;
	this.throw = false;
	this.parry = false;
	this.pause = false;
	this.aimX = 1;
	this.aimY = 0;
	this.targetX = 1;
	this.targetY = 0;
    this.mouse = false;  //hack solution for keyboard/controller problems (on davids computer)
}

Controller.prototype.constructor = Controller;

function GameEngine() {
	const gamepad = new Gamepad();
    this.entities = [];
	this.players = [];
	this.controllers = [];
    //team 0 is keyboard
    this.teams = 1;
    this.showOutlines = false;
    this.ctx = null;
    this.click = null;
    this.mouseUp = null;
	this.mouseDown = null;
	this.triggerUp = null;
	this.triggerDown = null;
    this.mousex = -100;
	this.mousey = -100;
	this.stickx = 0;
	this.sticky = 0;
    this.wheel = null;
    this.surfaceWidth = null;
	this.surfaceHeight = null;
	this.xOffset = 0;
	this.yOffset = 0;
	this.drawScale = 1;
	//we should only be creating one gamepad object.
	this.gamepad = gamepad;
	this.canPause = true;
}

GameEngine.prototype.init = function (ctx, sceneManager) {
    this.ctx = ctx;
    this.surfaceWidth = this.ctx.canvas.width;
	this.surfaceHeight = this.ctx.canvas.height;

	this.controllers.push(new Controller());  //Adding keyboard controller
    this.startInput();
    this.timer = new Timer();
	this.sceneManager = sceneManager;
    console.log('game initialized');
}

GameEngine.prototype.start = function () {
    console.log("starting game");
	var that = this;
	this.sceneManager.init(that);
    (function gameLoop() {
        that.loop();
        requestAnimFrame(gameLoop, that.ctx.canvas);
    })();
}

GameEngine.prototype.getID = function (e) {
	var index;
	if (e.player === 'keyboard') {
			index = 0;
	}
	else {
		index = e.player;
	}

	return index;
}
GameEngine.prototype.startInput = function () {
    console.log('Starting input');
    var that = this;
    this.ctx.canvas.addEventListener("mousemove", function (e)  {
		// if (that.players.length > 0) {
		// 	that.players[0].mousex = e.clientX;
		// 	that.players[0].mousey = e.clientY;
		// }
		that.mousex = e.clientX;
		that.mousey = e.clientY;
		that.controllers[0].targetX = e.clientX;
		that.controllers[0].targetY = e.clientY;
        that.controllers[0].mouse = true; // using mouse

		//console.log("mousex=" + that.mousex + " ,mousey=" + that.mousey);
    })
    this.ctx.canvas.addEventListener("mouseup", function (e)    {
		// if (that.players.length > 0) {
		// 	that.players[0].mouseUp = true;
		// }
		that.sceneManager.clickedWhereX = that.mousex;
		that.sceneManager.clickedWhereY = that.mousey;
		that.controllers[0].throw = false;
    }, false);
	this.ctx.canvas.addEventListener("mousedown", function (e)    {
		// if (that.players.length > 0) {
		// 	that.players[0].mouseDown = true;
		// }
		that.controllers[0].throw = true;
    }, false);

	/*
	-	This is the start of the gamepad console logs
	-
	-	Game Pad event handlers below!
	-
	-	The point of the console.log's are to help us during implementation
	-	of the controller into our game.
	-
	-	There will be log statements in the console corresponding to the
	-	buttons we press on the controller.
	-
	-	Comment out the console.log statements if truly needed!
	-	<3, Alvin
	*/

	// GAMEPAD START

	//keyboard's custom input
	this.gamepad.setCustomMapping('keyboard', {
		'shoulder_bottom_left': 69,
		'button_1': 32,
		'start': 27,
		'd_pad_up': [38, 87],
		'd_pad_down': [40, 83],
		'd_pad_left': [37, 65],
		'd_pad_right': [39, 68]
	});

	//connect event handler
	this.gamepad.on('connect', e => {
		console.log(`controller ${e.index} connected!`);
		if (e.index >= that.controllers.length)	{
			console.log("++");
			that.controllers.push(new Controller());

		}
        // var player = new Player(that, (1136 * Math.random()), 400, that.teams++, ASSET_MANAGER.getAsset("./img/player.png"));

        // that.players.push(player);
        // that.addEntity(player);
		//"that.players[0].team);

	});

	//disconnect event handler
	this.gamepad.on('disconnect', e => {
		console.log(`controller ${e.index} disconnected!`);
	});

	//Gamepad Analog Sticks

	//Analog stick Press
	//METHOD 1 of handling analog stick press
	this.gamepad.on('press', 'stick_axis_left', e => {
		// var index = this.getID(e);
		// console.log("e.index = "+ index);
		// console.log("that.players[index].aKey = " + that.players[index].aKey);
		// if (e.x < 0) {
        //     that.players[index].aKey = true;
		// 	that.players[index].dKey = false;
		// }
		// if (e.x > 0) {
		// 	that.players[index].dKey = true;
		// 	that.players[index].aKey = false;
		// }
		console.log(`player ${e.player} pressed ${e.button}!`);
		var index = this.getID(e);
		if (e.x < 0) {
            that.controllers[index].left = true;
            that.controllers[index].right = false;
		}
		if (e.x > 0) {
            that.controllers[index].right = true;
            that.controllers[index].left = false;
		}
	});

	this.gamepad.on('press', 'stick_axis_right', e => {
		console.log(`player ${e.player} pressed ${e.button}!`);
        var index = this.getID(e);
	});

	//Analog stick hold
	this.gamepad.on('hold', 'stick_axis_left', e => {
		// var index = this.getID(e);
		// if (e.x > 0) {
		// 	that.players[index].dKey = true;
		// 	that.players[index].aKey = false;
		// }
		// if (e.x < 0) {
		// 	that.players[index].aKey = true;
		// 	that.players[index].dKey = false;
		// }
		console.log(`player ${e.player} holding x=${e.x}, y=${e.y}!`);

		var index = this.getID(e);
        that.controllers[index].mouse = false;
		if (e.x < 0) {
            that.controllers[index].left = true;
            that.controllers[index].right = false;
		}
		if (e.x > 0) {
            that.controllers[index].right = true;
            that.controllers[index].left = false;
		}
	});

	this.gamepad.on('hold', 'stick_axis_right', e => {
		// var index = this.getID(e);
		console.log(`player ${e.player} holding ${e.value}!`);
		// this.players[index].stickx = e.x;
		// this.players[index].sticky = e.y;
		var index = this.getID(e);
        that.controllers[index].mouse = false;
		that.controllers[index].aimX = e.x;
		that.controllers[index].aimY = e.y;
	});

	//Analog stick release
	this.gamepad.on('release', 'stick_axis_left', e => {
		// var index = this.getID(e);
		// that.players[index].aKey = false;
		// that.players[index].dKey = false;
		console.log(`player ${e.player} released ${e.value}!`);
		var index = this.getID(e);
		that.controllers[index].left = false;
		that.controllers[index].right = false;
	});

	this.gamepad.on('release', 'stick_axis_right', e => {
		console.log(`player ${e.player} released ${e.value}!`);
	});

	// PRESS START

	//button_1 - A (XBOX) / X (PS3/PS4)
	this.gamepad.on('press', 'button_1', e => {
		// var index = this.getID(e);
		// that.players[index].space = true;
		// that.players[index].spaceReleased = false;
		console.log(`player ${e.player} pressed ${e.button}!`);
		var index = this.getID(e);
		that.controllers[index].jump = true;
	});

	//button_2 - B (XBOX) / Circle (PS3/PS4)
	this.gamepad.on('press', 'button_2', e => {
		console.log(`player ${e.player} pressed ${e.button}!`);
	});

	//button_3 - X (XBOX) / Square (PS3/PS4)
	this.gamepad.on('press', 'button_3', e => {
		console.log(`player ${e.player} pressed ${e.button}!`);
	});

	//button_4 - Y (XBOX) / Triangle (PS3/PS4)
	this.gamepad.on('press', 'button_4', e => {
		console.log(`player ${e.player} pressed ${e.button}!`);
	});

	//shoulder_top_left - LB (XBOX) / L1 (PS3/PS4)
	this.gamepad.on('press', 'shoulder_top_left', e => {
		console.log(`player ${e.player} pressed ${e.button}!`);
	});

	//shoulder_top_right - RB (XBOX) / R1 (PS3/PS4)
	this.gamepad.on('press', 'shoulder_top_right', e => {
		console.log(`player ${e.player} pressed ${e.button}!`);
	});

	//shoulder_bottom_left - LT (XBOX) / L2 (PS3/PS4)
	this.gamepad.on('press', 'shoulder_bottom_left', e => {
		console.log(`player ${e.player} pressed ${e.button}!`);
		var index = this.getID(e);
		that.controllers[index].parry = true;
	});

	//shoulder_bottom_right - RT (XBOX) / R2 (PS3/PS4)
	this.gamepad.on('press', 'shoulder_bottom_right', e => {
		// var index = this.getID(e);
		// that.players[index].triggerDown = true;
		// console.log("triggerDown = " + that.players[index].triggerDown);
		console.log(`player ${e.player} pressed ${e.button}!`);
		var index = this.getID(e);
		that.controllers[index].throw = true;
	});

	//select - Back (XBOX) / Select (PS3/PS4)
	this.gamepad.on('press', 'select', e => {
		console.log(`player ${e.player} pressed ${e.button}!`);
	});

	//start - Start (XBOX/PS3/PS4)
	this.gamepad.on('press', 'start', e => {
		console.log(`player ${e.player} pressed ${e.button}!`);
		var index = this.getID(e);
		that.controllers[index].pause = true;
		that.pauseGame = true;
	});

	//stick_button_left - Left Analog Stick (XBOX/PS3/PS4)
	//METHOD 2 of analog stick
	this.gamepad.on('press', 'stick_button_left', e => {
		console.log(`player ${e.player} pressed ${e.button}!`);
	});

	//stick_button_right - Right Analog Stick (XBOX/PS3/PS4)
	//METHOD 2 of analog stick
	this.gamepad.on('press', 'stick_button_right', e => {
		console.log(`player ${e.player} pressed ${e.button}!`);
	});

	//d_pad_up - Up on the D-Pad (XBOX/PS3/PS4)
	this.gamepad.on('press', 'd_pad_up', e => {
		console.log(`player ${e.player} pressed ${e.button}!`);
	});

	//d_pad_down - Down on the D-Pad (XBOX/PS3/PS4)
	this.gamepad.on('press', 'd_pad_down', e => {
		console.log(`player ${e.player} pressed ${e.button}!`);
	});

	//d_pad_left - Left on the D-Pad (XBOX/PS3/PS4)
	this.gamepad.on('press', 'd_pad_left', e => {
		// var index = this.getID(e);
		// that.players[index].aKey = true;
		console.log(`player ${e.player} pressed ${e.button}!`);
		var index = this.getID(e);
		that.controllers[index].left = true;
	});

	//d_pad_right - Right on the D-Pad (XBOX/PS3/PS4)
	this.gamepad.on('press', 'd_pad_right', e => {
		// var index = this.getID(e);
		// that.players[index].dKey = true;
		console.log(`player ${e.player} pressed ${e.button}!`);
		var index = this.getID(e);
		that.controllers[index].right = true;
	});

	//vendor - XBOX Button (XBOX) / Playstation Button (PS3/PS4)
	this.gamepad.on('press', 'vendor', e => {
		console.log(`player ${e.player} pressed ${e.button}!`);
	});

	// PRESS END

	// HOLD START

	//button_1 - A (XBOX) / X (PS3/PS4)
	this.gamepad.on('hold', 'button_1', e => {
		console.log(`player ${e.player} holding ${e.button}!`);
	});

	//button_2 - B (XBOX) / Circle (PS3/PS4)
	this.gamepad.on('hold', 'button_2', e => {
		console.log(`player ${e.player} holding ${e.button}!`);
	});

	//button_3 - X (XBOX) / Square (PS3/PS4)
	this.gamepad.on('hold', 'button_3', e => {
		console.log(`player ${e.player} holding ${e.button}!`);
	});

	//button_4 - Y (XBOX) / Triangle (PS3/PS4)
	this.gamepad.on('hold', 'button_4', e => {
		console.log(`player ${e.player} holding ${e.button}!`);
	});

	//shoulder_top_left - LB (XBOX) / L1 (PS3/PS4)
	this.gamepad.on('hold', 'shoulder_top_left', e => {
		console.log(`player ${e.player} holding ${e.button}!`);
	});

	//shoulder_top_right - RB (XBOX) / R1 (PS3/PS4)
	this.gamepad.on('hold', 'shoulder_top_right', e => {
		console.log(`player ${e.player} holding ${e.button}!`);
	});

	//shoulder_bottom_left - LT (XBOX) / L2 (PS3/PS4)
	this.gamepad.on('hold', 'shoulder_bottom_left', e => {
		console.log(`player ${e.player} holding ${e.button}!`);
		var index = this.getID(e);
		that.controllers[index].parry = true;
	});

	//shoulder_bottom_right - RT (XBOX) / R2 (PS3/PS4)
	this.gamepad.on('hold', 'shoulder_bottom_right', e => {
		console.log(`player ${e.player} holding ${e.button}!`);
	});

	//select - Back (XBOX) / Select (PS3/PS4)
	this.gamepad.on('hold', 'select', e => {
		console.log(`player ${e.player} holding ${e.button}!`);
	});

	//start - Start (XBOX/PS3/PS4)
	this.gamepad.on('hold', 'start', e => {
		console.log(`player ${e.player} holding ${e.button}!`);
		var index = this.getID(e);
		that.controllers[index].pause = true;
		that.pauseGame = true;
	});

	//stick_button_left - Left Analog Stick (XBOX/PS3/PS4)
	this.gamepad.on('hold', 'stick_button_left', e => {
		console.log(`player ${e.player} holding ${e.button}!`);
	});

	//stick_button_right - Right Analog Stick (XBOX/PS3/PS4)
	this.gamepad.on('hold', 'stick_button_right', e => {
		console.log(`player ${e.player} holding ${e.button}!`);
	});

	//d_pad_up - Up on the D-Pad (XBOX/PS3/PS4)
	this.gamepad.on('hold', 'd_pad_up', e => {
		console.log(`player ${e.player} holding ${e.button}!`);
	});

	//d_pad_down - Down on the D-Pad (XBOX/PS3/PS4)
	this.gamepad.on('hold', 'd_pad_down', e => {
		console.log(`player ${e.player} holding ${e.button}!`);
	});

	//d_pad_left - Left on the D-Pad (XBOX/PS3/PS4)
	this.gamepad.on('hold', 'd_pad_left', e => {
		console.log(`player ${e.player} holding ${e.button}!`);
	});

	//d_pad_right - Right on the D-Pad (XBOX/PS3/PS4)
	this.gamepad.on('hold', 'd_pad_right', e => {
		console.log(`player ${e.player} holding ${e.button}!`);
	});

	//vendor - XBOX Button (XBOX) / Playstation Button (PS3/PS4)
	this.gamepad.on('hold', 'vendor', e => {
		console.log(`player ${e.player} holding ${e.button}!`);
	});

	// HOLD END

	// RELEASE START

	//button_1 - A (XBOX) / X (PS3/PS4)
	this.gamepad.on('release', 'button_1', e => {
		// var index = this.getID(e);
		// that.players[index].space = false;
		// that.players[index].spaceReleased = true;
		console.log(`player ${e.player} released ${e.button}!`);
		var index = this.getID(e);
		that.controllers[index].jump = false;
	});

	//button_2 - B (XBOX) / Circle (PS3/PS4)
	this.gamepad.on('release', 'button_2', e => {
		console.log(`player ${e.player} released ${e.button}!`);
	});

	//button_3 - X (XBOX) / Square (PS3/PS4)
	this.gamepad.on('release', 'button_3', e => {
		console.log(`player ${e.player} released ${e.button}!`);
	});

	//button_4 - Y (XBOX) / Triangle (PS3/PS4)
	this.gamepad.on('release', 'button_4', e => {
		console.log(`player ${e.player} released ${e.button}!`);
	});

	//shoulder_top_left - LB (XBOX) / L1 (PS3/PS4)
	this.gamepad.on('release', 'shoulder_top_left', e => {
		console.log(`player ${e.player} released ${e.button}!`);
	});

	//shoulder_top_right - RB (XBOX) / R1 (PS3/PS4)
	this.gamepad.on('release', 'shoulder_top_right', e => {
		console.log(`player ${e.player} released ${e.button}!`);
	});

	//shoulder_bottom_left - LT (XBOX) / L2 (PS3/PS4)
	this.gamepad.on('release', 'shoulder_bottom_left', e => {
		console.log(`player ${e.player} released ${e.button}!`);
		var index = this.getID(e);
		that.controllers[index].parry = false;
	});

	//shoulder_bottom_right - RT (XBOX) / R2 (PS3/PS4)
	this.gamepad.on('release', 'shoulder_bottom_right', e => {
		// var index = this.getID(e);
		// that.players[index].triggerUp = true;
		// console.log("triggerUp = " + that.triggerUp);
		console.log(`player ${e.player} released ${e.button}!`);
		var index = this.getID(e);
		that.controllers[index].throw = false;
	});

	//select - Back (XBOX) / Select (PS3/PS4)
	this.gamepad.on('release', 'select', e => {
		console.log(`player ${e.player} released ${e.button}!`);
	});

	//start - Start (XBOX/PS3/PS4)
	this.gamepad.on('release', 'start', e => {
		console.log(`player ${e.player} released ${e.button}!`);
		// that.sceneManager.clickedWhereX = -50;
		// that.sceneManager.clickedWhereY = -50;
		var index = this.getID(e);
		that.controllers[index].pause = false;
		that.pauseGame = false;
	});

	//stick_button_left - Left Analog Stick (XBOX/PS3/PS4)
	this.gamepad.on('release', 'stick_button_left', e => {
		console.log(`player ${e.player} released ${e.button}!`);
	});

	//stick_button_right - Right Analog Stick (XBOX/PS3/PS4)
	this.gamepad.on('release', 'stick_button_right', e => {
		console.log(`player ${e.player} released ${e.button}!`);
	});

	//d_pad_up - Up on the D-Pad (XBOX/PS3/PS4)
	this.gamepad.on('release', 'd_pad_up', e => {
		console.log(`player ${e.player} released ${e.button}!`);
	});

	//d_pad_down - Down on the D-Pad (XBOX/PS3/PS4)
	this.gamepad.on('release', 'd_pad_down', e => {
		console.log(`player ${e.player} released ${e.button}!`);
	});

	//d_pad_left - Left on the D-Pad (XBOX/PS3/PS4)
	this.gamepad.on('release', 'd_pad_left', e => {
		// var index = this.getID(e);
		// that.players[index].aKey = false;
		console.log(`player ${e.player} released ${e.button}!`);
		var index = this.getID(e);
		that.controllers[index].left = false;
	});

	//d_pad_right - Right on the D-Pad (XBOX/PS3/PS4)
	this.gamepad.on('release', 'd_pad_right', e => {
		// var index = this.getID(e);
		// that.players[index].dKey = false;
		console.log(`player ${e.player} released ${e.button}!`);
		var index = this.getID(e);
		that.controllers[index].right = false;
	});

	//vendor - XBOX Button (XBOX) / Playstation Button (PS3/PS4)
	this.gamepad.on('release', 'vendor', e => {
		console.log(`player ${e.player} released ${e.button}!`);
	});

	// RELEASE END

	// GAMEPAD END

	//don't need some of the event handlers here, commented out for now.
    /*this.ctx.canvas.addEventListener("keydown", function (e) {
        if (String.fromCharCode(e.which) === ' ')   {
            that.space = true;
            that.spaceReleased = false;
        }
        if (String.fromCharCode(e.which) === 'A') that.aKey = true;
        if (String.fromCharCode(e.which) === 'D') that.dKey = true;
        if (String.fromCharCode(e.which) === 'W') that.wKey = true;
        if (String.fromCharCode(e.which) === 'R') that.rKey = true;
//        console.log(e);
        e.preventDefault();
    }, false);
    this.ctx.canvas.addEventListener("keyup", function (e) {
        if (String.fromCharCode(e.which) === ' ') {
            that.space = false;
            that.spaceReleased = true;
        }
        if (String.fromCharCode(e.which) === 'A') that.aKey = false;
        if (String.fromCharCode(e.which) === 'D') that.dKey = false;
        if (String.fromCharCode(e.which) === 'W') that.wKey = false;
        if (String.fromCharCode(e.which) === 'R') that.rKey = false;
//        console.log(e);
        e.preventDefault();
    }, false);*/

    console.log('Input started');
}

GameEngine.prototype.addEntity = function (entity) {
		console.log('added entity');
		return this.entities.push(entity);
}

GameEngine.prototype.draw = function () {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.save();
    for (var i = 0; i < this.entities.length; i++) {
        if (this.entities[i].id != 4) {
            this.entities[i].draw(this.ctx);
        }
    }
	for (var i = 0; i < this.players.length; i++) {
        this.players[i].draw(this.ctx);
		console.log(this.players.length);
    }
    this.ctx.restore();
}
/**
 * When update() is called, every entity in the
 * entities array will have their update() function
 * called. Any entity that has been flagged for
 * removal will be deleted as well.
 */
GameEngine.prototype.update = function () {

    var entitiesCount = this.entities.length;
	// Calling all update() functions
    for (var j = 0; j < entitiesCount; j++) {
        var entity = this.entities[j];

        if (!entity.removeFromWorld) {
            entity.update();
        }
    }
	// Checking for removal
    for (var j = this.entities.length - 1; j >= 0; --j) {
        if (this.entities[j].removeFromWorld) {
            this.entities.splice(j, 1);
        }
    }

	var playersCount = this.players.length;
	// Also removing the Players from the players array if necessary.
    for (var j = this.players.length - 1; j >= 0; --j) {
        if (this.players[j].removeFromWorld) {
            this.players.splice(j, 1);
        }
    }
}
/**
 * The main game loop.  Constantly calls the update()
 * and draw() functions.
 */
GameEngine.prototype.loop = function () {
    this.clockTick = this.timer.tick();
    this.sceneManager.play(this.ctx);
    this.direction = 0;
}
