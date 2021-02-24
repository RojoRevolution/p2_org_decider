const path = require("path");
var db = require("../models");
var passport = require("../config/passport");
const isAuthenticated = require('../config/middleware/isAuthenticated');


module.exports = (app) => {
    // Homepage Route
    app.get('/', (req, res) => {
        if (req.user) {
            res.redirect('/dashboard');
        }
        res.render('index');
    });

    app.get('/index', (req, res) => {
        if (req.user) {
            res.redirect('/dashboard');
        }
        res.render('index');
    });

    // Sign Up Route
    app.get('/login', (req, res) => {
        if (req.user) {
            res.redirect('/dashboard');
        }
        res.render("login");
    });

    // Main Dashboard Page
    app.get("/dashboard", isAuthenticated, (req, res) => {
        console.log('//// HTML ROUTE ////');
        let name = "Welcome to Yay or Nay"
        db.Category.findAll({
            attributes: [
                'category',
                'id'
            ],
        }).then((dbCategory) => {
            let allCategories = [];
            let allLinks = [];
            let allIDs = []
            console.log('===== EMPTY ARRAY =====')
            if (dbCategory.length > 0) {
                // category = dbCategory;
                for (let i = 0; i < dbCategory.length; i++) {
                    allIDs.push(dbCategory[i].dataValues.id)
                    allLinks.push('/' + dbCategory[i].dataValues.category)
                    allCategories.push(dbCategory[i].dataValues.category);
                }
            }
            else {
                console.log('No Categories Found')
                // res.status(404).json(category);
            }
            console.log(allCategories)
            console.log(allLinks)
            console.log(allIDs)

            res.render("dash-home", { title: `${name}`, categories: allCategories, links: allLinks, idNum: allIDs });
        })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
        // res.render("dash-home", { title: 'Dashboard | Yay or Nay' });
    });

    // Dashboard Category Pages
    // This will mot likely need to be a /:category path that takes in the category name

    app.get("/dashboard/:category", isAuthenticated, (req, res) => {
        let name = req.params.category;
        console.log(name)
        db.Category.findAll({
            attributes: [
                'category',
                'id'
            ],
        }).then((dbCategory) => {
            let allCategories = [];
            let allLinks = [];
            let allIDs = []
            console.log('===== EMPTY ARRAY =====')
            if (dbCategory.length > 0) {
                // category = dbCategory;
                for (let i = 0; i < dbCategory.length; i++) {
                    allIDs.push(dbCategory[i].dataValues.id)
                    allLinks.push('/' + dbCategory[i].dataValues.category)
                    allCategories.push(dbCategory[i].dataValues.category);
                }
            }
            else {
                console.log('No Categories Found')
                // res.status(404).json(category);
            }
            console.log(allCategories)
            console.log(allLinks)
            console.log(allIDs)

            res.render("category", { title: ` ${name}: Yay or Nay?`, categories: allCategories, links: allLinks, idNum: allIDs });
        })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });

        // res.render("category", {
        //     title: `${name} | Yay or Nay`
        // });
    });
}


// const getCategories = () => {
//     db.Category.findAll({
//         attributes: [
//             'category'
//         ],
//     }).then((dbCategory) => {
//         let allCategories = [];
//         console.log('===== EMPTY ARRAY =====')
//         if (dbCategory.length > 0) {
//             // category = dbCategory;
//             for (let i = 0; i < dbCategory.length; i++) {
//                 allCategories.push(dbCategory[i].dataValues.category);
//             }
//         }
//         else {
//             console.log('No Categories Found')
//             // res.status(404).json(category);
//         }
//         res.render("dash-home", { title: 'Dashboard | Yay or Nay', categories: allCategories });
//     })
//         .catch((err) => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// }