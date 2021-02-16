const db = require('../models');

module.exports = (app) => {
    app.get('/api/suggestions/', (req, res) => {
        db.Suggestions.findAll()
            .then((dbSuggestions) => {
                if (dbSuggestions.length > 0) {
                    res.status(200).json(dbSuggestions);
                }
                else {
                    res.status(404).json(dbSuggestions);
                }

            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    });

    app.post('/api/suggestions/', (req, res) => {
        db.Suggestions.create(req.body)
            .then((dbSuggestions) => {
                res.status(201).json(dbSuggestions)
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    });
};