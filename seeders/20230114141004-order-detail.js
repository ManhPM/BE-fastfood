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
      {
        id_order: 2,
        id_item: 4,
        quantity: 2,
        isReviewed: 0,
      },
      {
        id_order: 2,
        id_item: 5,
        quantity: 2,
        isReviewed: 0,
      },
      {
        id_order: 2,
        id_item: 15,
        quantity: 2,
        isReviewed: 0,
      },
      {
        id_order: 3,
        id_item: 20,
        quantity: 2,
        isReviewed: 0,
      },
      {
        id_order: 3,
        id_item: 21,
        quantity: 2,
        isReviewed: 0,
      },
      {
        id_order: 3,
        id_item: 30,
        quantity: 2,
        isReviewed: 0,
      },
      {
        id_order: 4,
        id_item: 12,
        quantity: 5,
        isReviewed: 0,
      },
      {
        id_order: 4,
        id_item: 27,
        quantity: 4,
        isReviewed: 0,
      },
      {
        id_order: 4,
        id_item: 33,
        quantity: 4,
        isReviewed: 0,
      },
      {
        id_order: 5,
        id_item: 15,
        quantity: 5,
        isReviewed: 0,
      },
      {
        id_order: 5,
        id_item: 14,
        quantity: 5,
        isReviewed: 0,
      },
      {
        id_order: 5,
        id_item: 5,
        quantity: 3,
        isReviewed: 0,
      },
      {
        id_order: 6,
        id_item: 2,
        quantity: 6,
        isReviewed: 0,
      },
      {
        id_order: 6,
        id_item: 7,
        quantity: 7,
        isReviewed: 0,
      },
      {
        id_order: 6,
        id_item: 1,
        quantity: 4,
        isReviewed: 0,
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
