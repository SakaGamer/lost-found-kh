var express = require('express')
var router = express.Router()
var model = require('../model/model')

router.use(require('../check_login'))

router.get('/', function (req, res) {
    let author = req.session.user
    model.post.find({ author : author }, function (err, data) {
        res.render('mywall', {
            title: 'My wall',
            data: data,
            nav_lost: '',
            nav_found: '',
            nav_mywall: 'active',
            nav_profile: ''
        })
        console.log("my wall item: " + data.length)
    })
})

router.get('/addpost', function (req, res) {
    res.render('addpost', {
        title: 'Add post',
        nav_lost: '',
        nav_found: '',
        nav_mywall: 'active',
        nav_profile: ''
    })
    console.log("new post")
})

router.post('/addpost', function(req, res){
    let title = req.body.title
    let location = req.body.location
    let type = req.body.type
    let author = req.session.user
    var post = new model.post({
        title : title,
        author : author,
        type : type,
        location : location,
        date : new Date(),
        image : image
    })
    post.s
})

router.get('/edit/post/:post_id', function (req, res) {
    let post_id = req.params.post_id
    model.post.findOne({ _id: post_id }, function (err, data) {
        res.render('editpost', {
            title: 'Edit post',
            post: data,
            nav_lost: '',
            nav_found: '',
            nav_mywall: 'active',
            nav_profile: ''
        })
        console.log("edit post: " + data)
    })
})

router.get('/delete/post/:post_id', function (req, res) {
    let post_id = req.params.post_id
    model.post.remove({ _id: post_id }, function (err, data) {
        if (err) {
            res.status(400).json({
                message: err.message
            })
            return
        }
        res.redirect('/mywall')
    })
})

module.exports = router