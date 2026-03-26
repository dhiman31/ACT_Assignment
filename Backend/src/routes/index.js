const express = require('express')
const router = express.Router()
const userRoutes = require('./v1/userRoutes')

router.use('/user',userRoutes)

module.exports = router