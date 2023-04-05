const express = require('express');
const app = express();
var cors = require('cors');
require('./models/db.connection')
require('dotenv').config()

const PORT = 2023;

app.use(cors('*'));
app.use(express.json());

// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())

var bodyParser = require('body-parser')

const addStudents = require('./routes/addStudents');

app.use('/student', addStudents);

app.get('/', (req, res) => {
    res.send("this is our first web project server")
})
app.listen(PORT, () => {
    console.log(`the server is running on ${PORT}`);
});
