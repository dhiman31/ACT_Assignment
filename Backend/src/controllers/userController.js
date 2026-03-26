const { JWT_SECRET } = require('../config/serverConfig')
const userService = require('../services/userService')
const userServ = new userService
const jwt = require('jsonwebtoken')

const signup = async (req,res) => {
    try {
        if (!req.body.emailId || !req.body.password) {
            return res.status(400).json({
                success : false,
                message : "Enter credentials"
            })
        }
        const response = await userServ.signup(req.body)
        
        return res.status(201).json({
            data: response,
            success: true,
            message : "User signed up successfully",
            err : {}
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            data:{},
            success:false,
            message : error.message || "Could not signup!",
            err : error
        })
    }
}

const login = async (req,res) => {
    try {
        const response = await userServ.login({
            emailId : req.body.emailId,
            password : req.body.password,
            role : req.body.role
        })

        console.log("Received response : ",response)

        return res.status(200).json({
            data: {
                token:response.token,
                user:{firstName:response.user.firstName,role:req.body.role}
            },
            success: true,
            message : "User logged in successfully",
            err : {}
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            data:{},
            success:false,
            message : error.message || "Could not login!",
            err : error
        })
    }
}

module.exports = {
    signup,
    login
}