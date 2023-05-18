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
        id_payment: 2,
        id_customer: 2,
        total: 315000,
        datetime: "2023-01-01 08:30:00",
        description: "Lấy thêm nước chấm giúp em ạ!",
        status: 1,
      },
      {
        id_payment: 1,
        id_customer: 1,
        total: 315000,
        datetime: "2023-01-15 21:30:00",
        description: "Không cần lấy tương ớt nhé shop!",
        status: 1,
      },
      {
        id_payment: 2,
        id_customer: 2,
        total: 315000,
        datetime: "2023-01-16 09:30:00",
        description: "Đóng gói kĩ giúp em!",
        status: 1,
      },
      {
        id_payment: 3,
        id_customer: 2,
        total: 315000,
        datetime: "2023-01-17 11:30:00",
        description: "Không bỏ đồ chua nhé!",
        status: 0
      },
      {
        id_payment: 3,
        id_customer: 2,
        total: 315000,
        datetime: "2023-01-20 06:30:00",
        description: "Không bỏ đồ chua nhé!",
        status: 1,
      },
      {
        id_payment: 3,
        id_customer: 1,
        total: 315000,
        datetime: "2023-01-23 06:30:00",
        description: "Không bỏ đồ chua nhé!",
        status: 1,
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
