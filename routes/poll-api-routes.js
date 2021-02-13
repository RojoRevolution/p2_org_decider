const db = require('../models');

module.exports = (app) => {
  app.get('/api/polls/', (req, res) => {
    db.Poll.findAll()
    .then((dbPoll) => {
      if (dbPoll.length > 0) {
        res.status(200).json(dbPoll);
      } 
      else {
        res.status(404).json(dbPoll);
      }
      
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  });

  app.post('/api/polls/', (req, res) => {
    db.Poll.create(req.body)
    .then((dbPoll) => {
      res.status(201).json(dbPoll)
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
  });
};