var express = require('express');
const body = require('body-parser');
const app = express();

// Exporting model for storage
const PostModel  = require('./model/post');
//connecting mongoDB with mongoose
const mongoose = require('mongoose');
mongoose.connect("//add your own mongoDb string url", { useNewUrlParser: true })
    .then(() => {
        console.log("Connection Established");
        
    }).catch((err) => {
       console.log(err);
       
    });

app.use(body.json());
app.use(body.urlencoded());
//allowing all clients to acess the resource
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 
                  'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
})
app.post('/api/posts', (req, res, next) => {
    const post = new PostModel({
        title: req.body.title,
        content: req.body.content
    });
    console.log(post);
    post.save();
    res.status(201).json({
        message: 'Post Added Success'
    });
    
});
app.get('/api/posts',(req, res , next) => {
    PostModel.find()
    .then((document) => {
        // console.log(document);
        res.status(200).json({
        message: 'Post Send Success',
        posts: document
    });  
    }).catch((err) => {
        console.log("Error in Querying data");
        
    });
 
});

app.delete('/api/posts/:id',(req, res, next) => {
    console.log(req.params.id);
    PostModel.deleteOne({_id:req.params.id})
    .then((result) => {
        console.log('Deleted From DB');
        
    }).catch((err) => {
        console.log(err);
        
    });;
    res.status(200).json({
        message: 'Post Deleted'
    });
});

module.exports = app;