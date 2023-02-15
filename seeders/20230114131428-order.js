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
    return queryInterface.bulkInsert("Orders", [
      {
        id_order: 1,
        id_payment: 2,
        id_customer: 2,
        datetime: "2023-01-01 08:30:00",
        desciption: "Lấy thêm nước chấm giúp em ạ!"
      },
      {
        id_order: 2,
        id_payment: 1,
        id_customer: 1,
        datetime: "2023-01-15 21:30:00",
        desciption: "Không cần lấy tương ớt nhé shop!"
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
