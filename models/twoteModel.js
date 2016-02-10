var mongoose = require("mongoose");

var twote = mongoose.Schema({
	
	name: String,
	time : { type : Date, default: Date.now }

}, {collection: "twotes"});

module.exports = mongoose.model("twotes", twote);
