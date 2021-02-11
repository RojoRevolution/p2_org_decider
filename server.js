// Requiring npm packages
const express = require('express');
const path = require('path');

// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;
const db = require("./models");

// Setup express middlerware for parsing data
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Set Up EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// Routes
require("./routes/html-routes.js")(app);


// Syncing database and starting server
db.sequelize.sync().then(() => {
    app.listen(PORT, function () {
        console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
    });
});