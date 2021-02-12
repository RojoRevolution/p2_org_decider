const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const db = require('../models');

// Validating login with username and password
passport.use(new LocalStrategy(
    {
        usernameField: 'email'
    },
    function (username, password, done) {
        db.User.findOne({
            where: {
                email: email
            }
        }).then((dbUser) => {
            if (!dbUser) {
                return done(null, false, {
                    message: 'Incorrect username.'
                });
            }
            else if (!dbUser.validPassword(password)) {
                return done(null, false, {
                    massage: 'Incorrect password.'
                });
            }
            return done(null, dbUser);
        });
    }
));

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

module.exports = passport;