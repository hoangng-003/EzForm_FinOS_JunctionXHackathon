const express = require("express");
const router = express.Router();
const secured = require("../lib/middleware/secured");
const { nanoid } = require("nanoid");
const { User, Form } = require("../models");
const fs = require("fs");

const customerInformation = fs.readFileSync(
	"./html/CustomerInformation.html",
	"utf8"
);
const customerSurvey = fs.readFileSync("./html/CustomerSurvey.html", "utf8");
const loansProfile = fs.readFileSync("./html/LoansProfile.html", "utf8");
const propertyDeclaration = fs.readFileSync(
	"./html/PropertyDeclaration.html",
	"utf8"
);

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
			res.send({ redirect: `/createForm/${newFormId}` });
			break;
		}
		case "template": {
			const newFormId = nanoid();
			let newForm;
			switch (req.body.templateId) {
				case "customer-information":
					newForm = new Form({
						id: newFormId,
						name: "Blank Template",
						form: customerInformation,
					});
					break;
				case "customer-survey":
					newForm = new Form({
						id: newFormId,
						name: "Blank Template",
						form: customerSurvey,
					});
					break;
				case "loans-profile":
					newForm = new Form({
						id: newFormId,
						name: "Blank Template",
						form: loansProfile,
					});
					break;
				case "property-declaration":
					newForm = new Form({
						id: newFormId,
						name: "Blank Template",
						form: propertyDeclaration,
					});
					break;
			}
			newForm.save();
			User.findOne({ email: req.user.email }).then((user) => {
				user.forms.push(newForm);
				req.user.forms = user.forms;
				user.save();
			});
			res.send({
				redirect: `/createForm/${newFormId}`,
			});
			break;
		}
		case "update": {
			console.log("hi");
			User.findOne({ email: req.user.email }).then((user) => {
				req.user.forms = user.forms;
			});
			res.redirect("/dashboard");
			break;
		}
	}
});

module.exports = router;
