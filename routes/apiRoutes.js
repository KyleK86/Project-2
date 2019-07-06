var db = require("../models");
var passport = require("../config/passport");
const {check, validationResult } = require("express-validator");

module.exports = function (app) {

    app.post("/api/login", passport.authenticate("local"), function (req, res) {
        res.json(req.user);
    });

    // Create a new example
    app.post("/api/signup", [
        check("username")
        .not().isEmpty().withMessage("Username field cannot be empty.")
        .isLength(4, 15).withMessage("Username must be between 4-15 characters long.")
        .custom((username) => {
            return db.User.findOne({
                where: {
                    username: username
                }
            }).then(user => {
                if (user) {
                    return Promise.reject("Username already in use.");
                }
            });
        }),
        check("email")
        .not().isEmpty().withMessage("Password field cannot be empty.")
        .isEmail().withMessage("Must use a valid email address.")
        .custom((email) => {
            return db.User.findOne({
                where: {
                    email: email
                }
            }).then(user => {
                if (user) {
                    return Promise.reject("Email already in use.");
                }
            });
        }),
        check("password")
        .not().isEmpty().withMessage("Password field cannot be empty.")
        .isLength(8, 65).withMessage("Password must be between 8-60 characters long."),
        check("password-check")
        .custom((value, { req }) => {
            console.log(req.body);
            
            console.log(`Value: ${value}`);
            
            if (value !== req.body.password) {
                console.log(`Password: ${req.body.password}`);
                return Promise.reject("Passwords do not match.");
            } else {
                return value;
            }
        })
        .isLength(8, 65).withMessage("Password must be between 8-60 characters long.")
    ], (req, res) => {
        var errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.session.errors = errors;
            req.session.success = false;
            res.redirect('signup');
        } else {
            db.User.create({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
    
            }).then(function (user) {
                req.session.success = true;
                // redirect to the api login route to do a user auth. 
                res.redirect(307, "/api/login");
                db.Gotchi.create({
                    gotchiName: req.body.gotchiName,
                    gotchiPicture: req.body.gotchiPicture,
                    gotchiType: req.body.gotchiType,
                    UserId: user.dataValues.id
    
                }).then(function (gotchi) {
                    console.log(gotchi);
    
                }).catch(function (err) {
                    console.log(err);
                });
            });
        }

    });

    app.get("/logout", function(req, res) {
        req.logout();
        res.redirect("/login");
    });
};
