const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { FormSchema } = require("./Form");

const User = new Schema({
	nickname: { type: String },
	email: { type: String },
	forms: [FormSchema],
});

module.exports = mongoose.model("User", User);
