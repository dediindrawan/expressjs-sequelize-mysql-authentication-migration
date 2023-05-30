const verifySignUpController = require('../controllers').verifySignUp;
const verifySignController = require('../controllers').verifySign;
const statusController = require('../controllers').status;
const verifyJwtTokenController = require('../controllers').verifyJwtToken;

module.exports = function (app) {

    //User Auth
    app.post('/api/auth/signup', (req, res) => {
        [verifySignUpController.checkDuplicateUserNameOrEmail, verifySignUpController.checkRolesExisted],
            verifySignController.signup(req, res);
    });

    app.post('/api/auth/signin', (req, res) => {
        verifySignController.signin(req, res);
    });

    //Status
    app.get('/api/status', (req, res) => {
        statusController.list(req, res);
    });

    app.get('/api/statususer', (req, res) => {
        [verifyJwtTokenController.verifyToken],
            statusController.listStatusUser(req, res);
    });

    app.get('/api/status/:id', (req, res) => {
        [verifyJwtTokenController.verifyToken, verifyJwtTokenController.isAdmin],
            statusController.getById(req, res);
    });

    app.post('/api/status', (req, res) => {
        [verifyJwtTokenController.verifyToken, verifyJwtTokenController.isAdmin],
            statusController.add(req, res);
    });

    app.put('/api/status/:id', (req, res) => {
        [verifyJwtTokenController.verifyToken, verifyJwtTokenController.isAdmin],
            statusController.update(req, res);
    });

    app.delete('/api/status/:id', (req, res) => {
        [verifyJwtTokenController.verifyToken, verifyJwtTokenController.isAdmin],
            statusController.delete(req, res);
    });
};