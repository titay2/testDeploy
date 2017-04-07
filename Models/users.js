/**
 * Created by tehetenamasresha on 06/04/2017.
 */
const mongoose = require('mongoose');
const express = require('express')

const Books = require ('../Models/books')


const Schema = mongoose.Schema;

const usersSchema = new Schema({
    name: String,
    contact: String,

});

const Users = mongoose.model('users', usersSchema);
module.exports= Users;