const mongoose = require('mongoose')
const emailvalidator = require("email-validator");

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
            validator: emailvalidator,
            message: '{VALUE} is not a valid email'
        }
    },
    password : {
        type : String,
        required : true
    }
})

const User = mongoose.model('User' , userSchema)
module.exports = User