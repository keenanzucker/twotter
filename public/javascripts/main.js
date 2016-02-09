$(document).ready(function(){

});


var $twoteForm = $('#add-twote');
var $twoteList = $('#twote-list');
var $templateLi = $('#hidden-template-li');


$twoteForm.submit(function(event){
	event.preventDefault();

	var twote = $twoteForm.find("input[name='name']").val();

	var $newLi = $templateLi.clone();
	$newLi.removeAttr('id');
	$newLi.find('.twote').html(twote);

	$twoteList.append($newLi);

	$("#add-twote")[0].reset();

});