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
    return queryInterface.bulkInsert("Items", [
      {
        id_type: 1,
        image: "",
        name: "Cánh gà",
        price: 15000,
        description: "...",
        energy: 12.5,
        ingredient: "...",
        quantity: 50,
      },
      {
        id_type: 1,
        image: "",
        name: "Chân gà",
        price: 20000,
        description: "...",
        energy: 20.5,
        ingredient: "...",
        quantity: 60,
      },
      {
        id_type: 1,
        image: "",
        name: "Đùi gà",
        price: 25000,
        description: "...",
        energy: 50,
        ingredient: "...",
        quantity: 70,
      },
      {
        id_type: 2,
        image: "",
        name: "Trà đào",
        price: 20000,
        description: "...",
        energy: 25,
        ingredient: "...",
        quantity: 40,
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
