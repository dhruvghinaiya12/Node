const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({

    title: String,
    content: String,
    image: String,
    author: String,
    category:{type: String, default:"technology"},
    likedBy: [{ username: String }],
    comments: [{
        text: String,
        username: String,
        date: { type: Date, default: Date.now } }]
    })

    let Blog=mongoose.model("Blog",BlogSchema)

    module.exports = Blog;

