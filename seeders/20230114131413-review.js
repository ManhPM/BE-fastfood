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
    return queryInterface.bulkInsert("Reviews", [
      {
        id_item: 1,
        id_customer: 2,
        rating: 5,
        comment: "Món ăn rất tuyệt vơi",
        datetime: "2023-01-01 08:30:00",
      },
      {
        id_item: 2,
        id_customer: 2,
        rating: 3,
        comment: "Món ăn tạm được",
        datetime: "2023-01-01 08:30:00",
      },
      {
        id_item: 1,
        id_customer: 1,
        rating: 5,
        comment: "Được đấy",
        datetime: "2023-02-13 08:30:00",
      },
      {
        id_item: 4,
        id_customer: 1,
        rating: 1,
        comment: "Tệ lắm nha",
        datetime: "2023-02-13 08:30:00",
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
