const express = require("express");
const router = express.Router();
const passport = require("passport");
const dotenv = require("dotenv");
const util = require("util");
const url = require("url");
const querystring = require("querystring");

dotenv.config();

// if user click on login
// 1. come here first
router.get(
	"/signin",
	// redirect to auth0 callbackURL, in this case, it will be http://localhost:3000/callback
	// 2. passport now will come up with the strategy defined in server.js with scope openid email profile
	passport.authenticate("auth0", {
		scope: "openid email profile",
	})
);

router.get("/callback", function (req, res, next) {
	passport.authenticate("auth0", function (err, user, info) {
		// 5. after serializeUser, we are in the /callback route, so that this function is called
		// in this case, req.user will be undefined because is not logged in
		// BUT user will be the req.session.passport.user we have after user serializeUser

		// pass middleware with error
		if (err) {
			return next(err);
		}
		// redirect to /signin again if user is undefined
		if (!user) {
			return res.redirect("/signin");
		}
		// 6. now try to login in the auth0 route
		req.logIn(user, function (err) {
			// pass middleware with error
			if (err) {
				return next(err);
			}
			// if success, redirect to home page
			// console.log(req.session.returnTo);
			res.redirect(req.session.returnTo || "/dashboard");
			// now req.user will be the user argument
			// 7. then passport will use deserializeUser to attach again only the information we need to req.user, for example we only need email and nickname
		});
	})(req, res, next);
});

// Perform session logout and redirect to homepage
router.get("/signout", (req, res) => {
	req.logout();
	let returnTo = req.protocol + "://" + req.hostname;
	let port = req.socket.localPort;
	if (port !== undefined && port !== 80 && port !== 443) {
		returnTo += ":" + port;
	}
	const logoutURL = new url.URL(
		util.format("https://%s/v2/logout", process.env.AUTH0_DOMAIN)
	);
	const searchString = querystring.stringify({
		client_id: process.env.AUTH0_CLIENT_ID,
		returnTo: returnTo,
	});
	logoutURL.search = searchString;
	res.redirect(logoutURL);
});

module.exports = router;
