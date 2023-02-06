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
    return queryInterface.bulkInsert("Customers", [
      {
        id_account: 1,
        name: "TrungDz",
        email: "n19dccn216@student.ptithcm.edu.vn",
        phone: "0123456789",
        address: "...",
      },
      {
        // id_customer: 2, // Test thử kh có field này, thì lúc run file seeder nó vẫn tự tăng id theo thứ tự, hay vl thật
        id_account: 4,
        name: "Manh",
        email: "n19dccn107@student.ptithcm.edu.vn",
        phone: "0631231189",
        address: "...",
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
