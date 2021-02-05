const passport = require('passport')
const { Router } = require ('express' );
//const passportSetup = require('../config/passport-setup');
const authRouter = new Router();

// auth login
authRouter.get('/login', (req, res) => {
    res.render('login', { user: req.user });
});

// auth logout
authRouter.get('/logout', (req, res) => {
    // handle with passport
    res.send('logging out');
});

// auth with google+
authRouter.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
authRouter.get('/google/redirect', passport.authenticate('google', {scope: ['profile']}), (req, res) => {
//authRouter.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.send(req.user);
    //////////////To profile user page/////////////
});

module.exports = {authRouter}





/*
const { Router } = require('express');
const passportSetup = require('../config/passport-setup');
const passport = require('passport');
const authRouter = new Router();

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
*/
/*
// auth login
authRouter.get('/login', (req, res) => {
    res.render('login', { user: req.user });
});

// auth logout
authRouter.get('/logout', (req, res) => {
    // handle with passport
    res.send('logging out');
});

// auth with google+
authRouter.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
authRouter.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.send('you reached the redirect URI');
});

module.exports = { authRouter };

*/