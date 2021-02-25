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


}