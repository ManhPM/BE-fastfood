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
      res.status(404).json({ message: "Tài khoản đã tồn tại!" });
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
      res.status(404).json({ message: "Sản phẩm đã tồn tại!" });
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
      next();
    } else {
      res
        .status(404)
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
};
