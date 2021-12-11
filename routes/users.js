const express = require("express");
const secured = require("../lib/middleware/secured");
const router = express.Router();

/* GET user profile. */
router.get("/user", secured(), function (req, res, next) {
	const { _raw, _json, ...userProfile } = req.user;
	if (req.session.count) {
		req.session.count++;
	} else {
		req.session.count = 1;
	}
	res.render("user", {
		userProfile: JSON.stringify(userProfile, null, 2),
		title: "Profile page",
		count: req.session.count,
		userEmail: req.session.passport.user.emails[0].value,
	});
});

module.exports = router;
