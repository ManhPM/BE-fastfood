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
      res.status(404).send({ message: "Username đã tồn tại!" , isSuccess: false });
    }
  };
};

module.exports = {
  checkCreateAccount
};
