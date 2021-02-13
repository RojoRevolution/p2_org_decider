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
            res.redirect('/dashboard');
        }
        res.render("login")
        // res.render('login')
    });

    app.get("/dashboard", isAuthenticated, function (req, res) {
        // res.sendFile(path.join(__dirname, "../public/members.html"));
        res.render("/dash-home.html")
    });
}