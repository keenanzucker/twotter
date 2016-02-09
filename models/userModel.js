var mongoose = require("mongoose");

var user = mongoose.Schema({
	name: String,
	twotes: [Object],
	login: Boolean
}, {collection: "users"});

module.exports = mongoose.model("users", user);
