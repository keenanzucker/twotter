var mongoose = require("mongoose");

var twote = mongoose.Schema({
	
	text: String,
	time : { type : Date, default: Date.now },
	author: String

}, {collection: "twotes"});

module.exports = mongoose.model("twotes", twote);
