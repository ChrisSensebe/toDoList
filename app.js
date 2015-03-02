var app = require("express")(),
server  = require('http').createServer(app),
io      = require("socket.io").listen(server),
ent     = require("ent"),
fs      = require("fs"),
todo    = [];

//rendu de la page
app.get("/todo", function(req, res){
	res.sendFile(__dirname + "/todo.html");
})
.listen(8080);

io.on("connection", function(socket){
	//emet la todolist au client a la connection
	socket.emit("todo", todo);
	//reception nouvelle tache, update la todolist et la réémet
	socket.on("newTask", function(newTask){
		var task = ent.encode(newTask);
		todo.push(task);
		socket.broadcast.emit("todo",todo);
	});
	//supression tache, update la todolist et la réémet
	socket.on("deleteTask", function(index){
		var index = ent.encode(index);
		todo.splice(index, 1);
		socket.broadcast.emit("todo",todo);
	});
});