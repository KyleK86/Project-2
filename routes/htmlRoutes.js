var path = require("path");

var db = require("../models");
var path = require("path");

module.exports = function(app) {
    // Load index page
    app.get("/", function(req, res) {
        db.Example.findAll({}).then(function(err, awesomeObject) {
            res.render("index", awesomeObject); 
        });

        // loads login.html
        app.get("/", function(req, res) {
            res.sendFile(path.join(__dirname, "../views/login.html"));
        });

        // loads signup.html
        app.get("/signup", function(req, res) {
            res.sendFile(path.join(__dirname, "../views/signup.html"));
        });

        // loads create.html
        app.get("/create", function(req, res) {
            res.sendFile(path.join(__dirname, "../views/create.html"));
        });

        // loads main.html
        app.get("/main", function(req, res) {
            res.sendFile(path.join(__dirname, "../views/main.html"));
        });
    
        // Render 404 page for any unmatched routes
        app.get("*", function(req, res) {
            res.render("404");
        });
    });
};
