/**
 * Created by tehetenamasresha on 06/04/2017.
 */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = mongoose.Schema({
    fullname :{type: String, required: true},
    email: {type: String , required: true},
    password: {type: String},
    book :{
        name:{type: String,  default:''},
        image:{type: String,  default:''}

    },

    passwordResetToken: {type: String, default: ''},
    passwordResetExpires: {type: Date, default: Date.now},

});

userSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};


module.exports= mongoose.model('User', userSchema);