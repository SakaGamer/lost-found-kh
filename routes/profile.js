var express = require('express')
var router = express.Router()
var model = require('../model/model')

router.use(require('../check_login'))

router.get('/', function (req, res) {
    let user = req.session.user
    model.user.findOne({ email: user }, function (err, doc) {
        if(err){
            res.json(500, 'error get user')
            return
        }
        if(doc == null){
            req.session.destroy(function(err){
                res.redirect('/login')
            })
        }
        res.render('profile', {
            title: 'Profile',
            user: doc,
            nav_lost: '',
            nav_found: '',
            nav_mywall: '',
            nav_profile: 'active'
        })
        console.log(doc.image)
    })
})

module.exports = router