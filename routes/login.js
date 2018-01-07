var express = require('express')
var router = express.Router()
var hash = require('password-hash')
var model = require('../model/model')
var md5 = require('md5')
var querystring = require('querystring')

router.use(require('../check_already_login'))

router.get('/', function (req, res) {
    let error = req.query.error
    let ref_path = req.query.r
    res.render('login', {
        title: 'Login',
        error: error,
        ref: ref_path,
        nav_lost: '',
        nav_found: '',
        nav_mywall: '',
        nav_profile: ''
    })
})

router.post('/', function (req, res) {
    let email = req.body.email
    let password = req.body.password
    let md5password = md5(password)
    let redirectTo = req.body.ref_path
    model.user.findOne({ email: email }, function (err, data) {
        if (data == null) {
            res.redirect('/login?error=invalid email or phone')
            return
        }
        if (hash.verify(md5password, data.password)){
            req.session.user = email
            if (redirectTo == ""){
                redirectTo = '/mywall'
            }
            res.redirect(redirectTo)
        }
    })
})

module.exports = router