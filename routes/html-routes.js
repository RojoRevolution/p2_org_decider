const path = require("path");

// Will need to add isAuthenticated Middleware here

module.exports = (app) => {
    app.get('/', (req, res) => {
        // will need to add Authentication logic here. For now, simple sending file
        res.render('index')
    })
}