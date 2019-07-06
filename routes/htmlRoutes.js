
// Dependencies
var db = require("../models");
var path = require("path");


module.exports = function (app) {

    // Load signup page on default route
    app.get("/", function (req, res) {
        if (!req.user) {
            res.redirect("/signup");
            return;
        }
        db.Gotchi.findOne({
            where: {
                userId: req.user.id
            }
        }).then(function (awesomeObject) {
            res.render("index", awesomeObject);
        });
    });

    // Load login page
    app.get("/login", function (req, res) {
        // If the user already has an account send them to the members page
        if (req.user) {
            res.redirect("/");
        }
        res.sendFile(path.join(__dirname, "../views/login.html"));
    });

    // Load signup page
    app.get("/signup", function (req, res) {
        var errorObj = req.session.errors;
        res.render("signup", errorObj);
    });

    // Load login page when user logs out  
    app.get("/logout", function(req, res) {
        req.logout();
        res.redirect("/login");
    });

    // Render 404 page for any unmatched routes
    app.get("*", function (req, res) {
        res.render("404");
    });
};
