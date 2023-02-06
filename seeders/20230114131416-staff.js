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
    return queryInterface.bulkInsert("Staffs", [
      {
        id_account: 2,
        name: "emTrungdan",
        gender: "Nu",
        birthday: "2001-01-01",
        email: "...@gmail.com",
        phone: "0415112511",
        address: "Daklak",
        description: "Nhân viên Trung",
      },
      {
        id_account: 3,
        name: "Admin",
        gender: "Nam",
        birthday: "2001-01-11",
        email: "phammanhbeo2001@gmail.com",
        phone: "0966123123",
        address: "Đồng Nai",
        description: "ADMIN",
      },
      {
        id_account: 5,
        name: "Tuấn",
        gender: "Nam",
        birthday: "2001-01-21",
        email: "abcdefg@gmail.com",
        phone: "0846123123",
        address: "Đồng Nai",
        description: "Nhân viên Tuấn",
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
