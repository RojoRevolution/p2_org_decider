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
        // Generic Title / name for main page -- Non Dynamic
        let name = "Welcome to Yay or Nay"
        // grabbing both the category and ID from the table
        db.Category.findAll({
            attributes: [
                'category',
                'id'
            ],
            where: {
                'OrgId': req.user.OrgId
            }
        }).then((dbCategory) => {
            // Empty array variables wills store individual data for name, url, and ids
            let allCategories = [];
            let allLinks = [];
            let allIDs = []
            console.log('===== EMPTY ARRAY =====')
            if (dbCategory.length > 0) {
                // for loop iterates through dbCategory and pushes individual items to empty arrays
                for (let i = 0; i < dbCategory.length; i++) {
                    allIDs.push(dbCategory[i].dataValues.id)
                    allLinks.push('/' + dbCategory[i].dataValues.category)
                    allCategories.push(dbCategory[i].dataValues.category);
                }
            }
            else {
                console.log('No Categories Found')
            }
            console.log(allCategories)
            console.log(allLinks)
            console.log(allIDs)
            // on render, we pass a page title, categories, links, and ID Numbers

            res.render("dash-home", { title: `${name}`, categories: allCategories, links: allLinks, idNum: allIDs });
        })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    });


    // Route for individual category pages
    app.get("/dashboard/:category", isAuthenticated, (req, res) => {
        let name = req.params.category;
        let id = null;
        // let catId = req.params.id;
        // console.log('This category ID is: ', catId)
        console.log(name)
        // grabbing both the category and ID from the table
        db.Category.findAll({
            attributes: [
                'category',
                'id'
            ],
            where: {
                'OrgId': req.user.OrgId
            }
        }).then((dbCategory) => {
            // Empty array variables wills store individual data for name, url, and ids
            let allCategories = [];
            let allLinks = [];
            let allIDs = []
            let catId;
            // for loop iterates through dbCategory and pushes individual items to empty arrays
            if (dbCategory.length > 0) {
                // category = dbCategory;
                for (let i = 0; i < dbCategory.length; i++) {
                    allIDs.push(dbCategory[i].dataValues.id)
                    allLinks.push('/' + dbCategory[i].dataValues.category)
                    allCategories.push(dbCategory[i].dataValues.category);
                    if (dbCategory[i].dataValues.category === name) {
                        id = dbCategory[i].dataValues.id;
                        console.log('id to store as data attribute:', id);
                    }
                }
            }
            else {
                console.log('No Categories Found')
            }
            console.log('htmlroute-categories', allCategories);
            console.log('htmlroute-links', allLinks);
            console.log('htmlroute-ids', allIDs);
            // on render, we pass a page title, categories, links, and ID Numbers
            res.render("category", { title: ` ${name}: Yay or Nay?`, categories: allCategories, links: allLinks, idNum: allIDs, id: id });
        })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });


    });
}

