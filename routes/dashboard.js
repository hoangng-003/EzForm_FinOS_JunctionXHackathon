const express = require("express");
const router = express.Router();
const secured = require("../lib/middleware/secured");
const { nanoid } = require("nanoid");
const { User } = require("../models");

router.get("/dashboard", secured(), (req, res) => {
	res.render("dashboard", { forms: req.user.forms });
});

router.post("/dashboard", secured(), (req, res) => {
	switch (req.body.action) {
		case "delete": {
			User.findOne({ email: req.user.email }).then((user) => {
				user.forms = user.forms.filter(
					(form) => form.id !== req.body.formIdToRemove
				);
				req.user.forms = user.toObject().forms;
				user.save();
				res.redirect("/dashboard");
			});
			break;
		}
		case "create": {
			const newFormId = nanoid();
			res.send({ redirect: `/createForm/${newFormId}?preview=true` });
			break;
		}
	}
});

module.exports = router;
