/**
 * Created by tehetenamasresha on 06/04/2017.
 */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const usersSchema = new Schema({
    name: String,
    Author: String,
    description: Boolean,
    isFree: Boolean,
    Owner: String
});

const Users = mongoose.model('users', usersSchema);
module.exports= Users;