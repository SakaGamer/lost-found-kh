var express = require('express')
var router = express.Router()
var hash = require('password-hash')
var model = require('../model/model')
var md5 = require('md5')

router.use(require('../check_already_login'))

router.get('/', function (req, res) {
    let error = req.query.error
    res.render('login', {
        title: 'Login',
        error: error,
        nav_lost: '',
        nav_found: '',
        nav_mywall: '',
        nav_profile: ''
    })
})

router.post('/', function (req, res) {
    let email = req.body.email
    let password = req.body.password
    var md5password = md5(password)
    model.user.findOne({ email: email }, function (err, data) {
        if (data == null) {
            res.redirect('/login?error=invalid email or phone')
            return
        }
        if (hash.verify(md5password, data.password)){
            req.session.user = email
            res.redirect('/mywall')
        }
    })
})

module.exports = router