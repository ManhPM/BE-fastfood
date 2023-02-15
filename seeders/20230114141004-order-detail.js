"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert("Order_details", [
      {
        id_order: 1,
        id_item: 1,
        quantity: 2,
        isReviewed: 0,
      },
      {
        id_order: 1,
        id_item: 2,
        quantity: 3,
        isReviewed: 1,
      },
      {
        id_order: 1,
        id_item: 3,
        quantity: 5,
        isReviewed: 1,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
