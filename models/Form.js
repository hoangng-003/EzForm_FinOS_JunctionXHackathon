const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Form = new Schema({
	name: { required: true, type: String },
	id: { required: true, type: String },
	form: { required: true, type: String },
});

module.exports = {
	FormSchema: mongoose.Schema(Form),
	Form: mongoose.model("Form", Form),
};
