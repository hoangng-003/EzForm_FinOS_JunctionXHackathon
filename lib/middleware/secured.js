module.exports = function () {
	return function secured(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}
		req.session.returnTo = req.originalUrl;
		res.redirect("/signin");
	};
};
