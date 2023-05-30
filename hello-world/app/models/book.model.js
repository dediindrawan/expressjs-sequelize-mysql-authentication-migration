module.exports = (sequelizeConnection, Sequelize) => {
    const Book = sequelizeConnection.define('books', {
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        author: {
            type: Sequelize.STRING,
            allowNull: false
        },
        release_date: {
            type: Sequelize.DATEONLY,
        },
        subject: {
            type: Sequelize.INTEGER,
        }
    });

    return Book;
};