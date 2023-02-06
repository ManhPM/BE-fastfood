const { Item, Order, Order_detail } = require("../models");
const { QueryTypes } = require("sequelize");

const getAllOrder = async (req, res) => {
  try {
    const info = await Order.sequelize.query(
      "SELECT R.id_role FROM roles as R, accounts as A WHERE A.username = :username AND A.id_role = R.id_role",
      {
        replacements: { username: `${req.username}` },
        type: QueryTypes.SELECT,
        raw: true,
      }
    );
    if (info[0].id_role == 1) {
      const customer = await Order.sequelize.query(
        "SELECT C.* FROM carts as C, customers as CU, accounts as A WHERE A.username = :username AND CU.id_account = A.id_account AND CU.id_customer = C.id_customer",
        {
          replacements: { username: `${req.username}` },
          type: QueryTypes.SELECT,
          raw: true,
        }
      );
      const orderList = await Order.findAll({
        where: {
          id_customer: customer[0].id_customer,
        },
      });
      res.status(200).json(orderList);
    } else {
      const orderList = await Order.findAll({});
      res.status(200).json(orderList);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllItemInOrder = async (req, res) => {
  const { id_order } = req.params;
  try {
    const orderDetailList = await Order.sequelize.query(
      "SELECT OD.*, I.name FROM items as I, order_details as OD, orders as O WHERE OD.id_item = I.id_item AND O.id_order = OD.id_order AND O.id_order = :id_order",
      {
        replacements: { id_order: id_order },
        type: QueryTypes.SELECT,
        raw: true,
      }
    );
    res.status(200).json(orderDetailList);
  } catch (error) {
    res.status(500).json(error);
  }
};

const confirmOrder = async (req, res) => {
  const { id_order } = req.params;
  try {
    const order = await Order.findOne({
      where: {
        id_order,
      },
    });
    order.status = 1;
    await order.save();
    res.status(201).json({ message: "Xác nhận đơn hàng!" });
  } catch (error) {
    res.status(500).json({ message: "Thao tác thất bại!" });
  }
};

const deleteOrder = async (req, res) => {
  const { id_order } = req.params;
  try {
    let i = 0;
    const order_detailList = await Order_detail.findAll({
      where: {
        id_order,
      },
    });
    while (order_detailList[i]) {
      await Order_detail.destroy({
        where: {
          id_order: order_detailList[i].id_order,
          id_item: order_detailList[i].id_item,
        },
      });
      i++;
    }
    await Order.destroy({
      where: {
        id_order,
      },
    });
    res.status(201).json({ message: "Đơn hàng đã được huỷ bỏ!" });
  } catch (error) {
    res.status(500).json({ message: "Thao tác thất bại!" });
  }
};

module.exports = {
  getAllOrder,
  getAllItemInOrder,
  confirmOrder,
  deleteOrder,
};
