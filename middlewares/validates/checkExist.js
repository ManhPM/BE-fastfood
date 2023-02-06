const checkExistItem = (Model) => {
  return async (req, res, next) => {
    const { id_item } = req.params;
    const item = await Model.findOne({
      where: {
        id_item,
      },
    });
    if (item) {
      next();
    } else {
      res.status(404).send({ message: "Không tìm thấy Item!" });
    }
  };
};

const checkExistAccount = (Model) => {
  return async (req, res, next) => {
    const { username } = req;
    const account = await Model.findOne({
      where: {
        username,
      },
    });
    if (account) {
      next();
    } else {
      res.status(404).send({ message: "Không tìm thấy Account!" });
    }
  };
};

const checkLogin = (Model) => {
  return async (req, res, next) => {
    const { username } = req.body;
    const account = await Model.findOne({
      where: {
        username,
      },
    });
    if (account) {
      next();
    } else {
      res.status(404).send({ message: "Không tìm thấy Account!" });
    }
  };
};

module.exports = {
  checkExistItem,
  checkExistAccount,
  checkLogin
};
