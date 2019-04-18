var express = require('express');
const body = require('body-parser');
const app = express();

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
    const posts = req.body;
    console.log(posts);
    res.status(201).json({
        message: 'Post Added Success'
    });
    
})
app.use('/api/posts',(req, res , next) => {
    const posts = [
        { id:'a1qsaxa', title: 'First Post From my own backend', content: 'heyy there how its going' },
        { id:'a1qsasa', title: 'Second Post From my own backend', content: 'heyy there how its going' },
        { id:'a1qadfd', title: 'Third Post From my own backend', content: 'heyy there how its going' }
    ]
    res.status(200).json({
        message: 'Post Send Success',
        posts: posts
    });   
});

module.exports = app;