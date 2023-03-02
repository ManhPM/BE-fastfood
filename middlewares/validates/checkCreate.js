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
      res.status(404).send({ message: "Tài khoản đã tồn tại!" });
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
        id_type
      },
    });
    if (!item) {
      next();
    } else {
      res.status(404).send({ message: "Sản phẩm đã tồn tại!" });
    }
  };
};

module.exports = {
  checkCreateAccount,
  checkCreateItem
};
