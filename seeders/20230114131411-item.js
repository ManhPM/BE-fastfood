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
        id_item: 1,
         image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/3-1.png",
        name: "Burger thịt xông khói",
        price: 15000,
        description: "...",
        energy: 12.5,
        ingredient: "...",
        quantity: 50,
      },
      {
        id_type: 1,
        id_item: 2,
         image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/3-1.png",
        name: "Burger bơ phô mai",
        price: 20000,
        description: "...",
        energy: 20.5,
        ingredient: "...",
        quantity: 60,
      },
      {
        id_type: 1,
        id_item: 3,
         image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/3-1.png",
        name: "Burger gà",
        price: 25000,
        description: "...",
        energy: 50,
        ingredient: "...",
        quantity: 70,
      },
      {
        id_type: 1,
        id_item: 4,
         image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/3-1.png",
        name: "Burger 2 miếng bò",
        price: 22000,
        description: "",
        energy: 50,
        ingredient: "...",
        quantity: 70,
      },
      {
        id_type: 1,
        id_item: 5,
         image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/3-1.png",
        name: "Burger 2 phô mai",
        price: 23000,
        description: "",
        energy: 50,
        ingredient: "...",
        quantity: 70,
      },
      {
        id_type: 1,
        id_item: 6,
         image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/3-1.png",
        name: "Burger cá hồi",
        price: 16000,
        description: "",
        energy: 50,
        ingredient: "...",
        quantity: 70,
      },
      {
        id_type: 2,
        id_item: 7,
         image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/3-1.png",
        name: "Sinh tố việt quất lắc",
        price: 15000,
        description: "",
        energy: 50,
        ingredient: "...",
        quantity: 70,
      },
      {
        id_type: 2,
        id_item: 8,
         image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/3-1.png",
        name: "Nước ép cam tươi",
        price: 15000,
        description: "",
        energy: 50,
        ingredient: "...",
        quantity: 70,
      },
      {
        id_type: 2,
        id_item: 9,
         image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/3-1.png",
        name: "Cola lạnh",
        price: 20000,
        description: "",
        energy: 50,
        ingredient: "...",
        quantity: 70,
      },
      {
        id_type: 2,
        id_item: 10,
         image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/3-1.png",
        name: "Trà chanh",
        price: 30000,
        description: "",
        energy: 50,
        ingredient: "...",
        quantity: 70,
      },
      {
        id_type: 2,
        id_item: 11,
         image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/3-1.png",
        name: "Sinh tố Kiwi",
        price: 4000,
        description: "",
        energy: 50,
        ingredient: "...",
        quantity: 70,
      },
      {
        id_type: 2,
        id_item: 12,
         image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/3-1.png",
        name: "Hot Cappuccino",
        price: 4000,
        description: "",
        energy: 50,
        ingredient: "...",
        quantity: 70,
      },
      {
        id_type: 2,
        id_item: 13,
         image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/3-1.png",
        name: "Iced Coffee",
        price: 4000,
        description: "",
        energy: 50,
        ingredient: "...",
        quantity: 70,
      },
      {
        id_type: 3,
        id_item: 14,
         image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/3-1.png",
        name: "Bánh Chocolate",
        price: 12000,
        description: "",
        energy: 50,
        ingredient: "...",
        quantity: 70,
      },
      {
        id_type: 3,
        id_item: 15,
         image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/3-1.png",
        name: "Bánh nướng xốp chocolate",
        price: 20000,
        description: "",
        energy: 50,
        ingredient: "...",
        quantity: 70,
      },
      {
        id_type: 3,
        id_item: 16,
         image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/3-1.png",
        name: "Bánh Muffin chocolate",
        price: 15000,
        description: "",
        energy: 50,
        ingredient: "...",
        quantity: 70,
      },
      {
        id_type: 4,
        id_item: 17,
        image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/3-1.png",
        name: "Mì Ý ức gà nướng",
        price: 17000,
        description: "",
        energy: 25,
        ingredient: "...",
        quantity: 40,
      },
      {
        id_type: 4,
        id_item: 18,
        image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/35-1.png",
        name: "Mì Ý gà",
        price: 12000,
        description: "",
        energy: 25,
        ingredient: "...",
        quantity: 40,
      },
      {
        id_type: 4,
        id_item: 19,
        image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/6-1.png",
        name: "Mì Ý hải sản",
        price: 20000,
        description: "",
        energy: 25,
        ingredient: "...",
        quantity: 40,
      },
      {
        id_type: 5,
        id_item: 20,
        image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/9-1.png",
        name: "Pizza hải sản",
        price: 13000,
        description: "",
        energy: 25,
        ingredient: "...",
        quantity: 40,
      },
      {
        id_type: 5,
        id_item: 21,
        image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/37-1.png",
        name: "Pizza thập cẩm",
        description: "",
        energy: 25,
        price: 15000,
        energy: 25,
        ingredient: "...",
        quantity: 40,
      },
      {
        id_type: 5,
        id_item: 22,
        image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/18-1.png",
        name: "Pizza chay",
        description: "",
        energy: 25,
        price: 15000,
        energy: 25,
        ingredient: "...",
        quantity: 40,
      },
      {
        id_type: 6,
        id_item: 23,
        image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/33-1.png",
        name: "Bánh mì kẹp thịt",
        description: "",
        energy: 25,
        price: 15000,
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
