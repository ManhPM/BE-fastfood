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
    return queryInterface.bulkInsert("Accounts", [
      {
        id_role: 1,
        username: "khach",
        password: "$2a$10$pVN6f.l9WXqsQxifG89kTOewLKmN6BxXjFoqIUra5MIBcc6Z8yhtW",
        isActive: 0,
        forgot: 0,
      },
      {
        id_role: 2,
        username: "nhanvien",
        password: "$2a$10$pVN6f.l9WXqsQxifG89kTOewLKmN6BxXjFoqIUra5MIBcc6Z8yhtW",
        isActive: 1,
        forgot: 0,
      },
      {
        id_role: 3,
        username: "admin",
        password: "$2a$10$pVN6f.l9WXqsQxifG89kTOewLKmN6BxXjFoqIUra5MIBcc6Z8yhtW",
        isActive: 1,
        forgot: 0,
      },
      {
        id_role: 1,
        username: "khachhang1",
        password: "$2a$10$pVN6f.l9WXqsQxifG89kTOewLKmN6BxXjFoqIUra5MIBcc6Z8yhtW",
        isActive: 1,
        forgot: 0,
      },
      {
        id_role: 2,
        username: "nhanvien1",
        password: "$2a$10$pVN6f.l9WXqsQxifG89kTOewLKmN6BxXjFoqIUra5MIBcc6Z8yhtW",
        isActive: 1,
        forgot: 0,
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
