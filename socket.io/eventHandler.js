$(function () {
	
    var socket = io();
	
	//we handle the chat message event here.
	socket.on('chat message', function(msg){
      $('#messages').append($('<li>').text(msg));
    });
	
  });