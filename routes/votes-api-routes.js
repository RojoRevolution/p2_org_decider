const db = require('../models');

module.exports = (app) => {
    app.get('/api/votes/', (req, res) => {
        db.Votes.findAll()
            .then((dbVotes) => {
                if (dbVotes.length > 0) {
                    res.status(200).json(dbVotes);
                }
                else {
                    res.status(404).json(dbVotes);
                }

            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    });

    app.post('/api/votes/', (req, res) => {
        db.Votes.create(req.body)
            .then((dbVotes) => {
                res.status(201).json(dbVotes)
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    });
};