const express = require("express");
const router = express.Router();
const { GuessData, Form } = require("../models");

router.get("/form/:slug", (req, res) => {
	if (req.query.preview) {
		Form.findOne({ id: req.params.slug })
			.then((form) => {
				form = form.toObject();
				res.render("form", { form, preview: true });
			})
			.catch((err) => console.log(err));
	} else {
		Form.findOne({ id: req.params.slug })
			.then((form) => {
				form = form.toObject();
				res.render("form", { form });
			})
			.catch((err) => console.log(err));
	}
});

router.post("/form", (req, res) => {
	const newGuessData = new GuessData({
		formName: req.body.formName,
		formId: req.body.formId,
		data: req.body.data,
	});
	newGuessData.save();
});

module.exports = router;
