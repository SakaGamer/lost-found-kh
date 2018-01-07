var express = require('express')
var router = express.Router()

router.get('/', function(req, res){
    res.render('profile', {
        title: 'Profile',
        nav_lost: '',
        nav_found: '',
        nav_mywall: '',
        nav_profile: 'active'
    })
})

module.exports = router