const mongoose = require('mongoose')
const emailvalidator = require("email-validator");
const bcrypt = require('bcrypt')
const {saltRounds} = require('../config/serverConfig')

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        trim: true
    },
    lastName : {
        type : String,
        trim: true
    },
    emailId : {
        type : String,
        trim: true,
        validate: {
            validator: function(value) {
                return emailvalidator.validate(value);
            },
            message: '{VALUE} is not a valid email'
        }
    },
    password : {
        type : String,
        required : true
    }
})

userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, saltRounds);
});

const User = mongoose.model('User' , userSchema)
module.exports = User