const { Item, Order, Order_detail } = require("../models");
const { QueryTypes, and } = require("sequelize");

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
      const orderList = await Order.sequelize.query(
        "SELECT O.id_order, O.description, O.status, DATE_FORMAT(O.datetime, '%d/%m/%Y %H:%i') as datetime, (SELECT COUNT(id_item) FROM order_details WHERE isReviewed = 0 AND id_order = O.id_order) as reviewingCount, (SELECT SUM(OD.quantity*I.price) FROM order_details as OD, items as I WHERE I.id_item = OD.id_item AND O.id_order = OD.id_order) as total FROM orders as O WHERE O.id_customer = :id_customer ORDER BY O.datetime DESC, O.status ASC",
        {
          replacements: { id_customer: customer[0].id_customer },
          type: QueryTypes.SELECT,
          raw: true,
        }
      );
      res.status(200).json(orderList);
    } else {
      const { id_order, status } = req.query;
      if (id_order) {
        if (status) {
          const orderList = await Order.sequelize.query(
            "SELECT O.id_order, C.name as name_customer, C.phone, O.description, O.status, DATE_FORMAT(O.datetime, '%d/%m/%Y %H:%i') as datetime, (SELECT SUM(OD.quantity*I.price) FROM items as I, order_details as OD WHERE OD.id_item = I.id_item AND OD.id_order = O.id_order) as total, P.name as name_payment FROM orders as O, customers as C, payments as P WHERE O.id_customer = C.id_customer AND O.id_payment = P.id_payment AND O.id_order = :id_order AND O.status = :status",
            {
              replacements: { id_order: id_order, status: status },
              type: QueryTypes.SELECT,
              raw: true,
            }
          );
          res.status(200).json(orderList);
        } else {
          const orderList = await Order.sequelize.query(
            "SELECT O.id_order, C.name as name_customer, C.phone, O.description, O.status, DATE_FORMAT(O.datetime, '%d/%m/%Y %H:%i') as datetime, (SELECT SUM(OD.quantity*I.price) FROM items as I, order_details as OD WHERE OD.id_item = I.id_item AND OD.id_order = O.id_order) as total, P.name as name_payment FROM orders as O, customers as C, payments as P WHERE O.id_customer = C.id_customer AND O.id_payment = P.id_payment AND O.id_order = :id_order",
            {
              replacements: { id_order: id_order },
              type: QueryTypes.SELECT,
              raw: true,
            }
          );
          res.status(200).json(orderList);
        }
      } else {
        if (status) {
          const orderList = await Order.sequelize.query(
            "SELECT O.id_order, C.name as name_customer, C.phone, O.description, O.status, DATE_FORMAT(O.datetime, '%d/%m/%Y %H:%i') as datetime, (SELECT SUM(OD.quantity*I.price) FROM items as I, order_details as OD WHERE OD.id_item = I.id_item AND OD.id_order = O.id_order) as total, P.name as name_payment FROM orders as O, customers as C, payments as P WHERE O.id_customer = C.id_customer AND O.id_payment = P.id_payment AND O.status = :status ORDER BY O.datetime DESC",
            {
              replacements: { status: status },
              type: QueryTypes.SELECT,
              raw: true,
            }
          );
          res.status(200).json(orderList);
        } else {
          const orderList = await Order.sequelize.query(
            "SELECT O.id_order, C.name as name_customer, C.phone, O.description, O.status, DATE_FORMAT(O.datetime, '%d/%m/%Y %H:%i') as datetime, (SELECT SUM(OD.quantity*I.price) FROM items as I, order_details as OD WHERE OD.id_item = I.id_item AND OD.id_order = O.id_order) as total, P.name as name_payment FROM orders as O, customers as C, payments as P WHERE O.id_customer = C.id_customer AND O.id_payment = P.id_payment ORDER BY O.status ASC, O.datetime DESC",
            {
              type: QueryTypes.SELECT,
              raw: true,
            }
          );
          res.status(200).json(orderList);
        }
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllItemInOrder = async (req, res) => {
  const { id_order } = req.params;
  try {
    const itemList = await Order.sequelize.query(
      "SELECT OD.*, I.image, I.name, I.price, (I.price*OD.quantity) as amount FROM orders as O, order_details as OD, items as I WHERE O.id_order = OD.id_order AND OD.id_item = I.id_item AND O.id_order = :id_order",
      {
        replacements: { id_order: id_order },
        type: QueryTypes.SELECT,
        raw: true,
      }
    );
    const info = await Order.sequelize.query(
      "SELECT SUM((I.price*OD.quantity)) as total, DATE_FORMAT(O.datetime, '%d/%m/%Y %H:%i') as datetime, O.status, P.name as name_payment FROM payments as P, orders as O, order_details as OD, items as I WHERE O.id_order = OD.id_order AND OD.id_item = I.id_item AND P.id_payment = O.id_payment AND O.id_order = :id_order",
      {
        replacements: { id_order: id_order },
        type: QueryTypes.SELECT,
        raw: true,
      }
    );
    res
      .status(200)
      .json({
        total: info[0].total,
        datetime: info[0].datetime,
        status: info[0].status,
        name_payment: info[0].name_payment,
        itemList,
      });
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
    if (order.status != 1) {
      const itemListInOrder = await Order_detail.findAll({
        where: {
          id_order,
        },
      });
      let i = 0;
      while (itemListInOrder[i]) {
        const updateQuantity = await Item.findOne({
          where: {
            id_item: itemListInOrder[i].id_item,
          },
        });
        if (updateQuantity.quantity >= itemListInOrder[i].quantity) {
          updateQuantity.quantity =
            updateQuantity.quantity - itemListInOrder[i].quantity;
          await updateQuantity.save();
          i++;
        } else {
          order.status = 2;
          await order.save();
          res
            .status(400)
            .json({
              message: "S??? l?????ng h??ng c??n l???i kh??ng ?????. T??? ?????ng hu??? ????n!",
            });
        }
      }
      order.status = 1;
      await order.save();
      res.status(201).json({ message: "X??c nh???n ????n h??ng!" });
    } else {
      res
        .status(400)
        .json({ message: "Thao t??c th???t b???i. ????n h??ng ???? ???????c x??c nh???n!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Thao t??c th???t b???i!" });
  }
};

const cancelOrder = async (req, res) => {
  const { id_order } = req.params;
  try {
    const order = await Order.findOne({
      where: {
        id_order,
      },
    });
    if (order.status != 2) {
      order.status = 2;
      await order.save();
      res.status(200).json({ message: "????n h??ng ???? ???????c hu??? b???!" });
    } else {
      res
        .status(400)
        .json({ message: "Thao t??c th???t b???i. ????n h??ng ???? ???????c hu??? b???!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Thao t??c th???t b???i!" });
  }
};
const thongKeSanPham = async (req, res) => {
  const { tuNgay, denNgay } = req.query;
  try {
    if (tuNgay && denNgay) {
      // Th???ng k?? t??? ng??y tuNgay ?????n ng??y denNgay
      const thongKe = await Order_detail.sequelize.query(
        "SELECT (SELECT SUM(order_details.quantity) FROM items, order_details, orders where order_details.id_item = I.id_item AND order_details.id_order = orders.id_order AND orders.status = 1 AND order_details.id_item = items.id_item AND items.status != 0) as sold, (SELECT (SUM(order_details.quantity)*items.price) as total FROM items, order_details, orders where order_details.id_item = I.id_item AND order_details.id_order = orders.id_order AND orders.status = 1 AND order_details.id_item = items.id_item AND items.status != 0) as total, I.*, T.name AS name_type, (SELECT ROUND(AVG(R.rating) * 2, 0) / 2 FROM reviews AS R WHERE R.id_item = I.id_item) as rating FROM items as I, order_details as OD, types as T, orders as O WHERE OD.id_item = I.id_item AND O.id_order = OD.id_order AND T.id_type = I.id_type AND I.status != 0 AND O.status = 1 AND O.datetime BETWEEN :tuNgay AND :denNgay GROUP BY I.id_item ORDER BY sold DESC",
        {
          replacements: { tuNgay: `${tuNgay}`, denNgay: `${denNgay}` },
          type: QueryTypes.SELECT,
          raw: true,
        }
      );
      const info = await Order_detail.sequelize.query(
        "SELECT SUM((SELECT SUM(quantity*I.price) FROM order_details WHERE id_order = O.id_order AND id_item = OD.id_item)) as total FROM items as I, order_details as OD, types as T, orders as O WHERE OD.id_item = I.id_item AND O.id_order = OD.id_order AND T.id_type = I.id_type AND I.status != 0 AND O.status = 1 AND O.datetime between :tuNgay AND :denNgay",
        {
          replacements: { tuNgay: `${tuNgay}`, denNgay: `${denNgay}` },
          type: QueryTypes.SELECT,
          raw: true,
        }
      );

      res.status(200).json({total: info[0].total, itemList: thongKe});
    } else {
      // Th???ng k?? t??? tr?????c ?????n nay
      const thongKe = await Order_detail.sequelize.query(
        "SELECT (SELECT SUM(order_details.quantity) FROM items, order_details, orders where order_details.id_item = I.id_item AND order_details.id_order = orders.id_order AND orders.status = 1 AND order_details.id_item = items.id_item AND items.status != 0) as sold, (SELECT (SUM(order_details.quantity)*items.price) as total FROM items, order_details, orders where order_details.id_item = I.id_item AND order_details.id_order = orders.id_order AND orders.status = 1 AND order_details.id_item = items.id_item AND items.status != 0) as total, I.*, T.name AS name_type, (SELECT ROUND(AVG(R.rating) * 2, 0) / 2 FROM reviews AS R WHERE R.id_item = I.id_item) as rating FROM items as I, order_details as OD, types as T, orders as O WHERE OD.id_item = I.id_item AND O.id_order = OD.id_order AND T.id_type = I.id_type AND I.status != 0 AND O.status = 1 GROUP BY I.id_item ORDER BY sold DESC",
        {
          type: QueryTypes.SELECT,
          raw: true,
        }
      );
      const info = await Order_detail.sequelize.query(
        "SELECT SUM((SELECT SUM(quantity*I.price) FROM order_details WHERE id_order = O.id_order AND id_item = OD.id_item)) as total FROM items as I, order_details as OD, types as T, orders as O WHERE OD.id_item = I.id_item AND O.id_order = OD.id_order AND T.id_type = I.id_type AND I.status != 0 AND O.status = 1",
        {
          type: QueryTypes.SELECT,
          raw: true,
        }
      );
      res.status(200).json({total: info[0].total, itemList: thongKe});
    }
  } catch (error) {
    res.status(500).json({ message: "???? c?? l???i x???y ra!" });
  }
};

const thongKeDonHang = async (req, res) => {
  const { tuNgay, denNgay, status } = req.query;
  try {
    if (tuNgay && denNgay) {
      if (status) {
        // Th???ng k?? t??? ng??y tuNgay ?????n ng??y denNgay v???i status
        const info = await Order_detail.sequelize.query(
          "SELECT COUNT(O.id_order) as countOrder, (SELECT SUM(OD.quantity*I.price) as total FROM order_details as OD, orders as O, items as I WHERE O.id_order = OD.id_order AND I.id_item = OD.id_item AND O.status = :status AND I.status != 0 AND O.datetime BETWEEN :tuNgay AND :denNgay) as total, (SELECT COUNT(*) FROM (SELECT COUNT(OD.id_item) FROM order_details as OD, orders as O WHERE O.id_order = OD.id_order AND O.status = :status AND O.datetime BETWEEN :tuNgay AND :denNgay GROUP BY OD.id_item) as countItem) as countItem FROM orders as O WHERE O.datetime BETWEEN :tuNgay AND :denNgay AND O.status = :status",
          {
            replacements: { tuNgay: `${tuNgay}`, denNgay: `${denNgay}`, status: status },
            type: QueryTypes.SELECT,
            raw: true,
          }
        );
        res.status(200).json({ countOrder: info[0].countOrder, total: info[0].total, countItem: info[0].countItem });
      }
      else {
        // Th???ng k?? t??? ng??y tuNgay ?????n ng??y denNgay
        const info = await Order_detail.sequelize.query(
          "SELECT (SELECT SUM(OD.quantity*I.price) as total FROM order_details as OD, orders as O, items as I WHERE O.id_order = OD.id_order AND I.id_item = OD.id_item AND O.status = 1 AND I.status != 0 AND O.datetime BETWEEN  :tuNgay AND :denNgay) as total, (SELECT COUNT(*) FROM (SELECT COUNT(OD.id_item) FROM order_details as OD, orders as O WHERE O.id_order = OD.id_order AND O.status = 1 AND O.datetime BETWEEN  :tuNgay AND :denNgay GROUP BY OD.id_item) as countItem) as countItem, (SELECT COUNT(O.id_order) FROM orders as O WHERE O.datetime between  :tuNgay AND :denNgay) as countOrder, COUNT(O.id_order) as countConfirmedOrder, (SELECT COUNT(O.id_order) FROM orders as O WHERE O.status = 2 AND O.datetime between  :tuNgay AND :denNgay) AS countCancelOrder, (SELECT COUNT(O.id_order) FROM orders as O WHERE O.status = 0 AND O.datetime between  :tuNgay AND :denNgay) AS countUnConfirmedOrder FROM orders as O WHERE O.status = 1",
          {
            replacements: { tuNgay: `${tuNgay}`, denNgay: `${denNgay}` },
            type: QueryTypes.SELECT,
            raw: true,
          }
        );
        res.status(200).json(info[0]);
      }
    } else {
      // Th???ng k?? t??? tr?????c ?????n nay
      if(status){
        const info = await Order_detail.sequelize.query(
          "SELECT COUNT(O.id_order) as countOrder, (SELECT SUM(OD.quantity*I.price) as total FROM order_details as OD, orders as O, items as I WHERE O.id_order = OD.id_order AND I.id_item = OD.id_item AND O.status = :status AND I.status != 0) as total, (SELECT COUNT(*) FROM (SELECT COUNT(OD.id_item) FROM order_details as OD, orders as O WHERE O.id_order = OD.id_order AND O.status = :status GROUP BY OD.id_item) as countItem) as countItem FROM orders as O WHERE O.datetime AND O.status = :status",
          {
            replacements: { status: status },
            type: QueryTypes.SELECT,
            raw: true,
          }
        );
        res.status(200).json(info[0]);
      }
      else {
        const info = await Order_detail.sequelize.query(
          "SELECT (SELECT SUM(OD.quantity*I.price) as total FROM order_details as OD, orders as O, items as I WHERE O.id_order = OD.id_order AND I.id_item = OD.id_item AND O.status = 1 AND I.status != 0) as total, (SELECT COUNT(*) FROM (SELECT COUNT(OD.id_item) FROM order_details as OD, orders as O WHERE O.id_order = OD.id_order AND O.status = 1 GROUP BY OD.id_item) as countItem) as countItem, (SELECT COUNT(O.id_order) FROM orders as O) as countOrder, COUNT(O.id_order) as countConfirmedOrder, (SELECT COUNT(O.id_order) FROM orders as O WHERE O.status = 2) AS countCancelOrder, (SELECT COUNT(O.id_order) FROM orders as O WHERE O.status = 0) AS countUnConfirmedOrder FROM orders as O WHERE O.status = 1",
          {
            type: QueryTypes.SELECT,
            raw: true,
          }
        );
        res.status(200).json(info[0]);
      }
    }
  } catch (error) {
    res.status(500).json({ message: "???? c?? l???i x???y ra!" });
  }
};

module.exports = {
  getAllOrder,
  getAllItemInOrder,
  confirmOrder,
  cancelOrder,
  thongKeSanPham,
  thongKeDonHang,
};
