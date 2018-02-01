var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/socket.io/socket.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  
  //on the event named 'chat message', we print out the message to console
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
  
  //on the event 'chat message', we send the message to everyone.
  socket.on('chat message', function(msg){
	//io.broadcast.emit will send the message to everyone except a certain socket.
    io.emit('chat message', msg);
  });
  
  
});
    

http.listen(3000, function(){
  console.log('listening on *:3000');
});