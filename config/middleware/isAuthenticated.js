module.exports = function (req, res, next) {
    console.log('//// MIDDLEWARE ////')
    console.log(req.user)
    if (req.user) {
        console.log('return Next')
        return next();
    }
    console.log('=================')
    console.log('NO AUTHENTICATION')
    console.log('=================')
    return res.redirect('/login');
};