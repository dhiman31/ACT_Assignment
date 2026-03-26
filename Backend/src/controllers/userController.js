const userService = require('../services/userService')
const userServ = new userService

const signup = async (req,res) => {
    try {
        const user = await userServ.signup(req.body)
        return res.status(201).json({
            data: user,
            success: true,
            message : "User signed up successfully",
            err : {}
        })
    } catch (error) {
        console.log("Error in controller")
        return res.status(501).json({
            data:{},
            success:false,
            message : "Could not signup!",
            err : error
        })
    }
}

const login = async (req,res) => {
    try {
        const token = await userServ.login({
            emailId : req.body.emailId,
            password : req.body.password
        })

        return res.status(201).json({
            data: token,
            success: true,
            message : "User logged in successfully",
            err : {}
        })
    } catch (error) {
        console.log("Error in controller")
        return res.status(501).json({
            data:{},
            success:false,
            message : "Could not login!",
            err : error
        })
    }
}

module.exports = {
    signup,
    login
}