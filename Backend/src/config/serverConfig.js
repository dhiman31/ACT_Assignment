const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    saltRounds : parseInt(process.env.saltRounds),
    JWT_SECRET : process.env.JWT_SECRET
}