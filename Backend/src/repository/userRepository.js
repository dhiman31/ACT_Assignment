const User = require('../models/user')

class userRepository {
    
    async signup(data){
        try { 
            const user = await User.create({
                firstName : data.firstName,
                lastName : data.lastName,
                emailId : data.emailId,
                password : data.password,
                role : data.role
            })
            return user;
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}

module.exports = userRepository