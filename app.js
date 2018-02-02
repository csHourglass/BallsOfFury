var express = require('express'),
    http = require('http');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

server.listen(3000);
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
  res.sendFile(__dirname + '/animation.js');
  res.sendFile(__dirname + '/assetmanager.js');
  res.sendFile(__dirname + '/ball.js');
  res.sendFile(__dirname + '/dummy.js');
  res.sendFile(__dirname + '/gameengine.js');
  res.sendFile(__dirname + '/main.js');
  res.sendFile(__dirname + '/player.js');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

