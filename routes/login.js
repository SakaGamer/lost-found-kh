var express = require('express')
var router = express.Router()
var hash = require('password-hash')
var model = require('../model/model')

router.use(require('../check_already_login'))

router.get('/', function (req, res) {
    let error = req.query.error
    res.render('login', {
        title: 'Login',
        error: error,
        nav_lost: '',
        nav_found: '',
        nav_mywall: '',
        nav_profile: 'active'
    })
})

router.post('/', function (req, res) {
    let email = req.body.email
    let password = req.body.password
    let hashedPassword = hash.verify(password,)
    model.user.findOne({ email: email, password: hashedPassword }, function (err, data) {
        if(err){
            res.redirect('/login?error=invalid email or password')
            console.log(err.messaage)
            return
        }
        req.session.user = email
        res.redirect()
    })
})

module.exports = router