const express = require("express");
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const routes = require('./routes')
const cors = require('cors');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

dotenv.config()

const app = express()

const port = process.env.PORT || 3001

// Sử dụng middleware body-parser với tùy chọn extended được rõ ràng đặt là true
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Tiếp tục với các middleware khác
app.use(cors());
app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ limit: '50mb' }));

app.use(cookieParser())

routes(app);




mongoose.set('strictQuery', true);

mongoose.connect(`${process.env.MONGO_DB}`)
    .then(() => {
       console.log('Connect DB success!')
    })
    .catch((err) => {
        console.log(err)
    })
app.listen(port, () => {
    console.log('Server is running in port: ', + port)
})