const User = require('../models/user');
const userRepository = require('../repository/userRepository')
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');
const { JWT_SECRET } = require("../config/serverConfig");

class userService{
    constructor(){
        this.userRepo = new userRepository
    }

    async signup(data){
        try {
            const user = await this.userRepo.signup(data);
            return user

        } catch (error) {
            console.log("Error in service layer")
            throw error
        }
    }

    async login(data){
        try {
            const emailId = data.emailId
            const password = data.password
            if(!emailId || !password){
                throw new Error("Enter credentials!!")
            }

            const user = await User.findOne({emailId})
            if(!user){
                throw new Error("User does not exist")
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch){
                throw new Error("Wrong password entered")
            }
            return jwt.sign({emailId: emailId},JWT_SECRET);

        } catch (error) {
            console.log("Error in login")
        }
    }
}

module.exports = userService