$(function () {
	
    var socket = io();
	
    $('form').submit(function(){
	  //we emit a chat message event to index.js here
      socket.emit('chat message', $('#m').val());
      $('#m').val('');
      return false;
    });
	
  });