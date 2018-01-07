var express = require('express');
var router = express.Router();
var model = require('../model/model')

router.get('/', function (req, res, next) {
    let query = req.query.q
    let regex = new RegExp(/*searchWithoutSpecialChar*/query, 'i');
    model.post.find({ title : regex }, function (err, data) {
        res.render('search', {
            title: 'Search',
            data: data,
            query : query,
            nav_lost: '',
            nav_found: '',
            nav_mywall: '',
            nav_profile: ''
        })
        console.log(query)
    })
});

module.exports = router;
