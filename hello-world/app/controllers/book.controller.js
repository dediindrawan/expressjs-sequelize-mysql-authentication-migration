const db = require('../models');

const Book = db.book;
const Op = db.Sequelize.Op;

// create book method
exports.create = (req, res) => {
    console.log('>> book controller api');
    // validate request
    if (!req.body.title) {
        res.status(400).send({
            message: 'Content can not be empty!'
        });
        return;
    }
    
    console.log('>> book controller api');
    // create book object
    const book = {
        title: req.body.title,
        author: req.body.author,
        release_date: req.body.release_date,
        subject: req.body.subject,
    };

    // save book to database
    Book.create(book)
        .then(data => {
            console.log('>> insert successfully');
            res.send(data);
        })
        .catch(err => {
            console.log('>> insert book failed');
            res.status(500).send({

                message: 'Error occured while inserting book.'
            });
        });
};

// get all book method
exports.findAll = (req, res) => {
    Book.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Error while retrieving books.'
            });
        });
};

// find a single books with an id
exports.findOne = (req, res) => {
    Book.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Error while finding book.'
            });
        });
};

// delete a book with an id
exports.delete = (req, res) => {
    Book.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(
            res.send({
                message: `Success delete book with id = ${req.params.id}`
            })
        )
        .catch(err => {
            res.status(500).send({
                message: `Could not delete book with id ${req.params.id}`
            });
        });
};

// find a single books with title
exports.findBookTitle = (req, res) => {
    db.sequelizeConnection.query('SELECT * FROM books WHERE title = ?', {
        replacements: [req.params.title]
    })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Error while finding book.'
            });
        });
};

// find a single books with id
exports.findBookId = (req, res) => {
    db.sequelizeConnection.query('SELECT * FROM books WHERE id = id', {
        replacements: [req.params.title]
    })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Error while finding book.'
            });
        });
};