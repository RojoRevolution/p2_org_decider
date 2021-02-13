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
        // check if Org already exists
        db.Org.findAll({
            where: {
                name: req.body.org
            }
        })
        .then((dbOrg) => {
            console.log('SIGNUP: dbOrg', dbOrg);
            // If array contains results then create a User under that Org
            if (dbOrg.length > 0) {
                console.log('200 Org:', req.body.org, 'Found');
                res.status(200);
                // creates the new User
                signUser(dbOrg, req.body, res);
            }
            else {
                // If not matching Orgs are found, create one
                console.log('404 Org:', req.body.org, 'Not Found');
                res.status(404);
                db.Org.create({ name: req.body.org })
                .then(() => {
                    db.Org.findAll({
                        where: {
                            name: req.body.org
                        }
                    })
                    .then((newOrg) => {
                        // creates the new User after a new Org was created
                        signUser(newOrg, req.body, res);
                    });
                });
            }
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    });

    // Post route for logging out
    app.get("/logout", (req, res) => {
        req.logout();
        res.redirect("/");
    });
};

const signUser = (dbOrg, body, res) => {
    // If the Org name matches then create a User
    for (let i = 0; dbOrg.length > i; i++) {
        if (dbOrg[i].name === body.org) {
            db.User.create({
                email: body.email,
                password: body.password,
                OrgId: dbOrg[i].id
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
            return;
        }
    }
};
