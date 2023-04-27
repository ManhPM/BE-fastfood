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
    return queryInterface.bulkInsert("Types", [
      {
        id_type: 1,
        name: "Burgers",
      },
      {
        id_type: 2,
        name: "Đồ uống",
      },
      {
        id_type: 3,
        name: "Đồ ngọt",
      },
      {
        id_type: 4,
        name: "Pasta",
      },
      {
        id_type: 5,
        name: "Pizza",
      },
      {
        id_type: 6,
        name: "Khác",
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