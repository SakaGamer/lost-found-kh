module.exports = function (req, res, next) {
    var querystring = require('querystring')
    if (req.session.user == undefined) {
        let ref_path = querystring.escape(req.baseUrl)
        res.redirect('/login?r='+ref_path)
    } else {
        next()
    }
}