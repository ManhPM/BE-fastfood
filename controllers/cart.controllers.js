const {
  Cart,
  Cart_detail,
  Item,
  Order,
  Order_detail,
} = require("../models");
const { QueryTypes } = require("sequelize");

const getAllItemInCart = async (req, res) => {
  try {
    const info = await Item.sequelize.query(
      "SELECT SUM(I.price*CD.quantity) as total FROM carts as C, cart_details as CD, items as I, accounts as A, customers as CU WHERE A.id_account = CU.id_account AND CU.id_customer = C.id_customer AND C.id_cart = CD.id_cart AND CD.id_item = I.id_item AND A.username = :username",
      {
        replacements: { username: `${req.username}` },
        type: QueryTypes.SELECT,
        raw: true,
      }
    );
    const itemList = await Item.sequelize.query(
      "SELECT CD.id_item, CD.id_cart, CD.quantity as amount, I.image, I.name, I.price, I.quantity FROM carts as C, cart_details as CD, items as I, accounts as A, customers as CU WHERE A.id_account = CU.id_account AND CU.id_customer = C.id_customer AND C.id_cart = CD.id_cart AND CD.id_item = I.id_item AND A.username = :username",
      {
        replacements: { username: `${req.username}` },
        type: QueryTypes.SELECT,
        raw: true,
      }
    );
    res.status(200).json({itemList});
  } catch (error) {
    res.status(500).json(error);
  }
};
const createItemInCart = async (req, res) => {
  const { id_item } = req.params;
  const { quantity } = req.body;
  try {
    const info = await Cart.sequelize.query(
      "SELECT C.* FROM carts as C, customers as CU, accounts as A WHERE A.username = :username AND CU.id_account = A.id_account AND CU.id_customer = C.id_customer",
      {
        replacements: { username: `${req.username}` },
        type: QueryTypes.SELECT,
        raw: true,
      }
    );
    const isExist = await Cart_detail.findOne({
      where: {
        id_item,
        id_cart: info[0].id_cart,
      },
    });
    const item = await Item.findOne({
      where: {
        id_item,
      },
    });
    if (isExist) {
      if (quantity) {
        if(quantity <= 0){
          res.status(400).json({ message: "Số lượng phải lớn hơn 0!" });
        }
        else {
          if (quantity + isExist.quantity > item.quantity) {
            isExist.quantity = item.quantity;
            await isExist.save();
            res
              .status(201)
              .json({
                message:
                  "Sản phẩm vượt quá số lượng tối đa được phép mua. Tự động lấy số lượng tối đa!",
              });
          } else {
            isExist.quantity = isExist.quantity + quantity;
            await isExist.save();
            res.status(201).json({ message: "Đã thêm vào giỏ hàng!" });
          }
        }
      } else {
        if (isExist.quantity == item.quantity) {
          res
            .status(201)
            .json({
              message:
                "Sản phẩm vượt quá số lượng tối đa được phép mua. Tự động lấy số lượng tối đa!",
            });
        } else {
          isExist.quantity = isExist.quantity + 1;
          await isExist.save();
          res.status(201).json({ message: "Đã thêm vào giỏ hàng!" });
        }
      }
    } else {
      if (quantity) {
        if (quantity > item.quantity) {
          await Cart_detail.create({
            id_item,
            id_cart: info[0].id_cart,
            quantity: item.quantity,
          });
          res
            .status(201)
            .json({
              message:
                "Sản phẩm vượt quá số lượng tối đa được phép mua. Tự động lấy số lượng tối đa!",
            });
        } else {
          await Cart_detail.create({
            id_item,
            id_cart: info[0].id_cart,
            quantity: quantity,
          });
          res.status(201).json({ message: "Đã thêm vào giỏ hàng!" });
        }
      } else {
        if (item.quantity >= 1) {
          await Cart_detail.create({
            id_item,
            id_cart: info[0].id_cart,
            quantity: 1,
          });
          res.status(201).json({ message: "Đã thêm vào giỏ hàng!" });
        } else {
          res.status(400).json({ message: "Sản phẩm đã hết hàng!" });
        }
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Thao tác thất bại!" });
  }
};

const updateItemInCart = async (req, res) => {
  const { id_item } = req.params;
  const { quantity } = req.body
  try {
    const info = await Cart.sequelize.query(
      "SELECT C.* FROM carts as C, customers as CU, accounts as A WHERE A.username = :username AND CU.id_account = A.id_account AND CU.id_customer = C.id_customer",
      {
        replacements: { username: `${req.username}` },
        type: QueryTypes.SELECT,
        raw: true,
      }
    );
    const itemInCart = await Cart_detail.findOne({
      where: {
        id_item,
        id_cart: info[0].id_cart,
      },
    });
    const item = await Item.findOne({
      where: {
        id_item,
      },
    });
    if(quantity <= 0){
      res.status(400).json({ message: "Số lượng phải lớn hơn 0!" });
    }
    else {
      if (item.quantity < quantity) {
        res.status(400).json({ message: "Số lượng vượt quá tồn. Tự động lấy số lượng tối đa!" });
      } else {
        itemInCart.quantity = quantity;
        await itemInCart.save();
        res.status(201).json({ message: "Điều chỉnh số lượng thành công!" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Điều chỉnh số lượng thất bại!" });
  }
};

const increaseNumItemInCart = async (req, res) => {
  const { id_item } = req.params;
  try {
    const info = await Cart.sequelize.query(
      "SELECT C.* FROM carts as C, customers as CU, accounts as A WHERE A.username = :username AND CU.id_account = A.id_account AND CU.id_customer = C.id_customer",
      {
        replacements: { username: `${req.username}` },
        type: QueryTypes.SELECT,
        raw: true,
      }
    );
    const itemInCart = await Cart_detail.findOne({
      where: {
        id_item,
        id_cart: info[0].id_cart,
      },
    });
    const item = await Item.findOne({
      where: {
        id_item,
      },
    });
    if (item.quantity == itemInCart.quantity) {
      res.status(400).json({ message: "Số lượng có thể đặt đã đạt tối đa!" });
    } else {
      itemInCart.quantity = itemInCart.quantity + 1;
      await itemInCart.save();
      res.status(201).json({ message: "Thao tác thành công!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Điều chỉnh số lượng thất bại!" });
  }
};

const decreaseNumItemInCart = async (req, res) => {
  const { id_item } = req.params;
  try {
    const info = await Cart.sequelize.query(
      "SELECT C.* FROM carts as C, customers as CU, accounts as A WHERE A.username = :username AND CU.id_account = A.id_account AND CU.id_customer = C.id_customer",
      {
        replacements: { username: `${req.username}` },
        type: QueryTypes.SELECT,
        raw: true,
      }
    );
    const itemInCart = await Cart_detail.findOne({
      where: {
        id_item,
        id_cart: info[0].id_cart,
      },
    });
    if (itemInCart.quantity < 2) {
      await Cart_detail.destroy({
        where: {
          id_item,
          id_cart: info[0].id_cart,
        },
      });
      res.status(201).json({ message: "Thao tác thành công!" });
    } else {
      itemInCart.quantity = itemInCart.quantity - 1;
      await itemInCart.save();
      res.status(201).json({ message: "Thao tác thành công!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Điều chỉnh số lượng thất bại!" });
  }
};

const deleteOneItemInCart = async (req, res) => {
  const { id_item } = req.params;
  try {
    const info = await Cart.sequelize.query(
      "SELECT C.* FROM carts as C, customers as CU, accounts as A WHERE A.username = :username AND CU.id_account = A.id_account AND CU.id_customer = C.id_customer",
      {
        replacements: { username: `${req.username}` },
        type: QueryTypes.SELECT,
        raw: true,
      }
    );
    const result = await Cart_detail.destroy({
      where: {
        id_item,
        id_cart: info[0].id_cart,
      },
    });
    if (result) {
      res.status(201).json({ message: "Đã xoá khỏi giỏ hàng!" });
    } else {
      res.status(400).json({ message: "Đã có lỗi xảy ra!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Thao tác thất bại!" });
  }
};

const checkout = async (req, res) => {
  const { id_payment, description } = req.body;
    try {
      const info = await Cart.sequelize.query(
        "SELECT C.* FROM carts as C, customers as CU, accounts as A WHERE A.username = :username AND CU.id_account = A.id_account AND CU.id_customer = C.id_customer",
        {
          replacements: { username: `${req.username}` },
          type: QueryTypes.SELECT,
          raw: true,
        }
      );
      const itemInCartList = await Cart_detail.findAll({
        where: {
          id_cart: info[0].id_cart,
        },
      });
      const total = await Cart.sequelize.query(
        "SELECT SUM(cart_details.quantity*items.price) as total FROM cart_details, items, carts WHERE cart_details.id_cart = carts.id_cart AND cart_details.id_item = items.id_item AND carts.id_cart = :id_cart",
        {
          replacements: { id_cart: info[0].id_cart },
          type: QueryTypes.SELECT,
          raw: true,
        }
      );
      if (itemInCartList.length) {
        const date = new Date();
        date.setHours(date.getHours() + 7);
        const newOrder = await Order.create({
          description,
          id_payment,
          datetime: date,
          id_customer: info[0].id_customer,
          total: total[0].total,
          status: 0,
        });
        let i = 0;
        while (itemInCartList[i]) {
          await Cart.sequelize.query(
            "INSERT INTO `order_details` VALUES (:id_order,:id_item,:quantity,0)",
            {
              replacements: { 
                id_order: newOrder.id_order,
                id_item: itemInCartList[i].id_item,
                quantity: itemInCartList[i].quantity 
              },
              type: QueryTypes.INSERT,
              raw: true,
            }
          );
          await Cart.sequelize.query(
            "DELETE FROM cart_details WHERE id_item = :id_item AND id_cart = :id_cart",
            {
              replacements: { 
                id_item: itemInCartList[i].id_item,
                id_cart: itemInCartList[i].id_cart,
              },
              type: QueryTypes.DELETE,
              raw: true,
            }
          );
          i++;
        }
        res.status(201).json({ message: "Đặt hàng thành công!" });
      } else {
        res.status(400).json({ message: "Giỏ hàng của bạn đang trống!" });
      }
    } catch (error) {
      res.status(500).json({ message: "Server Error!" });
    }
};

module.exports = {
  getAllItemInCart,
  updateItemInCart,
  createItemInCart,
  increaseNumItemInCart,
  decreaseNumItemInCart,
  deleteOneItemInCart,
  checkout,
};
