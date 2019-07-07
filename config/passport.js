
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var db = require("../models");

passport.use(new LocalStrategy(
    {
        usernameField: "username"
    },
    function(username, password, done) {
        db.User.findOne({
            where: {
                username: username
            }
        }).then(function(dbUser) {
 
            // If there's no user with the given email
            if (!dbUser) {
                return done(null, false, {
                    message: "Username does not exist."
                });
            }

            // If there is a user with the given email, but the password the user gives us is incorrect
            else if (!dbUser.verifyPassword(password)) {
                
                return done(null, false, {
                    message: "Incorrect password."
                });
            }

            // If none of the above, return the user
            return done(null, dbUser);
        });
    }
));

// Sequelize needs to serialize and deserialize the user to keep authentication state across HTTP requests
passport.serializeUser(function(user, cb) {
    cb(null, user);
});
  
passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});
  
module.exports = passport;