const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GuessData = new Schema({
	formId: { type: String, required: true },
	userId: { type: String, required: true },
	data: { type: Object, required: true },
});

module.exports = mongoose.model("GuessData", GuessData);
