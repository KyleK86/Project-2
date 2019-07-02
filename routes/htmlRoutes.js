var db = require("../models");
var path = require("path");

module.exports = function (app) {


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
            console.log("awewsome object", awesomeObject.dataValues);
            res.render("index", awesomeObject.dataValues);
        });
    });

    app.get("/login", function (req, res) {
        // If the user already has an account send them to the members page
        if (req.user) {
            res.redirect("/");
        }
        res.sendFile(path.join(__dirname, "../views/login.html"));
    });


    // loads signup.html
    app.get("/signup", function (req, res) {
        res.sendFile(path.join(__dirname, "../views/signup.html"));
    });

    // Render 404 page for any unmatched routes
    app.get("*", function (req, res) {
        res.render("404");
    });
};