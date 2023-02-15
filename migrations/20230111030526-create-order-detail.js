"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Order_details", {
      // id: {
      //   allowNull: false,
      //   autoIncrement: true,
      //   primaryKey: true,
      //   type: Sequelize.INTEGER
      // },
      // id_order_detail: {
      //   allowNull: false,
      //   autoIncrement: true,
      //   primaryKey: true,
      //   type: Sequelize.INTEGER,
      // },
      id_order: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: { model: "Orders", key: "id_order" },
      },
      id_item: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: { model: "Items", key: "id_item" },
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      isReviewed: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Order_details");
  },
};
