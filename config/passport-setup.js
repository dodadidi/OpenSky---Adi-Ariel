const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const {CLIENT_ID, CLIENT_SECRET} = require('../constants');

const User = require('../models/user');

passport.serializeUser((user, done) => {
    console.log(user);
    done(null, user._id);
});

passport.deserializeUser((_id, done) => {
    console.log(_id);
    User.findById(_id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
        clientID: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        callbackURL: 'https://opensky12345.herokuapp.com/auth/google/redirect'
        //proxy: true
    },  (accessToken, refreshToken, profile, done) => {
        // check if user already exists in our own db
        User.findOne({googleId: profile.id}).then((currentUser) => {
            if(currentUser){
                // already have this user
                console.log('user is: ', currentUser);
                req.cuurentUser = currentUser;
                done(null, currentUser);
            } else {
                // if not, create user in our db
                const newUser = new User({
                    googleId: profile.id,
                    admin: "false",
                    username: profile.displayName,
                    first_name: profile.name.givenName,
                    last_name: profile.name.familyName,
                    picture: profile._json.picture
                })
                newUser.save().then(() => {
                    console.log('created new user: ', newUser);
                    req.cuurentUser = newUser;
                    done(null, newUser);
                });
            }
        });
    })
);