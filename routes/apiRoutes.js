var db = require("../models");

module.exports = function(app) {

    app.post("/login", passport.authenticate("local"), function(req, res) {
        res.json(req.user);
    });

    // Create a new example
    app.post("/signup", function(req, res) {

        console.log(req.body.username);
        console.log(req.body.email);
        console.log(req.body.password);

        db.User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }).then(function() {
            res.redirect(307, "/login");
        }).catch(function(err) {
            res.status(401).json(err);
        });
    });

    // Delete an example by id
    app.delete("/api/examples/:id", function(req, res) {
        db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
            res.json(dbExample);
        });
    });
};
