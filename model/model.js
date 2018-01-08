var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var config = {
    mongodb_db: 'nodejs',
    mongodb_user: 'saka',
    mongodb_pass: '466373934',
    mongodb_connection: 'mongodb://@ds259855.mlab.com:59855/nodejs',
}

mongoose.connect(config.mongodb_connection, {
    auth: { authdb: config.mongodb_db },
    user: config.mongodb_user,
    pass: config.mongodb_pass,
})

mongoose.connection.on('connected', function () {
    console.log('Connected to MongoDb')
})

//add event 'error', 'disconnected'
mongoose.connection.on('error', function (err) {
    console.log('MongoDb Connection error: ' + err)
})

mongoose.connection.on('disconnected', function () {
    console.log('Disconnected from MongoDb')
})

//handle event when proccess terminated 'SIGINT'
process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('MongoDb connection close due to app termination')
    })
})

var postSchema = new Schema({
    title: String,
    author: String,
    body: String,
    location: String,
    type: String,
    image: {
        path: String,
        data: String,
        mimeType: String,
        filename: String,
        size: Number
    },
    comments: [{ body: String, date: Date }],
    date: Date,
    hidden: Boolean
})

var userSchema = new Schema({
    name: String,
    email: String,
    phone: String,
    password: String,
    image: {
        path: String,
        data: String,
        mimeType: String,
        filename: String,
        size: Number
    },
    date: Date,
    role: String,
    post_count: Number
})


module.exports = {
   post : mongoose.model('posts', postSchema),
   user : mongoose.model('users', userSchema)
}