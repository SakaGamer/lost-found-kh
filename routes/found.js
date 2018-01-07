var express = require('express');
var router = express.Router();
var model = require('../model/model')

router.get('/', function (req, res, next) {
    model.post.find({ type: 'FOUND' }, function (err, data) {
        res.render('found', {
            title: 'Found',
            data: data,
            nav_lost: '',
            nav_found: 'active',
            nav_mywall: '',
            nav_profile: ''
        })
        console.log("item found: " + data.length)
    })
});

module.exports = router;
