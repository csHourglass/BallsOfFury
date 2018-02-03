
// var app = require('express')();
// var http = require('http').Server(app);
// var io = require('socket.io')(http);

// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/index.html');
// });

// app.get('/gameengine', function(req, res){
//   res.sendFile(__dirname + '/gameengine.js');
// });

// app.get('/assetmanager', function(req, res){
//   res.sendFile(__dirname + '/assetmanager.js');
// });

// app.get('/main', function(req, res){
//   res.sendFile(__dirname + '/main.js');
// });

// app.get('/player', function(req, res){
//   res.sendFile(__dirname + '/player.js');
// });

// app.get('/ball', function(req, res){
//   res.sendFile(__dirname + '/ball.js');
// });

// app.get('/animation', function(req, res){
//   res.sendFile(__dirname + '/animation.js');
// });

// app.get('/dummy', function(req, res){
//   res.sendFile(__dirname + '/dummy.js');
// });

// app.get('/gamepad/gamepad', function(req, res){
//   res.sendFile(__dirname + '/gamepad/gamepad.js');
// });

// io.on('connection', function(socket){
//   console.log('a user connected');
// });

// http.listen(3000, function(){
//   console.log('listening on *:3000');
// });

var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

process.setMaxListeners(0);

app.use(express.static('./'))

server.listen(3000);
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/img/bg20', function(req, res){
  res.sendFile(__dirname + '/img/bg20.png');
});

app.get('/animation', function(req, res){
  res.sendFile(__dirname + '/animation.js');
});

app.get('/assetmanager', function(req, res){
  res.sendFile(__dirname + '/assetmanager.js');
});

app.get('/ball', function(req, res){
  res.sendFile(__dirname + '/ball.js');
});

app.get('/dummy', function(req, res){
  res.sendFile(__dirname + '/dummy.js');
});

app.get('/gameengine', function(req, res){
  res.sendFile(__dirname + '/gameengine.js');
});

app.get('/main', function(req, res){
  res.sendFile(__dirname + '/main.js');
});

app.get('/player', function(req, res){
  res.sendFile(__dirname + '/player.js');
});

app.get('/gamepad/gamepad.js', function(req, res){
  res.sendFile(__dirname + '/gamepad/gamepad.js');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

