const mongoose = require('mongoose')

const connection = () => {
    mongoose.connect('mongodb://localhost/actAssignment_db_dev')
}

module.exports = connection