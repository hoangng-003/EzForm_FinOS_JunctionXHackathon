const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid");
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
		if (req.query.uuid) {
			if (req.query.uuid !== req.session.userId) {
				req.session.userId = req.query.uuid;
			}
			GuessData.findOne({ userId: req.query.uuid })
				.then((guessData) => {
					if (guessData) {
						res.render("form", {
							userForm: {
								form: guessData.data,
								userId: guessData.userId,
								id: req.params.slug,
							},
						});
					} else {
						Form.findOne({ id: req.params.slug }).then((currentForm) => {
							if (currentForm) {
								const newGuessData = new GuessData({
									userId: req.query.uuid,
									data: currentForm.form,
									formId: req.params.slug,
								});
								newGuessData.save();
								res.render("form", {
									userForm: {
										id: req.params.slug,
										userId: req.query.uuid,
										form: currentForm.form,
									},
								});
							} else {
								res.status(404).send("Form not found");
							}
						});
					}
				})
				.catch((err) => console.log(err));
		} else {
			Form.findOne({ id: req.params.slug })
				.then((currentForm) => {
					if (!req.session.userId) {
						const newUserId = nanoid();
						req.session.userId = newUserId;
					}
					const newGuessData = new GuessData({
						userId: req.session.userId,
						data: currentForm.form,
						formId: req.params.slug,
					});
					newGuessData.save();
					res.render("form", {
						userForm: {
							form: currentForm.form,
							id: req.params.slug,
							userId: req.session.userId,
						},
					});
				})
				.catch((err) => console.log(err));
		}
	}
});

router.post("/form/:slug", (req, res) => {
	if (req.query.uuid) {
		if (req.session.userId !== req.query.uuid) {
			req.session.userId = req.query.uuid;
		}
		GuessData.findOne({ userId: req.query.uuid })
			.then((guessData) => {
				guessData.data = req.body.data;
				guessData.save();
			})
			.catch((err) => console.log(err));
	} else {
		if (!req.session.userId) req.session.userId = nanoid();
		GuessData.findOne({ userId: req.session.userId }).then((guessData) => {
			if (!guessData) {
				const newGuessData = new GuessData({
					userId: req.session.userId,
					formId: req.params.slug,
					data: req.body.data,
				});
				newGuessData.save();
			} else {
				guessData.save();
			}
		});
	}
});

module.exports = router;
