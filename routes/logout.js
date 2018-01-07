var express = require('express')
var router = express.Router()

router.get('/', function (req, res) {
    req.session.destroy(function (err) {
        console.log('session destroy')
        res.redirect('/login')
    })
})

module.exports = router