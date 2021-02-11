// Requiring npm packages
const express = require('express');
const path = require('path');
const session = require('express');
const passport = require('./config/passport');

// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;
const db = require("./models");

// Setup express middlerware for parsing data
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// use __dirname to ensure assets are always served
app.use(express.static(path.join(__dirname, '/public')));

// Routes
require("./routes/html-routes.js")(app);

// Useing sessions to keep track of user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Set Up EJS
app.set('view engine', 'ejs');
// Ensures the path to the views folder is always reached
app.set('views', path.join(__dirname, '/views'));


// Syncing database and starting server
db.sequelize.sync().then(() => {
    app.listen(PORT, function () {
        console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
    });
});