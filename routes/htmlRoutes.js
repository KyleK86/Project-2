module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Robogatchi.findAll({}).then(function(Characters) {
      res.render("index", {
        msg: "Welcome!",
        Robogatchis: Characters
      });
    });
  });

  // loads login.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // loads signup.html
  app.get("/signup", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  // loads create.html
  app.get("/create", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/create.html"));
  });

  // loads main.html
  app.get("/main", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/main.html"));
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
