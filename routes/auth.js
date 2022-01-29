const express = require("express");
const router = express.Router();
const passport = require("passport");
const dotenv = require("dotenv");

dotenv.config();

// if user click on login
// 1. come here first
router.get(
	"/signin",
	// redirect to auth0 callbackURL, in this case, it will be http://localhost:3000/callback
	// 2. passport now will come up with the strategy defined in passportcfg.js with scope openid email profile
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
	const returnUrl = encodeURIComponent(
		`${req.protocol}://${req.hostname}:${process.env.PORT || 3000}`
	);
	req.logout();
	req.session.destroy((err) => {
		res.clearCookie("connect.sid");
		res.redirect(
			`https://${process.env.AUTH0_DOMAIN}/v2/logout?returnTo=${returnUrl}&client_id=${process.env.AUTH0_CLIENT_ID}`
		);
	});
});

module.exports = router;
