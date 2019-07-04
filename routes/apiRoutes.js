var db = require("../models");
var passport = require("../config/passport");


module.exports = function (app) {

    app.post("/api/login", passport.authenticate("local"), function (req, res) {
        res.json(req.user);
    });

    // Create a new example
    app.post("/api/signup", function (req, res) {

        console.log(req.body.username);
        console.log(req.body.email);
        console.log(req.body.password);

        db.User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }).then(function (user) {
            console.log("userId", user.dataValues.id);
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
        }).catch(function (err) {
            console.log(err);
            res.status(401).json(err);
        });
    });

    app.get("/logout", function(req, res) {
        req.logout();
        res.redirect("/login");
    });
};

app.put("/api/gotchi/:id", function(req, res) {
    if (!req.user) {
        res.redirect("/login");
    } else {
        db.gotchi.update(
            req.body,
            {
                where: {
                    UserId: req.params.id
                }
            }).then(function(gotchi) {
            res.json(gotchi);
        });
    }
});