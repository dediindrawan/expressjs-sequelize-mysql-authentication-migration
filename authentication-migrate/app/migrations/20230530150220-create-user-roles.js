'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('userRoles', {
      roleId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Roles',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'RESTRICT',
      },
      userId: {
        type: Sequelize.STRING,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'RESTRICT',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('userRoles');
  },
};
