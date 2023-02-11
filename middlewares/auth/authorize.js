const { Account } = require("../../models");
const { QueryTypes } = require("sequelize");

const authorize = (arrType) => async (req, res, next) => {
    const { username } = req;
    const role = await Account.sequelize.query(
        "SELECT R.name FROM roles as R, accounts AS A WHERE A.id_role = R.id_role AND A.username = :username",
        {
          type: QueryTypes.SELECT,
          replacements: {
            username: `${username}`,
          },
        }
      );
    if(arrType.findIndex((ele) => ele === role[0].name) > -1) {
        next();
    }else {
        res.status(403).json({message: "Bạn không có quyền sử dụng chức năng này!"});
    }
};

module.exports = {
    authorize,
}