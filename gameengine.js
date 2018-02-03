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

function GameEngine() {
	const gamepad = new Gamepad();
    this.entities = [];
    this.players = [];
    this.teams = 0;
    this.showOutlines = false;
    this.ctx = null;
    this.click = null;
    this.mouseUp = null;
	this.mouseDown = null;
	this.triggerUp = null;
	this.triggerDown = null;
    this.mousex = 0;
	this.mousey = 0;
	this.stickx = 0;
	this.sticky = 0;
    this.wheel = null;
    this.surfaceWidth = null;
    this.surfaceHeight = null;
	//we should only be creating one gamepad object.
	this.gamepad = gamepad;
}

GameEngine.prototype.init = function (ctx) {
    this.ctx = ctx;
    this.surfaceWidth = this.ctx.canvas.width;
    this.surfaceHeight = this.ctx.canvas.height;
    this.startInput();
    this.timer = new Timer();
    console.log('game initialized');
}

GameEngine.prototype.start = function () {
    console.log("starting game");
    var that = this;
    (function gameLoop() {
        that.loop();
        requestAnimFrame(gameLoop, that.ctx.canvas);
    })();
}

GameEngine.prototype.startInput = function () {
    console.log('Starting input');
    var that = this;
    this.ctx.canvas.addEventListener("mousemove", function (e)  {
        that.mousex = e.clientX;
        that.mousey = e.clientY;
    })
    this.ctx.canvas.addEventListener("mouseup", function (e)    {
        that.mouseUp = true;
    }, false);
	this.ctx.canvas.addEventListener("mousedown", function (e)    {
        that.mouseDown = true;
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
        var player = new Player(that, (100 * Math.random()), 400, teams++, ASSET_MANAGER.getAsset("./img/player.png"));
        that.players.push(player);
        that.addEntity(player);
	});

	//disconnect event handler
	this.gamepad.on('disconnect', e => {
		console.log(`controller ${e.index} disconnected!`);
	});

	//Gamepad Analog Sticks

	//Analog stick Press
	//METHOD 1 of handling analog stick press
	this.gamepad.on('press', 'stick_axis_left', e => {
		if (e.x < 0) {
            that.players[e.index].aKey = true;
			that.players[e.index].dKey = false;
		}
		if (e.x > 0) {
			that.players[e.index].dKey = true;
			that.players[e.index].aKey = false;
		}
		console.log(`player ${e.player} pressed ${e.button}!`);
	});

	this.gamepad.on('press', 'stick_axis_right', e => {
		console.log(`player ${e.player} pressed ${e.button}!`);
	});

	//Analog stick hold
	this.gamepad.on('hold', 'stick_axis_left', e => {
		if (e.x > 0) {
			that.players[e.index].dKey = true;
			that.players[e.index].aKey = false;
		}
		if (e.x < 0) {
			that.players[e.index].aKey = true;
			that.players[e.index].dKey = false;
		}
		console.log(`player ${e.player} holding x=${e.x}, y=${e.y}!`);
	});

	this.gamepad.on('hold', 'stick_axis_right', e => {
		console.log(`player ${e.player} holding ${e.value}!`);
		this.players[e.index].stickx = e.x;
		this.players[e.index].sticky = e.y;
	});

	//Analog stick release
	this.gamepad.on('release', 'stick_axis_left', e => {
		that.players[e.index].aKey = false;
		that.players[e.index].dKey = false;
		console.log(`player ${e.player} released ${e.value}!`);
	});

	this.gamepad.on('release', 'stick_axis_right', e => {
		console.log(`player ${e.player} released ${e.value}!`);
	});

	// PRESS START

	//button_1 - A (XBOX) / X (PS3/PS4)
	this.gamepad.on('press', 'button_1', e => {
		that.players[e.index].space = true;
		that.players[e.index].spaceReleased = false;
    console.log(`player ${e.player} pressed ${e.button}!`);
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
	});

	//shoulder_bottom_right - RT (XBOX) / R2 (PS3/PS4)
	this.gamepad.on('press', 'shoulder_bottom_right', e => {
		that.triggerDown = true;
		console.log("triggerDown = " + that.triggerDown);
		console.log(`player ${e.player} pressed ${e.button}!`);
	});

	//select - Back (XBOX) / Select (PS3/PS4)
	this.gamepad.on('press', 'select', e => {
		console.log(`player ${e.player} pressed ${e.button}!`);
	});

	//start - Start (XBOX/PS3/PS4)
	this.gamepad.on('press', 'start', e => {
		console.log(`player ${e.player} pressed ${e.button}!`);
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
		that.players[e.index].aKey = true;
		console.log(`player ${e.player} pressed ${e.button}!`);
	});

	//d_pad_right - Right on the D-Pad (XBOX/PS3/PS4)
	this.gamepad.on('press', 'd_pad_right', e => {
		that.players[e.index].dKey = true;
		console.log(`player ${e.player} pressed ${e.button}!`);
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
		that.players[e.index].space = false;
		that.players[e.index].spaceReleased = true;
    console.log(`player ${e.player} released ${e.button}!`);
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
	});

	//shoulder_bottom_right - RT (XBOX) / R2 (PS3/PS4)
	this.gamepad.on('release', 'shoulder_bottom_right', e => {
		that.players[e.index].triggerUp = true;
		console.log("triggerUp = " + that.triggerUp);
		console.log(`player ${e.player} released ${e.button}!`);
	});

	//select - Back (XBOX) / Select (PS3/PS4)
	this.gamepad.on('release', 'select', e => {
		console.log(`player ${e.player} released ${e.button}!`);
	});

	//start - Start (XBOX/PS3/PS4)
	this.gamepad.on('release', 'start', e => {
		console.log(`player ${e.player} released ${e.button}!`);
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
		that.players[e.index].aKey = false;
		console.log(`player ${e.player} released ${e.button}!`);
	});

	//d_pad_right - Right on the D-Pad (XBOX/PS3/PS4)
	this.gamepad.on('release', 'd_pad_right', e => {
		that.players[e.index].dKey = false;
		console.log(`player ${e.player} released ${e.button}!`);
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
    this.entities.push(entity);
}

GameEngine.prototype.draw = function () {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.save();
    for (var i = 0; i < this.entities.length; i++) {
        this.entities[i].draw(this.ctx);
    }
    this.ctx.restore();
}

GameEngine.prototype.update = function () {
    var entitiesCount = this.entities.length;

    for (var i = 0; i < entitiesCount; i++) {
        var entity = this.entities[i];

        if (!entity.removeFromWorld) {
            entity.update();
        }
    }

    for (var i = this.entities.length - 1; i >= 0; --i) {
        if (this.entities[i].removeFromWorld) {
            this.entities.splice(i, 1);
        }
    }
}

GameEngine.prototype.loop = function () {
    this.clockTick = this.timer.tick();
    this.update();
    this.draw();

    this.direction = 0;
}

function Entity(game, x, y, xv, yv, canCollide) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.xv = xv;
    this.yv = yv;
    this.canCollide = canCollide;
    this.removeFromWorld = false;
}

Entity.prototype.update = function () {
}

Entity.prototype.draw = function (ctx) {
    if (this.game.showOutlines && this.radius) {
        this.game.ctx.beginPath();
        this.game.ctx.strokeStyle = "green";
        var tempX = this.x + this.xv;
        var tempY = this.y + this.yv;
        this.game.ctx.arc(tempX, tempY, this.radius, 0, Math.PI * 2, false);
        this.game.ctx.stroke();
        this.game.ctx.closePath();
    }
}

Entity.prototype.rotateAndCache = function (image, angle) {
    var offscreenCanvas = document.createElement('canvas');
    var size = Math.max(image.width, image.height);
    offscreenCanvas.width = size;
    offscreenCanvas.height = size;
    var offscreenCtx = offscreenCanvas.getContext('2d');
    offscreenCtx.save();
    offscreenCtx.translate(size / 2, size / 2);
    offscreenCtx.rotate(angle);
    offscreenCtx.translate(0, 0);
    offscreenCtx.drawImage(image, -(image.width / 2), -(image.height / 2));
    offscreenCtx.restore();
    //offscreenCtx.strokeStyle = "red";
    //offscreenCtx.strokeRect(0,0,size,size);
    return offscreenCanvas;
}
