const express = require('express');
const dotenv = require('dotenv')

const morgan = require('morgan')
const path = require('path')

const connectDB = require('./server/database/connection')

const app = express();

dotenv.config({path:'.config.env'});
const PORT = process.env.PORT || 8080

// logs requests
app.use(morgan('tiny'))

connectDB();

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.set("view engine","ejs")

//Statics
app.use('/css', express.static(path.join(__dirname,"assets/css")))
app.use('/js', express.static(path.join(__dirname,"assets/js")))
app.use('/locales', express.static(path.join(__dirname,"assets/locales")))


app.use('/', require('./server/routes/router'))



app.listen(PORT, () => {
    console.log('listening on 3000')
})