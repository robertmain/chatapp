var app = require('express')();
var port = process.argv[2] || 8000;
app.get("/", function(req, res){
    res.sendfile("page.htm");
});
var io = require('socket.io').listen(app.listen(port));
io.sockets.on('connection', function(socket){
    socket.emit('message', {message: 'Welcome to the chat'});
    socket.broadcast.emit('message', {message: '<em>' + socket.handshake.address.address + ' Joined The Conversation</em>'});
    socket.on('send', function(data){
        io.sockets.emit('message', data);
    })
});
