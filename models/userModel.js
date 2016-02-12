var mongoose = require("mongoose");

var user = mongoose.Schema({
	username: String,
	twotes: [Object],
	time : { type : Date, default: Date.now },
	logged: Boolean
}, {collection: "users"});

module.exports = mongoose.model("users", user);
