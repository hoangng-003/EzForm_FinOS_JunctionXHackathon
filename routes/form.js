const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid");
const { GuessData, Form, TempData } = require("../models");

router.get("/form/:slug", (req, res) => {
	if (req.query.preview) {
		Form.findOne({ id: req.params.slug })
			.then((currentForm) => {
				currentForm = currentForm.toObject();
				res.render("form", {
					userForm: {
						form: currentForm.form,
						preview: true,
						userId: "",
						id: currentForm.id,
					},
				});
			})
			.catch((err) => console.log(err));
	} else {
		if (req.query.uuid) {
			if (req.query.uuid !== req.session.userId) {
				req.session.userId = req.query.uuid;
			}
			TempData.findOne({ userId: req.query.uuid })
				.then((TempData) => {
					if (TempData) {
						res.render("form", {
							userForm: {
								form: TempData.data,
								userId: TempData.userId,
								id: req.params.slug,
							},
						});
					} else {
						Form.findOne({ id: req.params.slug }).then((currentForm) => {
							if (currentForm) {
								const newTempData = new TempData({
									userId: req.query.uuid,
									data: currentForm.form,
									formId: req.params.slug,
								});
								newTempData.save();
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
					const newTempData = new TempData({
						userId: req.session.userId,
						data: currentForm.form,
						formId: req.params.slug,
					});
					newTempData.save();
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
	switch (req.body.action) {
		case "save": {
			const newGuessData = new GuessData({
				formId: req.params.slug,
				userId: nanoid(),
				data: req.body.data,
			});
			newGuessData.save();
			break;
		}
		default: {
			if (req.query.uuid) {
				if (req.session.userId !== req.query.uuid) {
					req.session.userId = req.query.uuid;
				}
				TempData.findOne({ userId: req.query.uuid })
					.then((TempData) => {
						TempData.data = req.body.data;
						TempData.save();
					})
					.catch((err) => console.log(err));
			} else {
				if (!req.session.userId) req.session.userId = nanoid();
				TempData.findOne({ userId: req.session.userId }).then((TempData) => {
					if (!TempData) {
						const newTempData = new TempData({
							userId: req.session.userId,
							formId: req.params.slug,
							data: req.body.data,
						});
						newTempData.save();
					} else {
						TempData.save();
					}
				});
			}
			break;
		}
	}
});

module.exports = router;
