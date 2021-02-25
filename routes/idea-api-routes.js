// These routes are used for the Suggestions added to the DB - We just never got around to changing the name from Ideas

const db = require('../models');
const isAuthenticated = require("../config/middleware/isAuthenticated");
const { Sequelize } = require('../models');

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

  // Gets all suggestions
  app.post("/api/ideas/", isAuthenticated, (req, res) => {
    console.log('new idea:', req.body);
    db.Idea.create(
      {
        name: req.body.name,
        description: req.body.description,
        UserId: req.user.id,
        CategoryId: req.body.categoryId,
      })
      .then((dbIdea) => {
        console.log({ dbIdea });
        res.status(201).json(dbIdea);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      })
  });

  // Gets individual Suggestion based on ID
  app.get('/api/ideas/:id', isAuthenticated, (req, res) => {
    db.Idea.findOne({
      where: {
        id: req.params.id
      }
    })
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

  // Update specific suggestions - This is primarily used to update the Active Boolean
  app.put('/api/ideas/:id', isAuthenticated, (req, res) => {
    db.Idea.update(
      // Use Sequilize.literal so we can toggle the boolean
      { active: Sequelize.literal('NOT active') },
      {
        where: {
          id: req.params.id
        }
      })
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

  // Update Suggestion Vote Count - This is used to +1 the vote count on each click
  app.put('/api/ideas/vote/up/:id', isAuthenticated, (req, res) => {
    db.Idea.update(
      // Use Sequilize.literal so we can +1 the value
      { votes: Sequelize.literal('votes + 1') },
      {
        where: {
          id: req.params.id
        }
      })
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

  // Update Suggestion Vote Count - This was going to be used to lower the vote count, but we did not get this far with the functionality
  app.put('/api/ideas/vote/down/:id', isAuthenticated, (req, res) => {
    db.Idea.update(
      // Use Sequilize.literal so we can toggle the boolean
      { votes: Sequelize.literal('votes - 1') },
      {
        where: {
          id: req.params.id
        }
      })
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
}