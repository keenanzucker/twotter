$(document).ready(function(){


});

var $twoteForm = $('#add-twote');
var $loginForm = $('#login-form');
var $twoteList = $('#twote-list');
var $twoteListIter = $('#twote-list li')
var $templateLi = $('#hidden-template-li');
var $templateLiUser = $("#hidden-template-user");
var $userList = $("#user-list");
var $userLi = $(".userName");
var $templateHead = $("#hidden-hello");
var $removeButton = $('.remove-button');

var currentUser = '';

$('#logout').click(function() {
    location.reload();
});

$removeButton.click(function(event){

	event.preventDefault();
	// debugger;
	var twotteId = $(this).parent().attr('id');
	var buttonToRemove = $(this);

	$("#"+twotteId).remove();
	buttonToRemove.remove();
	$.post("/remove", {idToDelete:twotteId})


});

$userLi.hover(function(){
	console.log("Clicked",  this.id);

	showId = this.id;
	userName = ''

	clickData ={
		id : showId
	}
	$.post('highlight', clickData)
	.done(function(data, status) {
		currentUser=data.username;
		console.log(data.username);

		userName = data.username;

		$("."+data.username).css("background-color", "yellow");
	})
	.error(onError);
}, function(){

	$("."+userName).css("background-color", "lightgrey");
});

// Error Handling for all Callbacks
var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};


$twoteForm.submit(function(event){
	event.preventDefault();

	var twote = $twoteForm.find("input[name='text']").val();
	var username = $("#username-heading").text();

	formData = {
		text: twote,
		author: username
	};

	console.log(formData);

	if (username == ''){
		alert("You're not logged in, sorry!");
	}
	else {
		$.post("new", formData)
			.done(function(data, status){
				var $newLi = $templateLi.clone();
				$newLi.removeAttr('id');
				$newLi.find('.twote').html(twote);
				$newLi.find('.author').html(username);
				$newLi.addClass(username);
				$newLi.attr('id', data._id);
				$twoteList.prepend($newLi);

			console.log("Twote Submitted!");
		})
		.error(onError);
	}
});

