const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    name: {type: String},
    author: {type: String},
    genre: {type: String},
    description: {type: String},
    image: {type: String, default: 'defaultPic.png'},

    bookRating: [{
        userFullname: {type: String, default: ''},
        userRating: {type: Number, default: 0},
        userReview: {type: String, default: ''}
    }],

    ratingNumber: [Number],
    ratingSum: {type: Number, default: 0}
});

module.exports = mongoose.model('Book', bookSchema);