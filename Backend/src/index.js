const bodyParser = require('body-parser')
const express = require('express')
const {PORT} = require('./config/serverConfig')
const connection = require('./config/dbConfig')

const setUpAndStartServer = () => {
    
    connection();
    const app = express()
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended:true}))

    app.listen(PORT ,() => {
        console.log(`Server started at PORT ${PORT}`)
    })

}

setUpAndStartServer()