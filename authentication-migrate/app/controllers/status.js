const { v4: uuidv4 } = require('uuid');
const Status = require('../models').Status;

module.exports = {

    getById(req, res) {
        const id = req.params.id;

        return Status
            .findByPk(id, {
                include: [],
            })
            .then((doc) => {
                if (!doc) {
                    return res.status(404).send({
                        status_response: 'Not Found',
                        errors: 'Status Not Found',
                    });
                }
                const status = {
                    status_response: 'OK',
                    status: doc,
                    errors: null
                }
                return res.status(200).send(status);
            })
            .catch((error) => {
                res.status(400).send({
                    status_response: 'Bad Request',
                    errors: error
                });
            });
    },

    list(req, res) {
        return Status
            .findAll({
                limit: 10,
                include: [],
                order: [
                    ['createdAt', 'DESC']
                ],
            })
            .then(docs => {
                const statuses = {
                    status_response: 'OK',
                    count: docs.length,
                    statuses: docs.map(doc => {
                        return doc
                    }),
                    errors: null
                }
                res.status(200).send(statuses);
            })
            .catch((error) => {
                res.status(400).send({
                    status_response: 'Bad Request',
                    errors: error
                });
            });
    },

    listStatusUser(req, res) {
        return Status
            .findAll({
                limit: 10,
                include: [],
                where: {
                    userId: req.userId,
                },
                order: [
                    ['createdAt', 'DESC']
                ],
            })
            .then(docs => {
                const statuses = {
                    status_response: 'OK',
                    count: docs.length,
                    statuses: docs.map(doc => {
                        return doc
                    }),
                    errors: null
                }
                res.status(200).send(statuses);
            })
            .catch((error) => {
                res.status(400).send({
                    status_response: 'Bad Request',
                    errors: error
                });
            });
    },

    add(req, res) {
        const id = uuidv4(); // Generate a unique identifier

        return Status
            .create({
                id: id, // Assign the generated id
                title: req.body.title,
                body: req.body.body,
                userId: req.userId
            })
            .then((doc) => {
                const status = {
                    status_response: 'Created',
                    status: doc,
                    errors: null
                }
                return res.status(201).send(status);
            })
            .catch((error) => {
                res.status(400).send({
                    status_response: 'Bad Request',
                    errors: error
                });
            });
    },

    update(req, res) {
        const id = req.params.id; // Extract the primary key value from URL parameter

        return Status
            .findByPk(id) // Use the extracted id in findByPk method
            .then(status => {
                if (!status) {
                    return res.status(404).send({
                        status_response: 'Bad Request',
                        errors: 'Status Not Found',
                    });
                }

                if (status.userId !== req.userId) {
                    return res.status(403).send({
                        status_response: "Bad Request",
                        errors: "Different User Id",
                    });
                }

                return status
                    .update({
                        title: req.body.title || status.title,
                        body: req.body.body || status.body,
                    })
                    .then((doc) => {
                        const updatedStatus = {
                            status_response: 'OK',
                            status: doc,
                            errors: null
                        }
                        return res.status(200).send(updatedStatus);
                    })
                    .catch((error) => {
                        res.status(400).send({
                            status_response: 'Bad Request',
                            errors: error
                        });
                    });
            })
            .catch((error) => {
                res.status(400).send({
                    status_response: 'Bad Request',
                    errors: error
                });
            });
    },


    delete(req, res) {
        const id = req.params.id

        return Status
            .findByPk(id)
            .then(status => {
                if (!status) {
                    return res.status(400).send({
                        status_response: 'Bad Request',
                        errors: 'Status Not Found',
                    });
                }

                if (status.userId !== req.userId) {
                    return res.status(403).send({
                        status_response: "Bad Request",
                        errors: "Different User Id",
                    });
                }

                return status
                    .destroy()
                    .then(() => res.status(204).send({
                        status_response: 'No Content',
                        errors: null,
                    }))
                    .catch((error) => {
                        res.status(400).send({
                            status_response: 'Bad Request',
                            errors: error
                        });
                    });
            })
            .catch((error) => {
                res.status(400).send({
                    status_response: 'Bad Request',
                    errors: error
                });
            });
    },
}