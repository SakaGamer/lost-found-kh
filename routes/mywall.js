var express = require('express')
var router = express.Router()
var model = require('../model/model')
var fs = require('fs')
var multer = require('multer')
var path = require('path')
var decode64 = require('base-64').decode
var upload = multer({ dest: "./public/uploads/" })

router.use(require('../check_login'))


router.get('/', function (req, res) {
    let author = req.session.user
    model.post.find({ author: author })
        .sort({ date: -1 })
        .exec(function (err, data) {
            res.render('mywall', {
                title: 'My wall',
                data: data,
                nav_lost: '',
                nav_found: '',
                nav_mywall: 'active',
                nav_profile: ''
            })
            console.log('mywall item: ' + data.length)
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



router.post('/addpost', upload.single('imageFile'), function (req, res) {
    let title = req.body.title
    let location = req.body.location
    let type = req.body.type
    let author = req.session.user

    // var fileInfo = []
    // for (var i = 0; i < req.files.length; i++) {
    //     fileInfo.push({
    //         "name": req.files[i].originalName,
    //         "size": req.files[i].size,
    //         "b64": new Buffer(fs.readFileSync(req.files[i].path)).toString("base64")
    //     })
    //     fs.unlink(req.files[i].path)
    // }

    if (req.file != undefined) {
        //get file and convert to base64
        var mimeType = req.file.mimeType
        var fileName = req.file.filename
        var fullPath = './uploads/' + fileName
        var fileSize = req.file.size
        var data = fs.readFileSync(req.file.path)
        var base64 = new Buffer(data).toString('base64')
    }

    var post = new model.post({
        title: title,
        author: author,
        type: type,
        location: location,
        date: Date(),
        image: {
            path: fullPath,
            filename: fileName,
            mimeType: mimeType,
            size: fileSize,
            // data: base64
        },
        hidden: false
    })

    post.save(function (err, data) {
        if (err) {
            console.log(err.message)
            res.redirect('/mywall?error=there was problem while upload data', 400)
            return
        }
        res.redirect('/mywall')
    })
})



router.get('/post/edit/:post_id', function (req, res) {
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
        console.log("edit post: " + data._id)
    })
})


// update post by id
router.post('/post/edit/:post_id', upload.single('imageFile'), function (req, res) {
    let post_id = req.params.post_id
    let title = req.body.title
    let location = req.body.location
    let type = req.body.state
    let query = {
        _id: post_id
    }
    if (req.file != undefined) {
        //get file and convert to base64
        var mimeType = req.file.mimeType
        var fileName = req.file.filename
        var fullPath = '/uploads/' + fileName
        var fileSize = req.file.size
        var data = fs.readFileSync(req.file.path)
        var base64 = new Buffer(data).toString('base64')
    }
    var updatePost = new model.post({
        _id: post_id,
        title: title,
        type: type,
        location: location,
        date: Date(),
        image: {
            path: fullPath,
            filename: fileName,
            mimeType: mimeType,
            size: fileSize,
            // data: base64
        },
    })
    model.post.update(query, { $set: updatePost })
        .exec(function (err, data) {
            if (err) {
                res.status(400).json({
                    message: err.message
                })
                return
            }
            console.log('post updated')
            res.redirect('/mywall')
        })
})


// delete post by id 
router.get('/post/delete/:post_id', function (req, res) {
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