$(document).ready(function(){

});


var $twoteForm = $('#add-twote');
var $twoteList = $('#twote-list');
var $templateLi = $('#hidden-template-li');

// Error Handling for all Callbacks
var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};

$twoteForm.submit(function(event){
	event.preventDefault();

	var twote = $twoteForm.find("input[name='name']").val();


	var $newLi = $templateLi.clone();
	$newLi.removeAttr('id');
	$newLi.find('.twote').html(twote);
	$twoteList.prepend($newLi);
	$("#add-twote")[0].reset();

	formData = {name: twote};
	console.log(formData);

	$.post("new", formData)
		.done(function(data, status){
		console.log("Twote Submitted!");
	})
	.error(onError);
});


