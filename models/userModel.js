var mongoose = require("mongoose");

var user = mongoose.Schema({
	username: String,
	password: String,
	// twotes: [{type:Schema.ObjectId, ref: 'twotes'}],
	time : { type : Date, default: Date.now },
	logged: Boolean
}, {collection: "users"});

module.exports = mongoose.model("users", user);
