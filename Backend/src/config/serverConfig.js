const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    saltRounds : parseInt(process.env.saltRounds)
}