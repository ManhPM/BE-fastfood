"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Wishlist_details", {
      // id: {
      //   allowNull: false,
      //   autoIncrement: true,
      //   primaryKey: true,
      //   type: Sequelize.INTEGER
      // },
      // id_wishlist_detail: {
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
      id_wishlist: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: { model: "Wishlists", key: "id_wishlist" },
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Wishlist_details");
  },
};
