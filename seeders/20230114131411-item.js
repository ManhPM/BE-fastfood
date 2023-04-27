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
        image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/2-1.png",
        name: "Burger thịt xông khói",
        price: 35000,
        description:
          "Hương vị đến từ thịt heo được chế biến theo đặc trưng riêng của cửa hàng",
        energy: 12.5,
        ingredient: "Bánh mì burger, thịt heo, cà chua, salat,...",
        quantity: 50,
      },
      {
        id_type: 1,
        image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/7-1.png",
        name: "Burger bơ phô mai",
        price: 40000,
        description:
          "Hương vị đến từ thịt heo được chế biến theo đặc trưng riêng của cửa hàng và có thêm lớp phô mai",
        energy: 20.5,
        ingredient: "Bánh mì burger, thịt heo, cà chua, salat, bơ phô mai,...",
        quantity: 60,
      },
      {
        id_type: 1,
        image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/8-1.png",
        name: "Burger gà",
        price: 25000,
        description: "Hương vị thơm ngon từ gà nướng",
        energy: 50,
        ingredient: "Bánh mì burger, gà nướng, cà chua, salat,...",
        quantity: 70,
      },
      {
        id_type: 1,
        image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/14-1.png",
        name: "Burger 2 miếng bò",
        price: 22000,
        description: "Hương vị bò bít tết nướng",
        energy: 50,
        ingredient: "Bánh mì burger, bò bít tết nướng, cà chua, salat,...",
        quantity: 70,
      },
      {
        id_type: 1,
        image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/15-1.png",
        name: "Burger 2 phô mai",
        price: 23000,
        description: "Hương vị thịt heo nướng và phủ lớp phô mai",
        energy: 50,
        ingredient: "Bánh mì burger, thịt heo, cà chua, salat, bơ phô mai,...",
        quantity: 70,
      },
      {
        id_type: 1,
        image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/34-1.png",
        name: "Burger cá hồi",
        price: 16000,
        description: "Hương vị cá hồi nướng",
        energy: 50,
        ingredient: "Bánh mì burger, cá hồi, cà chua, salat,...",
        quantity: 70,
      },
      {
        id_type: 1,
        image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/13-1.png",
        name: "Burger chay",
        price: 16000,
        description: "Chỉ có bơ và rau củ",
        energy: 50,
        ingredient: "Bánh mì burger, cà chua, salat,...",
        quantity: 70,
      },
      {
        id_type: 1,
        image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/15-1.png",
        name: "Burger ức gà rán",
        price: 16000,
        description: "Hương vị ức gà nướng",
        energy: 50,
        ingredient: "Bánh mì burger, ức gà nường, cà chua, salat,...",
        quantity: 70,
      },
      {
        id_type: 2,
        image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/5-1.png",
        name: "Sinh tố dâu",
        price: 15000,
        description: "Giàu năng lượng và giải khát",
        energy: 50,
        ingredient: "Sữa, quả dâu,...",
        quantity: 70,
      },
      {
        id_type: 2,
        image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/16-1.png",
        name: "Nước ép cam tươi",
        price: 15000,
        description: "Tốt cho sức khỏe và giải khát",
        energy: 50,
        ingredient: "Cam tươi,...",
        quantity: 70,
      },
      {
        id_type: 2,
        image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/22-1.png",
        name: "Cola lạnh",
        price: 20000,
        description: "Giải khát",
        energy: 50,
        ingredient: "Nước coca-cola,...",
        quantity: 70,
      },
      {
        id_type: 2,
        image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/24-1.png",
        name: "Trà chanh",
        price: 30000,
        description: "Giải khát",
        energy: 50,
        ingredient: "Trà, chanh,...",
        quantity: 70,
      },
      {
        id_type: 2,
        image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/27-1.png",
        name: "Nước ép Kiwi",
        price: 25000,
        description: "Dinh dưỡng và giải khát",
        energy: 50,
        ingredient: "Kiwi tươi,...",
        quantity: 70,
      },
      {
        id_type: 2,
        image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/21-1.png",
        name: "Hot Cappuccino",
        price: 18000,
        description: "Giải khát",
        energy: 50,
        ingredient: "Cà phê,...",
        quantity: 70,
      },
      {
        id_type: 2,
        image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/4-1.png",
        name: "Cà phê Macchiato",
        price: 25000,
        description: "Giải khát",
        energy: 50,
        ingredient: "Cà phê, sữa",
        quantity: 70,
      },
      {
        id_type: 2,
        image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/28-1.png",
        name: "Nước chanh bạc hà",
        price: 20000,
        description: "Giải khát",
        energy: 50,
        ingredient: "Chanh, siro bạc hà,...",
        quantity: 70,
      },
      {
        id_type: 2,
        image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/23-1.png",
        name: "Ca cao kem",
        price: 15000,
        description: "Giải khát",
        energy: 50,
        ingredient: "90% cacao, 10% kem",
        quantity: 70,
      },
      {
        id_type: 2,
        image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/38-1.png",
        name: "Cà phê Pizzaro ",
        price: 18000,
        description: "Giải khát",
        energy: 50,
        ingredient: "Cà phê",
        quantity: 70,
      },
      {
        id_type: 3,
        image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/10-1.png",
        name: "Bánh Chocolate",
        price: 12000,
        description: "Vị ngon cuốn hút",
        energy: 50,
        ingredient: "Bánh, sữa, trứng, chocolate,...",
        quantity: 70,
      },
      {
        id_type: 3,
        image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/41-1.png",
        name: "Bánh nướng xốp chocolate",
        price: 20000,
        description: "Vị ngon cuốn hút",
        energy: 50,
        ingredient: "Bánh, sữa, trứng, chocolate,...",
        quantity: 70,
      },
      {
        id_type: 3,
        image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/11-1.png",
        name: "Bánh Muffin chocolate",
        price: 15000,
        description: "Vị ngon cuốn hút",
        energy: 50,
        ingredient: "Bánh, sữa, trứng, chocolate,...",
        quantity: 70,
      },
      {
        id_type: 3,
        image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/31-1.png",
        name: "Cupcake chocolate",
        price: 15000,
        description: "Vị ngon cuốn hút",
        energy: 50,
        ingredient: "Bánh, sữa, trứng, chocolate,...",
        quantity: 70,
      },
      {
        id_type: 3,
        image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/11-1.png",
        name: "Cupcake chocolate mâm xôi",
        price: 15000,
        description: "Vị ngon cuốn hút",
        energy: 50,
        ingredient: "Bánh, sữa, trứng, chocolate, quả mâm xôi,...",
        quantity: 70,
      },
      {
        id_type: 3,
        image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/11-1.png",
        name: "Kem ốc quế",
        price: 15000,
        description: "Vị ngon mát lạnh",
        energy: 50,
        ingredient: "Kem tươi, ốc quế,...",
        quantity: 70,
      },
      {
        id_type: 3,
        image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/42-1.png",
        name: "Bánh Red Velvet",
        price: 15000,
        description: "Vị ngon cuốn hút",
        energy: 50,
        ingredient: "Bánh, sữa, trứng, mứt dâu,...",
        quantity: 70,
      },
      {
        id_type: 3,
        image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/44-1.png",
        name: "Kem dâu tươi",
        price: 15000,
        description: "Vị ngon mát lạnh",
        energy: 50,
        ingredient: "Kem dâu tươi,...",
        quantity: 70,
      },
      {
        id_type: 3,
        image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/30-1.png",
        name: "Kem tô",
        price: 15000,
        description: "Vị ngon mát lạnh",
        energy: 50,
        ingredient: "Kem ký,...",
        quantity: 70,
      },
      {
        id_type: 4,
        image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/3-1.png",
        name: "Mì Ý ức gà nướng",
        price: 17000,
        description: "Vị ngon từ gà Kobe",
        energy: 25,
        ingredient: "Mỳ ý, ức gà nướng, rau củ,...",
        quantity: 40,
      },
      {
        id_type: 4,
        image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/6-1.png",
        name: "Mì Ý hải sản",
        price: 20000,
        description: "Cảm nhận sự no nê",
        energy: 25,
        ingredient: "Mỳ ý, mực, tôm, rau củ,...",
        quantity: 40,
      },
      {
        id_type: 4,
        image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/35-1.png",
        name: "Mì ý vị gà sốt Trung Quốc",
        price: 20000,
        description: "Thưởng thức hương vị của nước bạn tại đây",
        energy: 25,
        ingredient: "Mỳ ý, gà, sốt Trung Quốc, rau củ,...",
        quantity: 40,
      },
      {
        id_type: 5,
        image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/9-1.png",
        name: "Pizza hải sản",
        price: 13000,
        description: "Nóng, giòn",
        energy: 25,
        ingredient: "Pizza, mực, tôm,...",
        quantity: 40,
      },
      {
        id_type: 5,
        image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/37-1.png",
        name: "Pizza thập cẩm",
        description: "Nóng, giòn",
        energy: 25,
        price: 15000,
        ingredient: "Pizza, mực, tôm, cá, cà rốt, khoai tây,...",
        quantity: 40,
      },
      {
        id_type: 5,
        image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/18-1.png",
        name: "Pizza chay",
        description: "Nóng, giòn",
        energy: 25,
        price: 15000,
        ingredient: "Pizza, rau củ quả,...",
        quantity: 40,
      },
      {
        id_type: 6,
        image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/33-1.png",
        name: "Bánh mì kẹp thịt",
        description: "Nóng, giòn",
        energy: 25,
        price: 15000,
        ingredient: "Bánh mì, thịt heo quay, pate,...",
        quantity: 40,
      },
      {
        id_type: 2,
        image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/25-1.png",
        name: "Snapple Cam",
        price: 15000,
        description: "Thức uống mang về, tràn đầy năng lượng",
        energy: 50,
        ingredient: "50% cam, 40% trà, 10% phụ gia",
        quantity: 20,
      },
      {
        id_type: 2,
        image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/39-1.png",
        name: "Hồng đào",
        price: 20000,
        description: "Giải khát giữa mùa hè nóng nực",
        energy: 60,
        ingredient: "Hồng đào nguyên chất",
        quantity: 30,
      },
      {
        id_type: 2,
        image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/45-1.png",
        name: "Sinh tố dâu",
        price: 25000,
        description: "Giải khát giữa mùa hè nóng nực",
        energy: 60,
        ingredient: "Dâu Đà Lạt, chanh",
        quantity: 30,
      },
      {
        id_type: 2,
        image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/46-1.png",
        name: "Nước ép cherry",
        price: 25000,
        description: "Giải khát giữa mùa hè nóng nực",
        energy: 60,
        ingredient: "Cherry, trà, chanh",
        quantity: 20,
      },
      {
        id_type: 2,
        image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/50-1.png",
        name: "Trio coffee",
        price: 30000,
        description: "Cà phê nguyên chất cùng topping ken sữa",
        energy: 80,
        ingredient: "Cà phê, sữa",
        quantity: 20,
      },
      {
        id_type: 2,
        image:
          "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/52-1.png",
        name: "Cam sành nhiệt đới",
        price: 28000,
        description: "Giải khát cùng nước ép cam sành từ Tây Nguyên",
        energy: 50,
        ingredient: "Cam, chanh",
        quantity: 40,
      }
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