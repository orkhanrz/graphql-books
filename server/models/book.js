const mongoose = require('mongoose');

const Book = new mongoose.Schema({
    name: String,
    genre: String,
    authorId: String
});

module.exports = mongoose.model('Book', Book);