var express = require('express')
var router = express.Router()
var model = require('../model/model')
var hash = require('password-hash')

router.use(require('../check_already_login'))

router.get('/', function (req, res) {
    res.render('register', {
        title: 'Register',
        nav_lost: '',
        nav_found: '',
        nav_mywall: '',
        nav_profile: 'active'
    })
})

router.post('/', function(req, res){
    let username = req.body.username
    let email_phone = req.body.email_phone
    let password = req.body.password
    let hashedPassword = hash.generate(password)
    let user = {
        username : username,
        email : email_phone,
        password : hashedPassword,
    }
    
})

module.exports = router