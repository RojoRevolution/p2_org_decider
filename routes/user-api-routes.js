const db = require('../models');

module.exports = (app) => {
  app.get('/api/users/', (req, res) => {
    db.User.findAll().then((dbUser) => res.json(dbUser));
  });

  app.post('/api/users/', (req, res) => {
    console.log(req.body);
    db.User.create(req.body).then((dbUser) => res.json(dbUser));
  });
};