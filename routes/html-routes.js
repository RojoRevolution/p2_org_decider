const path = require("path");

const isAuthenticated = require('../config/middleware/isAuthenticated');

module.exports = (app) => {
    // Homepage Route
    app.get('/', (req, res) => {
        if (req.user) {
            res.redirect('/dashboard');
        }
        res.render('index');
    });

    app.get('/index', (req, res) => {
        if (req.user) {
            res.redirect('/dashboard');
        }
        res.render('index');
    });

    // Sign Up Route
    app.get('/login', (req, res) => {
        if (req.user) {
            res.redirect('/dashboard');
        }
        res.render("login");
    });
    // Main Dashboard Page
    app.get("/dashboard", isAuthenticated, (req, res) => {
        console.log('//// HTML ROUTE ////');
        console.log(req.user);
        res.render("dash-home");
    });

    // Dashboard Category Pages
    app.get("/category", isAuthenticated, (req, res) => {
        res.render("category");
    });
}