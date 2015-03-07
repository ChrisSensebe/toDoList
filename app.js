var express = require("express"),
app         = express(),
server      = require('http').createServer(app),
io          = require("socket.io").listen(server),
ent         = require("ent"),
//todolist
todo        = [];

//send page
app.get("/", function(req, res){
	res.sendFile(__dirname + "/views/todo.html");
})
.use(express.static("public"));

//using socket.io
io.sockets.on("connection", function(socket){
	//send todolist to client
	socket.emit("todo", todo)
	//add task to todolist and broadcast list to clients
	.on("newTask", function(newTask){
		todo.push(ent.encode(newTask));
		socket.broadcast.emit("todo", todo);
	})
	//suppr task fto todolist and broadcast list to clients
	.on("deleteTask", function(task){
		var index = todo.indexOf(ent.encode(task));
		todo.splice(index, 1);
		socket.broadcast.emit("todo", todo);
	});
});

server.listen(8080);
