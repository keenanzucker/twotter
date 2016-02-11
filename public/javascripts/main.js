$(document).ready(function(){

});

var $twoteForm = $('#add-twote');
var $loginForm = $('#login-form');
var $twoteList = $('#twote-list');
var $templateLi = $('#hidden-template-li');

var $templateHead = $("#hidden-hello");

// Error Handling for all Callbacks
var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};

$twoteForm.submit(function(event){
	event.preventDefault();

	var twote = $twoteForm.find("input[name='name']").val();

	formData = {name: twote};
	console.log(formData);

	$.post("new", formData)
		.done(function(data, status){
			var $newLi = $templateLi.clone();
			$newLi.removeAttr('id');
			$newLi.find('.twote').html(twote);
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

	$("#username-heading").html(username);

	$templateHead.css("visibility", "visible");


});