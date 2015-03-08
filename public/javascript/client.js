/* Client side script */

var socket = io.connect("https://todolist-chrissensebe.c9.io");

// updating todolist
socket.on("todo", function(todo){
	$("#todo").empty();
	for(var i=0; i<todo.length; i++){
		$("#todo").append("<li><button class=\"btn btn-xs btn-danger\"><span class=\"glyphicon glyphicon-remove\"></button>" + todo[i] + "</li>");
	}
});

// adding task
$("#todoForm").submit(function(){
	var tache = $("#tache").val();
	socket.emit("newTask", tache);
	$("#todo").append("<li><button class=\"btn btn-xs btn-danger\"><span class=\"glyphicon glyphicon-remove\"></button>" + tache + "</li>");
	$("#tache").val("").focus();
	return false;
});

// supr task
$("#todo").on("click", "button", function(){
	$(this).text("");
	var task = $(this).closest("li").text();
	socket.emit("deleteTask", task);
	$(this).closest("li").remove();
});
