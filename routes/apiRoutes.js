var db = require("../models");
var passport = require("../config/passport");

module.exports = function (app) {

    app.post("/login", passport.authenticate("local"), function (req, res) {
        res.json(req.user);
    });

    // Create a new example
    app.post("/signup", function (req, res) {

        console.log(req.body.username);
        console.log(req.body.email);
        console.log(req.body.password);

        db.User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }).then(function () {
            res.redirect(307, "/login");
        }).catch(function (err) {
            res.status(401).json(err);
        });
    });

    // post 
    app.post("/", function (req, res) {
        res.send(req.body);
        console.log(req.user);
    });
};
