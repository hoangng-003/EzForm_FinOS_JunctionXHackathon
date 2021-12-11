const authRouter = require("./auth");
const usersRouter = require("./users");
const homeRouter = require("./home");
const dashboardRouter = require("./dashboard");
const formRouter = require("./form");
const createFormRouter = require("./createForm");

module.exports = {
	authRouter,
	usersRouter,
	homeRouter,
	dashboardRouter,
	createFormRouter,
	formRouter,
};
