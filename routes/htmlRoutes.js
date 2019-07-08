
// Dependencies
var db = require("../models");

module.exports = function (app) {

    // Load signup page on default route
    app.get("/", function (req, res) {
        // Meta tags sent to hbs
        res.locals.metaTags = { 
            title: "Robogotichi • | • Home",
        }; 
        if (!req.user) {
            res.redirect("/signup");
            return;
        }
        db.Gotchi.findOne({
            where: {
                userId: req.user.id
            }
        }).then(function (awesomeObject) {
            // res.json(awesomeObject);
            res.render("index", awesomeObject);
        });
    });

    // Load login page
    app.get("/login", function (req, res) {
        // Meta tags sent to hbs
        res.locals.metaTags = { 
            title: "Robogotichi • | • Login",  
        };
        // If user found send to index otherwise render login
        if (req.user) {
            res.redirect("/");
        }
        res.render("login");
    });

    // Load signup page
    app.get("/signup", function (req, res) {
        // Meta tags sent to hbs
        res.locals.metaTags = { 
            title: "Robogotichi • | • Signup",  
        };
        var errorObj = req.session.errors;
        res.render("signup", errorObj);
        delete req.session.errors;
    });

    // Load login page when user logs out  
    app.get("/logout", function(req, res) {
        req.logout();
        res.redirect("/login");
    });

    // Render 404 page for any unmatched routes
    app.get("*", function (req, res) {
        // Meta tags sent to hbs
        res.locals.metaTags = { 
            title: "Robogotichi is Confused...",  
        };
        res.render("404");
    });
};
