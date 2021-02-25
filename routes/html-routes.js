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

    // ==========================================
    // ==========================================
    //  MAIN DASHBOARD PAGE
    // ==========================================
    // ==========================================

    // Get Route that grabs all available Categories for the logged in user
    app.get("/dashboard", isAuthenticated, (req, res) => {
        // Generic Title / name for main page -- Non Dynamic
        let name = "Welcome to Yay or Nay"
        // Empty Array Variables will store info from the DB
        let allCategories = [];
        let allLinks = [];
        let allIDs = []
        //DB Query grabs all category and ID columns WHERE the ORG ID is the same as the one from the req
        db.Category.findAll({
            attributes: [
                'category',
                'id'
            ],
            where: {
                'OrgId': req.user.OrgId
            }
        }).then((dbCategory) => {
            if (dbCategory.length > 0) {
                // If the reponse has at least one item run the for Loop
                for (let i = 0; i < dbCategory.length; i++) {
                    // For every loop iteration we push DB values of ID, Category, and /Category(for the URL) to their respective Array Variables above
                    allIDs.push(dbCategory[i].dataValues.id)
                    allLinks.push('/' + dbCategory[i].dataValues.category)
                    allCategories.push(dbCategory[i].dataValues.category);
                }
            }
            else {
                // If no data was found, we run this log (We did not have time to set up an error)
                console.log('No Categories Found')
            }

            // on render, we pass a page title, categories, links, and ID Numbers and render these are rendered through our EJS file
            res.render("dash-home", { title: `${name}`, categories: allCategories, links: allLinks, idNum: allIDs });
        })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    })


    // ==========================================
    // ==========================================
    //  CATEGORY PAGE
    // ==========================================
    // ==========================================

    // Get route for each individual category page - We will be running two DB queries to be able to grab everything
    app.get("/dashboard/:category", isAuthenticated, (req, res) => {

        // All variables we will use for categories, suggestions and votes
        let name = req.params.category;
        let id = null;
        let allCategories = [];
        let allLinks = [];
        let allIDs = []
        let allIdeaNames = []

        // Arrays to hold idea cards that are false
        let ideaNameFalse = []
        let ideaDescFalse = []
        let ideaIdFalse = []

        // arrays to hold idea cards that are true
        let ideaNameTrue = []
        let ideaDescTrue = []
        let ideaIdTrue = []

        // First DB Query - This is the same as the above Query and used to re-render the nav items on the sidebar
        db.Category.findAll({
            where: {
                'OrgId': req.user.OrgId
            },
            attributes: [
                'category',
                'id'
            ],
            include: [
                {
                    model: db.Idea,
                }
            ],

        }).then((dbCategory) => {
            // If the reponse has at least one item run the for Loop
            if (dbCategory.length > 0) {
                // For every loop iteration we push DB values of ID, Category, and /Category(for the URL) to their respective Array Variables above               
                for (let i = 0; i < dbCategory.length; i++) {
                    allIDs.push(dbCategory[i].dataValues.id)
                    allLinks.push('/' + dbCategory[i].dataValues.category)
                    allCategories.push(dbCategory[i].dataValues.category);
                    allIdeaNames.push(dbCategory[i].dataValues.name);
                    // This if statement is used so we can render the appropriate items to each category page
                    if (dbCategory[i].dataValues.category === name) {
                        id = dbCategory[i].dataValues.id;
                    }
                }
            }
            else {
                // If no data was found, we run this log (We did not have time to set up an error)
                console.log('No Categories Found')
            }
        }).then(() => {
            // Second DB Query - This grabs all needed Suggestions parameter we will use on the page WHERE the categoryID  matches the one above
            db.Idea.findAll({
                attributes: [
                    'name',
                    'description',
                    'id',
                    'votes',
                    'categoryId',
                    'userId',
                    'winner',
                    'active'
                ],
                where: {
                    'CategoryId': id,
                }

            }).then((dbSuggestions) => {
                // If the reponse has at least one item run the for Loop
                if (dbSuggestions.length > 0) {
                    // For every loop iteration we push DB values of ID, Category, and /Category(for the URL) to their respective Array Variables above    
                    for (let i = 0; i < dbSuggestions.length; i++) {
                        // IF / ELSE Statement splits the data based on if the Active Boolean is true or false. This is used to render the suggestions either in the suggestion block or in the Vote Block
                        if (dbSuggestions[i].dataValues.active === false) {
                            ideaNameFalse.push(dbSuggestions[i].dataValues.name)
                            ideaDescFalse.push(dbSuggestions[i].dataValues.description)
                            ideaIdFalse.push(dbSuggestions[i].dataValues.id)
                        } else {
                            ideaNameTrue.push(dbSuggestions[i].dataValues.name)
                            ideaDescTrue.push(dbSuggestions[i].dataValues.description)
                            ideaIdTrue.push(dbSuggestions[i].dataValues.id)
                        }

                    }
                }
                else {
                    console.log('No Ideas Found')
                }
            })
        }).then(() => {
            // Using a timeout when Rendering because the above queries were not running fast enough
            setTimeout(() => {
                //  Rendering every stored value to the page so we can use them through EJS
                res.render("category", {
                    title: ` ${name}: Yay or Nay?`,
                    categories: allCategories,
                    links: allLinks,
                    idNum: allIDs,
                    id: id,
                    ideaNameFalse: ideaNameFalse,
                    ideaTextFalse: ideaDescFalse,
                    ideaIdsFalse: ideaIdFalse,
                    ideaNameTrue: ideaNameTrue,
                    ideaTextTrue: ideaDescTrue,
                    ideaIdsTrue: ideaIdTrue,
                });
            }, 500);
        })
    });
}


