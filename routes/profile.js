var express = require('express')
var router = express.Router()
var model = require('../model/model')
var multer = require('multer')
var upload = multer()
var upload = multer({ dest: "./public/uploads/user_profile/" })

router.use(require('../check_login'))

router.get('/profile', function (req, res) {
    let user = req.session.user
    model.user.findOne({ email: user }, function (err, doc) {
        if (err) {
            res.json(500, 'error get user')
            return
        }
        if (doc == null) {
            req.session.destroy(function (err) {
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
    })
})

// go to edit user page
router.get('/profile/edit/:uid', function (req, res) {
    let uid = req.params.uid
    model.user.findById({ _id: uid }, function (err, doc) {
        if (err) {
            res.json(500, 'error get user')
            return
        }
        if (doc == null) {
            req.session.destroy(function (err) {
                res.redirect('/login')
            })
        }
        res.render('edit_user_profile', {
            title: 'Edit profile',
            user: doc,
            nav_lost: '',
            nav_found: '',
            nav_mywall: '',
            nav_profile: 'active'
        })
        console.log('uid: ' + doc._id)
    })
})


// edit user by user id
router.post('/profile/edit/:uid', upload.single('imageFile'), function (req, res) {
    let uid = req.params.uid
    let username = req.body.username
    let email = req.body.email
    let query = {
        _id : uid
    }

    if (req.file != undefined) {
        //get file and convert to base64
        var mimeType = req.file.mimeType
        var fileName = req.file.filename
        var fullPath = '/uploads/user_profile/' + fileName
        var fileSize = req.file.size
    }

    let updateUser = new model.user({
        _id : uid,
        name : username,
        email : email,
        image: {
            path: fullPath,
            filename: fileName,
            mimeType: mimeType,
            size: fileSize,
        }
    })

    model.user.update(query, { $set: updateUser })
        .exec(function (err, data) {
            if (err) {
                res.status(400).json({
                    message: err.message
                })
                return
            }
            console.log('post updated')
            res.redirect('/user/profile')
        })
})


module.exports = router