"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Wishlists", {
      // id: {
      //   allowNull: false,
      //   autoIncrement: true,
      //   primaryKey: true,
      //   type: Sequelize.INTEGER
      // },
      id_wishlist: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_customer: {
        type: Sequelize.INTEGER,
        references: { model: "Customers", key: "id_customer" },
      },
     
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Wishlists");
  },
};
