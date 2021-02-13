var db = require("../models");
var passport = require("../config/passport");


module.exports = (app) => {
    // Post routes for logging in
    app.post("/api/login", passport.authenticate("local"), (req, res) => {
        console.log('///// API LOGIN ////');
        console.log(req.user);
        res.json(req.user);
    });
    // Post routes for signing up
    app.post("/api/signup", (req, res) => {
        console.log('//// API SIGNUP ////');
        console.log(req.body);
        let org;
        db.Org.findAll().then((dbOrg) => {
            console.log('SIGNUP: dbOrg', dbOrg);
            res.status(200);
            org = dbOrg;
        })
        .catch((err) => {
            console.log(err);
            return res.status(404).json(err);
        });
        db.User.create({
            email: req.body.email,
            password: req.body.password,
        });
        db.Org.create({
            name: req.body.org
        })
        .then(() => {
            console.log('====================');
            console.log('REDIRECTING TO LOGIN');
            console.log('====================');
            res.redirect(307, "/api/login");
        })
        .catch((err) => {
            console.log(err);
            res.status(401).json(err);
        });
    });

    // Post route for logging out
    app.get("/logout", (req, res) => {
        req.logout();
        res.redirect("/");
    });
}