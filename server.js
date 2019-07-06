
// Dependencies
require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");


var db = require("./models");
var app = express();
var PORT = process.env.PORT || 3000;


// Auth packages
var session = require("express-session");
var passport = require("./config/passport");


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
    "handlebars",
    exphbs({
        defaultLayout: "main",
        layoutsDir: "views/layouts/"
    })
);
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);


var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
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
