'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('User_Roles', {
      roleid: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Roles',
          key: 'id',
          as: 'roleid'
        },
        onDelete: 'CASCADE',
        onUpdate: 'RESTRICT'
      },
      userid: {
        type: Sequelize.STRING,
        references: {
          model: 'Users',
          key: 'id',
          as: 'userid'
        },
        onDelete: 'CASCADE',
        onUpdate: 'RESTRICT'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('User_Roles');
  }
};