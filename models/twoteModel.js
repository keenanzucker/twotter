var mongoose = require("mongoose");

var twote = mongoose.Schema({
	
	text: String,
	time : { type : Date, default: Date.now },
	author: String

}, {collection: "twotes"});

//The first arguement here should be singular and you probably don't need to define the collection twice
module.exports = mongoose.model("twotes", twote);
