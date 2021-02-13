// Requiring npm packages
const express = require('express');
const path = require('path');
const session = require('express-session');
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



// Useing sessions to keep track of user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Routes
require('./routes/html-routes.js')(app);
require('./routes/api-routes.js')(app);
require('./routes/org-api-routes.js')(app);
require('./routes/user-api-routes.js')(app);
require('./routes/poll-api-routes.js')(app);
require('./routes/idea-api-routes.js')(app);

// Set Up EJS
app.set('view engine', 'ejs');
// Ensures the path to the views folder is always reached
app.set('views', path.join(__dirname, '/views'));


// Syncing database and starting server
db.sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, function () {
        console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
    });
});