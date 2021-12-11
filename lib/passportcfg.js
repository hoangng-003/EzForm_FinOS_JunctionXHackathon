const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
const { User } = require("../models");

// configure passport
const options = {
	domain: process.env.AUTH0_DOMAIN,
	clientID: process.env.AUTH0_CLIENT_ID,
	clientSecret: process.env.AUTH0_CLIENT_SECRET,
	callbackURL:
		process.env.AUTH0_CALLBACK_URL || "http://localhost:3000/callback",
};

const auth0Strategy = new Auth0Strategy(
	options,
	(accessToken, refreshToken, extraParams, profile, done) => {
		// 3. after redirect from the auth.js /login path, this function is called, the profile will be the profile user log in with auth0 url (but not authenticated yet)
		// done() will pass the profile to serializeUser()
		User.findOne({ email: profile.emails[0].value })
			.then((user) => {
				if (user) {
					console.log("user found");
					return done(null, user);
				} else {
					const newUser = new User({
						nickname: profile.nickname,
						email: profile.emails[0].value,
					});
					newUser.save().then((user) => {
						console.log("user created");
						return done(null, user);
					});
				}
			})
			.catch((err) => done(err));
	}
);

passport.use(auth0Strategy);

passport.serializeUser(function (user, done) {
	// 4. now done() will pass the user to req.session.passport.user
	done(null, user);
	// now we have req.session.passport.user = {profile}
	// then passport continue with the /callback path in auth.js
});

passport.deserializeUser(function (user, done) {
	// 8. now passport come up with deserializeUser, we have user after authenticated in /callback path in auth.js
	// you can use console.log(user) to see all the information we have
	// console.log(user);
	done(null, user);
	// now user will be attached to req so we have req.user
});
