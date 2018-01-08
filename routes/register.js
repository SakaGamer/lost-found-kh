var express = require('express')
var router = express.Router()
var model = require('../model/model')
var hash = require('password-hash')
var md5 = require('md5')

router.use(require('../check_already_login'))

router.get('/', function (req, res) {
    let error = req.query.error
    let ref_path = req.query.r
    res.render('register', {
        title: 'Register',
        error: error,
        ref: ref_path,
        nav_lost: '',
        nav_found: '',
        nav_mywall: '',
        nav_profile: ''
    })
})

router.post('/', function (req, res) {
    let username = req.body.username
    let email_phone = req.body.email
    let password = req.body.password
    let confirmPassword = req.body.confirmPassword
    if (password != confirmPassword) {
        res.redirect('/register?error=password not match')
        return
    }
    // let regex = new RegExp(query, 'i')
    let regex_email = new RegExp(email_phone, 'i')
    model.user.findOne({ email: regex_email }, function (err, data) {
        if (err) {
            console.log(err.message)
            res.redirect('/register?error=error create user')
            return
        }
        if (data != null) {
            if (email_phone == data.email) {
                res.redirect('/register?error=email or phone already exist')
                return
            }
        }
    })
    let md5password = md5(password)
    let md5hashedPassword = hash.generate(md5password)
    let user = new model.user({
        name: username,
        email: email_phone,
        password: md5hashedPassword,
        role: 'user',
        image: '',
        date: Date(),
        post_count: 0,
    })
    user.save(function (err, data) {
        if (err) {
            console.log(err.message)
            res.redirect('/register?error=there was a problem while create user', 400)
            return
        }
        req.session.user = email_phone
        res.redirect('/mywall')
    })
})

module.exports = router