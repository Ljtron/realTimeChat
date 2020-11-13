//imports
var express = require("express")()
var http = require("http").createServer(express)
var io = require("socket.io")(http)

//middleware


// routes

express.get("/", function(req,res){
    res.sendFile(__dirname + "/view/home.html")
})

// socket connection
io.on("connection", function(socket){
    console.log("user has connected")
    socket.broadcast.emit('user has connected');

    // Function called when the event chat message is emitted
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        socket.broadcast.emit('chat message', msg);
    });

    // Function called when a user disconnects from a socket io server
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
})

// running the server
http.listen(3000, ()=> console.log("the server is running on http://127.0.0.1:3000")) 