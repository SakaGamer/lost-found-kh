var express = require('express')
var router = express.Router()
var model = require('../model/model')

router.get('/', function (req, res) {
    model.post.find({ type : 'LOST' }, function (err, data) {
        res.render('lost', {
            title: 'Lost',
            data: data,
            nav_lost: 'active',
            nav_found: '',
            nav_mywall: '',
            nav_profile: ''
        })
        console.log("item lost: " +data.length)
    })
})

module.exports = router