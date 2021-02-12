var db = require("../models");
var passport = require("../config/passport");


module.exports = (app) => {

    app.post("/api/login", passport.authenticate("local"), function (req, res) {
        res.json(req.user);
    });

    app.post("/api/signup", (req, res) => {
        console.log(db.User);
        console.log(db.Org);
        db.User.create({
            email: req.body.email,
            password: req.body.password
        })
            .then(function () {
                res.redirect(307, "/api/login");
            })
            .catch(function (err) {
                res.status(401).json(err);
            });
    });

    app.get("/logout", function (req, res) {
        req.logout();
        res.redirect("/");
    });
}