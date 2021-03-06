// Get route used to retreive user info

const db = require('../models');
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = (app) => {
  app.get('/api/users/', isAuthenticated, (req, res) => {
    db.User.findAll()
      .then((dbUser) => {
        if (dbUser.length > 0) {
          res.status(200).json(dbUser);
        }
        else {
          res.status(404).json(dbUser);
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });
};