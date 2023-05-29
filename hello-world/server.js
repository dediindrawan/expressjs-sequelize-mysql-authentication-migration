const express = require('express');
const cors = require('cors');

const app = express();

var corsOptions = {
    origin: 'http://localhost:3000'
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({
    extended: true
}));

const db = require('./app/models');
db.sequelizeConnection.sync()
    .then(() => {
        console.log('Synced db');
    })
    .catch((err) => {
        console.log('Failed to sync db: ' + err.message);
    });

// import book controller
const bookController = require('./app/controllers/book.controller');

// create book route
app.post('/', (req, res) => {
    console.log('>> create book api')
    bookController.create(req, res);
});

// find all book route
app.get('/', (req, res) => {
    bookController.findAll(req, res);
});

// find book by id route
app.get('/:id', (req, res) => {
    bookController.findOne(req, res);
});

// delete book with an id
app.delete('/:id', (req, resp) => {
    bookController.delete(req, resp);
})

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT},`);
});