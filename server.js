// Require dot evironment
require("dotenv").config();

// Dependencies
var express = require("express");
var PORT = process.env.PORT || 3000;
var db = require("./models");
var session = require("express-session");
var exphbs = require("express-handlebars");
var passport = require("./config/passport");
var app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Track user's login status
app.use(session({ secret: "sjwpibadrp", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Handlebars
app.engine(
    "hbs",
    exphbs({
        defaultLayout: "main",
        extname: ".hbs",
        layoutsDir: "views/layouts/",
    })
);
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// Set syncOptions
var syncOptions = { force: false };

// For test, set syncOptions.force to true to clear the `testdb`
if (process.env.NODE_ENV === "test") {
    syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
    app.listen(PORT, function() {
        console.log(
            "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
            PORT,
            PORT
        );
    });
});

module.exports = app;
