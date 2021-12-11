const mongoose = require("mongoose");

module.exports = async () => {
	try {
		await mongoose.connect(
			process.env.MONGODB_URI || "mongodb://localhost:27017/form",
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
			}
		);
		console.log("Connected to MongoDB");
	} catch (err) {
		console.log(err);
	}
};
