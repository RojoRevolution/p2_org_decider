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
        // const pageTitle = "Dashboard | Yay Or N"
        // console.log('/////// PAGE TITLE //////')
        // console.log({ pageTitle })
        res.render("dash-home", { title: 'Dashboard | Yay or Nay' });
    });

    // Dashboard Category Pages
    // This will mot likely need to be a /:category path that takes in the category name
    app.get("/dashboard/:category", isAuthenticated, (req, res) => {
        // This is placeholder until we get the DB working
        let name = req.params
        let categories = []

        res.render("category", {
            title: `${name} | Yay or Nay`
        });
    });
}