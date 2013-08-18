window.onload = function() {
    var messages = [];
    var socket = io.connect('http://' + window.location.hostname);
    var name = document.getElementById("name");
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("content");

    socket.on('message', function(data) {
        if (data.message) {
            if (data.name) {
                messages.push("<strong>" + data.name + ": </strong>" + data.message);
            }
            else {
                messages.push(data.message);
            }
            var html = '';
            for (var i = 0; i < messages.length; i++) {
                html += messages[i] + '<br />';
            }
            content.innerHTML = html;
        }
        else {
            console.log("There is a problem: ", data);
        }
    });

    sendMessage = function() {
        var text = field.value;
        var user = name.value;
        socket.emit('send', {message: text, name: user});
        field.value = "";
    }
    sendButton.onclick = sendMessage;
    field.onkeyup = function(e) {
        if (e.keyCode == 13) {
            sendMessage();
        }
    }
}