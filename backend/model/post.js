const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true}

});

module.exports = mongoose.model('PostModel', postSchema);
//here model name is Post and the collection creating to corresponding model will be {posts}