const path = require("path");

// Will need to add isAuthenticated Middleware here

module.exports = (app) => {
    // Homepage Route
    app.get('/', (req, res) => {
        // will need to add Authentication logic here. For now, simple sending file
        // res.send('Hello')
        res.render('index')
    });
    // Sign Up Route
    app.get('/login', (req, res) => {
        // will need to add Authentication logic here. For now, simple sending file
        // res.send('Hello')
        res.render('login')
    });

    app.get('/dashboard', (req, res) => {
        // will need to add Authentication logic here. For now, simple sending file
        // res.send('Hello')
        res.render('dash-home')
    });
}