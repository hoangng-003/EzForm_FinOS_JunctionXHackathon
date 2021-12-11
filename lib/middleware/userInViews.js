module.exports = function () {
	return function (req, res, next) {
		// if not authenticated, req.user will be undefined
		res.locals.user = req.user;
		// res.locals.session = req.session;
		next();
	};
};
