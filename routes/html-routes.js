const path = require("path");

const isAuthenticated = require('../config/middleware/isAuthenticated');

module.exports = (app) => {
    // Homepage Route
    app.get('/', (req, res) => {
        if (req.user) {
            res.redirect('/dashboard');
        }

        res.render('index')
    });

    app.get('/index', (req, res) => {
        if (req.user) {
            res.redirect('/dashboard');
        }

        res.render('index')
    });

    // Sign Up Route
    app.get('/login', (req, res) => {
        if (req.user) {
            //// I used /dashboard route here. We could alternatively redirect the user to a /user route here instead but I'm not sure what the best option would be. -Trevor
            res.redirect('/dashboard');
        }
        res.render("login")
        // res.render('login')
    });

    // app.get('/dashboard', isAuthenticated, function (req, res) {

    //     res.render("/dash-home.html")
    // });

    app.get("/dashboard", isAuthenticated, function (req, res) {
        // res.sendFile(path.join(__dirname, "../public/members.html"));
        res.render("/dash-home.html")
    });
}