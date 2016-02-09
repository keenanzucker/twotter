var mongoose = require("mongoose");

var twote = mongoose.Schema({
	
	name: String,

}, {collection: "twotes"});

module.exports = mongoose.model("twotes", twote);
