require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const PORT = process.env.PORT || 5000;
const NODE_ENV_PROD = process.env.NODE_ENV == "production";
const MONGO_URL = NODE_ENV_PROD ? process.env.MONGODB_URL_PROD : process.env.MONGODB_URL_DEV;

console.log(`Env: ${NODE_ENV_PROD}`)
console.log(`Connecting to ${MONGO_URL}`)

const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())

// Routes
app.use('/', require('./src/routes/'))

mongoose.connect(MONGO_URL)
    .then(()=>{
        console.log('Connected to mongodb')
    })
    .catch(err => {
        console.error("Error connecting to db")
        console.error(err)
        throw err;
    })

app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
})
