const db = require('../models');

module.exports = (app) => {
  app.get('/api/ideas/', (req, res) => {
    db.Idea.findAll().then((dbIdea) => res.json(dbIdea));
  });

  app.post('/api/ideas/', (req, res) => {
    db.Idea.create(req.body).then((dbIdea) => res.json(dbIdea));
  });
};