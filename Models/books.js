/**
 * Created by tehetenamasresha on 06/04/2017.
 */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: String,
    author: String,
    description: Boolean,
    isFree: Boolean,
    Owner: String
});



const Books = mongoose.model('Books', bookSchema);

module.exports = Books;
