module.exports = function (req, res, next) {
    if (req.user) {
        console.log('return Next')
        return next();
    }
    console.log('=================')
    console.log('NO AUTHENTICATION')
    console.log('=================')
    return res.redirect('/login');
};