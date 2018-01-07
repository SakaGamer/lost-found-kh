var express = require('express')
var router = express.Router()
var model = require('../model/model')

router.use(require('../check_login'))

router.get('/', function (req, res) {
    let user = req.session.user
    model.user.findOne({ email: user }, function (err, data) {
        res.render('profile', {
            title: 'Profile',
            data: data,
            nav_lost: '',
            nav_found: '',
            nav_mywall: '',
            nav_profile: 'active'
        })
    })
})

module.exports = router