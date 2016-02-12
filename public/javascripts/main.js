$(document).ready(function(){

});

var $twoteForm = $('#add-twote');
var $loginForm = $('#login-form');
var $twoteList = $('#twote-list');
var $templateLi = $('#hidden-template-li');
var $templateLiUser = $("#hidden-template-user");
var $userList = $("#user-list");

var $templateHead = $("#hidden-hello");


$('#logout').click(function() {
    location.reload();
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

	$.post("new", formData)
		.done(function(data, status){
			var $newLi = $templateLi.clone();
			$newLi.removeAttr('id');
			$newLi.find('.twote').html(twote);
			$newLi.find('.author').html(username);
			$twoteList.prepend($newLi);
			$("#add-twote")[0].reset();

		console.log("Twote Submitted!");
	})
	.error(onError);
});

$loginForm.submit(function(event){

	event.preventDefault();

	var username = $loginForm.find("input[name='username']").val();

	formData = {username: username};

	console.log(formData);

	$.post("login", formData)
		.done(function(data, status){

			$("#username-heading").html(username);
			$templateHead.css("visibility", "visible");
			$twoteForm.css("display", "block");

			console.log("LOGGED IN!");

			var $newLi = $templateLi.clone();
			$newLi.removeAttr('id');
			$newLi.find(".username").html(username);
			$userList.prepend($newLi);
		})
		.error(onError);
});