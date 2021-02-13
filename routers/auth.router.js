const passport = require('passport')
const { Router } = require('express');
//const passportSetup = require('../config/passport-setup');
const authRouter = new Router();
const CLIENT_HOME_PAGE_URL = "http://localhost:3000";

// when login is successful, retrieve user info
authRouter.get("/login/success", (req, res) => {
    if (req.user) {
        res.json({
            success: true,
            message: "user has successfully authenticated",
            user: req.user,
            cookies: req.cookies
        });
    }
});

// when login failed, send failed msg
authRouter.get("/login/failed", (req, res) => {
    res.status(401).json({
        success: false,
        message: "user failed to authenticate."
    });
});

// When logout, redirect to client
authRouter.get("/logout", (req, res) => {
    req.logout();
    res.redirect(CLIENT_HOME_PAGE_URL);
});

// auth with google+
authRouter.get("/google", passport.authenticate("google",  {scope: 'https://www.googleapis.com/auth/plus.login'}));
//authRouter.get('/google', passport.authenticate('google'));

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
/*
authRouter.get('/google/redirect', passport.authenticate('google', {scope: ['profile']}), (req, res) => {
//authRouter.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.send(req.user);
    //////////////To profile user page/////////////
});
*/
authRouter.get("/google/redirect",
    passport.authenticate("google", {
        successRedirect: CLIENT_HOME_PAGE_URL,
        failureRedirect: "/auth/login/failed"
    })
);

module.exports = { authRouter }
