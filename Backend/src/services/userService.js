const userRepository = require('../repository/userRepository')

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
}

module.exports = userService