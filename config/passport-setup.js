const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const keys = require('./keys');
const User = require('../models/user');

passport.use(
    new GoogleStrategy({
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/redirect'
        //proxy: true
    }, (accessToken, refreshToken, profile, done) => {
        // passport callback function
        console.log('passport callback function fired:');
        console.log(profile);
        new User({
            googleId: profile.id,
            username: profile.displayName,
            first_name: profile.name.givenName,
            last_name: profile.name.familyName
        }).save().then((newUser) => {
            console.log('new user created: ', newUser);
        });
    })
);

































/*
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20');
//var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const keys = require('./keys');
/*
let user = {};

passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((user, cb) => {
    cb(null, user);
});

passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: keys.GOOGLE_CLIENT_ID,
        clientSecret: keys.GOOGLE_CLIENT_SECRET,
        callbackURL: `http://localhost:3000/auth/google/callback`,
        scope: ['profile', 'email']
    },
        function (accessToken, refreshToken, profile, cb) {
            User.findOrCreate({ googleId: profile.id }, function (err, user) {
                return cb(err, user);
            });
        }
    ));
*/

/*
// Google Strategy
passport.use(new GoogleStrategy({
    clientID: keys.GOOGLE.clientID,
    clientSecret: keys.GOOGLE.clientSecret,
    callbackURL: "/auth/google/callback"
},
(accessToken, refreshToken, profile, cb) => {
    console.log(chalk.blue(JSON.stringify(profile)));
    user = { ...profile };
    return cb(null, profile);
}));
*/