"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Reviews", {
      // id: {
      //   allowNull: false,
      //   autoIncrement: true,
      //   primaryKey: true,
      //   type: Sequelize.INTEGER,
      // },
      // id_review: {
      //   allowNull: false,
      //   autoIncrement: true,
      //   primaryKey: true,
      //   type: Sequelize.INTEGER,
      // },
      id_item: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: { model: "Items", key: "id_item" },
      },
      id_customer: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: { model: "Customers", key: "id_customer" },
      },
      rating: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      comment: {
        type: Sequelize.STRING,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Reviews");
  },
};
