const db = require('../models');

module.exports = (app) => {
  app.get('/api/users/', (req, res) => {
    db.User.findAll().then((dbUser) => {
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

  app.post('/api/users/', (req, res) => {
    console.log(req.body);
    db.User.create(req.body).then((dbUser) => res.json(dbUser));
  });
};