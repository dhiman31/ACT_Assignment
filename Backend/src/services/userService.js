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
            const token = jwt.sign(
                { emailId: user.emailId, role: user.role },
                JWT_SECRET
            );
            return {
                token,
                user:{firstName:user.firstName,role:"CLIENT"}
            };
        } catch (error) {
            throw error
        }
    }

    async login(data){
        try {
            const emailId = data.emailId
            const password = data.password
            const role = data.role
            if(!emailId || !password || !role){
                throw new Error("Enter credentials!!")
            }

            const user = await User.findOne({emailId,role})
            if(!user){
                throw new Error("User does not exist")
            }

            console.log("LOGIN REQUEST : ",user)

            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch){
                throw new Error("Wrong password entered")
            }

            const token = await jwt.sign({emailId: emailId , role:role},JWT_SECRET)
            console.log(token)

            return {
                token,
                user
            }

        } catch (error) {
            throw error
        }
    }
}

module.exports = userService