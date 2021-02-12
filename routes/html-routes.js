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
        res.render('login')
    });

    // app.get('/dashboard', isAuthenticated, (req, res) => {
    app.get('/dashboard', (req, res) => {
        // will need to add Authentication logic here. For now, simple sending file
        // res.send('Hello')
        res.render('dash-home')
    });
}