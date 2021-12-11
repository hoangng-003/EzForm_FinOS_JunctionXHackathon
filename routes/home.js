var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
	// console.log(res.locals);
	res.render("home", {
		user: req.user,
	});
});

module.exports = router;
