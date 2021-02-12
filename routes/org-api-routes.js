const db = require('../models');

module.exports = (app) => {
  app.get('/api/orgs/', (req, res) => {
    db.Org.findAll().then((dbOrg) => res.json(dbOrg));
  });

  app.post('/api/orgs/', (req, res) => {
    db.Org.create(req.body).then((dbOrg) => res.json(dbOrg));
  });

};