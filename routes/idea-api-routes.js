const db = require('../models');
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = (app) => {
  app.get('/api/ideas/', isAuthenticated, (req, res) => {
    db.Idea.findAll()
    .then((dbIdea) => {
      if (dbIdea.length > 0) {
        res.status(200).json(dbIdea);
      }
      else {
        res.status(404).json(dbIdea);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  });

  app.post('/api/ideas/', isAuthenticated, (req, res) => {
    db.Idea.create(req.body)
    .then((dbIdea) => {
      res.status(201).json(dbIdea);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
  });
};