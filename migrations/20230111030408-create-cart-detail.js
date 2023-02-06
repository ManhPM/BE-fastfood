"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Cart_details", {
      // id: {
      //   allowNull: false,
      //   autoIncrement: true,
      //   primaryKey: true,
      //   type: Sequelize.INTEGER
      // },
      // id_cart_detail: {
      //   allowNull: false,
      //   autoIncrement: true,
      //   primaryKey: true,
      //   type: Sequelize.INTEGER,
      // },
      id_item: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: { model: "Items", key: "id_item" },
      },
      id_cart: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: { model: "Carts", key: "id_cart" },
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Cart_details");
  },
};
