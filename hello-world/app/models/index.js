const Sequelize = require("sequelize");
const sequelizeConnection = new Sequelize(
    'hello_world_db',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

const book = require('./book.model.js')(sequelizeConnection, Sequelize);

const db = {};
db.Sequelize = Sequelize; // properti dependency
db.sequelizeConnection = sequelizeConnection; // properti sequalizeConnection
db.book = book; // properti models

module.exports = db;