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
        console.log(error)
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
        const response = await userServ.login({
            emailId : req.body.emailId,
            password : req.body.password,
            role : req.body.role
        })

        console.log("Recieved response : ",response)

        return res.status(201).json({
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