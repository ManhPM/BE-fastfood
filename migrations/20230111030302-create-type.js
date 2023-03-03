"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Types", {
      id_type: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      status: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 1,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Types");
  },
};
