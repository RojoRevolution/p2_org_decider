const db = require('../models');

module.exports = (app) => {
  app.get('/api/polls/', (req, res) => {
    db.Poll.findAll().then((dbPoll) => res.json(dbPoll));
  });

  app.post('/api/polls/', (req, res) => {
    db.Poll.create(req.body).then((dbPoll) => res.json(dbPoll));
  });
};