var express = require("express"),
app         = express(),
server      = require('http').createServer(app),
io          = require("socket.io").listen(server),
ent         = require("ent"),
//todolist
todo        = [];

//rendu de la page
app.get("/", function(req, res){
	res.sendFile(__dirname + "/views/todo.html");
})
//permet de servir les fichiers situés dans le répertoire /public (js et css)
.use(express.static("public"));

//communication avec socket.io
io.sockets.on("connection", function(socket){
	//emet la todolist au client à sa connection
	socket.emit("todo", todo)
	//reception nouvelle tache: update la todolist et la reémet
	.on("newTask", function(newTask){
		todo.push(ent.encode(newTask));
		socket.broadcast.emit("todo", todo);
	})
	//supression tache: update la todolist et la reémet
	.on("deleteTask", function(task){
		var index = todo.indexOf(ent.encode(task));
		todo.splice(index, 1);
		socket.broadcast.emit("todo", todo);
	});
});

//ecoute du port 8080
server.listen(8080);