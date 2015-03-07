
/* script éxécuté par le client */

//connection a socket.io
var socket = io.connect("http://localhost:8080");

//à la reception de la liste, rafraichissement de la liste affichée
socket.on("todo", function(todo){
	$("#todo").empty();
	for(var i=0; i<todo.length; i++){
		$("#todo").append("<li><button class=\"btn btn-xs btn-danger\"><span class=\"glyphicon glyphicon-remove\"></button>" + todo[i] + "</li>");
	}
});

//recupération de la tache à ajouter, emission de celle-ci, rajout à la liste affichée
$("#todoForm").submit(function(){
	var tache = $("#tache").val();
	socket.emit("newTask", tache);
	$("#todo").append("<li><button class=\"btn btn-xs btn-danger\"><span class=\"glyphicon glyphicon-remove\"></button>" + tache + "</li>");
	$("#tache").val("").focus();
	return false;
});

//recupération de la tache à supprimer, émission de celle-ci, supression de la liste affichée
$("#todo").on("click", "button", function(){
	$(this).text("");
	var task = $(this).closest("li").text();
	socket.emit("deleteTask", task);
	$(this).closest("li").remove();
});