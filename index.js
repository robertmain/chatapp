var express = require("express");
var app = express();
var port = 3700;

app.set('views', __dirname + '/tpl');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
app.get("/", function(req, res){
    res.render("page");
});
app.use(express.static(__dirname + '/public'));
var io = require('socket.io').listen(app.listen(port));
console.log("Now listening on port " + port);

io.sockets.on('connection', function(socket){
    socket.emit('message', {message: 'Welcome to the chat'});
    var address = socket.handshake.address;
    socket.broadcast.emit('message', {message: '<em>' + address.address + ' Joined The Conversation</em>'});
    socket.on('send', function(data){
        io.sockets.emit('message', data);
    })
});