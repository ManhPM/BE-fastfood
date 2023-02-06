"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Staffs", {
      // id: {
      //   allowNull: false,
      //   autoIncrement: true,
      //   primaryKey: true,
      //   type: Sequelize.INTEGER
      // },
      id_staff: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_account: {
        type: Sequelize.INTEGER,
        references: { model: "Accounts", key: "id_account" },
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      gender: {
        allowNull: false,
        type: Sequelize.STRING(3),
      },
      birthday: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(100),
      },
      phone: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(10),
      },
      address: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Staffs");
  },
};
