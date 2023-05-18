const {
  sequelize,
} = require("../../models");
const { QueryTypes } = require("sequelize");
const checkCreateAccount = (Model) => {
  return async (req, res, next) => {
    const { username } = req.body;
    const account = await Model.findOne({
      where: {
        username,
      },
    });
    if (!account) {
      next();
    } else {
      res.status(400).json({ message: "Tài khoản đã tồn tại!" });
    }
  };
};

const checkEmail = (Model) => {
  return async (req, res, next) => {
    const { email } = req.body;
    const account = await Model.findOne({
      where: {
        email,
      },
    });
    if(account){
      res.status(400).json({ message: "Email đã tồn tại!" });
    }
    else {
      next();
    }
  };
};
const checkPhone = (Model) => {
  return async (req, res, next) => {
    const { phone } = req.body;
    const account = await Model.findOne({
      where: {
        phone,
      },
    });
    if(account){
      res.status(400).json({ message: "Số điện thoại đã tồn tại!" });
    }
    else {
      next();
    }
  };
};

const checkCreateItem = (Model) => {
  return async (req, res, next) => {
    const { name, price, id_type } = req.body;
    const item = await Model.findOne({
      where: {
        name,
        price,
        id_type,
      },
    });
    if (!item) {
      next();
    } else {
      res.status(400).json({ message: "Sản phẩm đã tồn tại!" });
    }
  };
};

const checkCreateReview = (Model) => {
  return async (req, res, next) => {
    const { id_order } = req.query;
    const order = await Model.findOne({
      where: {
        id_order,
      },
    });
    if (order.status == 1) {
      const check7day = await sequelize.query(
        "SELECT O.id_customer, datediff(curdate(), O.datetime) as count FROM orders as O WHERE O.id_order = :id_order",
        {
          replacements: {
            id_order: id_order,
          },
          type: QueryTypes.SELECT,
        }
      );
      if (check7day[0].count <= 7) {
        next();
      } else {
        res
          .status(400)
          .json({ message: "Đơn hàng đã vượt quá 7 ngày mua không thể đánh giá!" });
      }
    } else {
      res
        .status(400)
        .json({ message: "Đơn hàng đã bị huỷ hoặc chưa được xác nhận. Không thể đánh giá!" });
    }
  };
};

const checkItemValue = (Model) => {
  return async (req, res, next) => {
    const { quantity, price, energy } = req.body;
    if (quantity > 0) {
      if (price > 0) {
        if (energy > 0) {
          next();
        } else {
          res.status(400).json({ message: "Năng lượng phải lớn hơn 0!" });
        }
      } else {
        res.status(400).json({ message: "Giá phải lớn hơn 0!" });
      }
    } else {
      res.status(400).json({ message: "Số lượng phải lớn hơn 0!" });
    }
  };
};

module.exports = {
  checkCreateAccount,
  checkCreateItem,
  checkItemValue,
  checkCreateReview,
  checkEmail,
  checkPhone,
};
