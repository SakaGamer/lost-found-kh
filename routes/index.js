var express = require('express');
var router = express.Router();
var model = require('../model/model')

router.get('/', function(req, res, next) {
  model.post.find({}, function(err, data){
    res.render('index', { 
      title: 'Lost Found' ,
      data: data,
      nav_lost: '',
      nav_found: '',
      nav_mywall: '',
      nav_profile: ''
    })
    console.log("all item: " + data.length)
  })
})

module.exports = router
