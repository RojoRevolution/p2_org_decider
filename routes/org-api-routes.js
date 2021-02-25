// Get and POST routes for the organization table. Used on account creation and when logging in

const db = require('../models');
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = (app) => {
  app.get('/api/orgs/', isAuthenticated, (req, res) => {
    db.Org.findAll()
      .then((dbOrg) => {
        if (dbOrg.length > 0) {
          res.status(200).json(dbOrg);
        }
        else {
          res.status(404).json(dbOrg);
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  app.post('/api/orgs/', isAuthenticated, (req, res) => {
    db.Org.create(req.body)
      .then((dbOrg) => {
        res.status(201).json(dbOrg);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  });
};