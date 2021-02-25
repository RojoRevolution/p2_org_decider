const db = require('../models');
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = (app) => {
  app.post("/api/categories/", isAuthenticated, (req, res) => {
    console.log('new category:', req.body);
    db.Category.create(
        {
            category: req.body.category,
            UserId: req.user.id,
            OrgId: req.user.OrgId
        })
        .then((dbCategory) => {
            // console.log({ dbCategory });
            res.status(201).json(dbCategory);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        })
});

app.get("/api/categories", isAuthenticated, (req, res) => {
    db.Category.findAll(
        {
            where: {
                OrgId: req.user.OrgId
            }
        })
        .then((dbCategory) => {
            // console.log({ dbCategory });
            res.status(200).json(dbCategory);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        })
});
};