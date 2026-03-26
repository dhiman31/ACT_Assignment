const bodyParser = require('body-parser')
const express = require('express')
const {PORT} = require('./config/serverConfig')
const connection = require('./config/dbConfig')
const v1ApiRoutes = require('./routes/index')
const cors = require('cors');

const setUpAndStartServer = () => {
    
    connection();
    const app = express()
    
    app.use(cors({
      origin: "https://actassignment.netlify.app",
      credentials: true
    }));
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended:true}))
    app.use('/v1',v1ApiRoutes)

    app.listen(PORT ,() => {
        console.log(`Server started at PORT ${PORT}`)
    })

}

setUpAndStartServer()