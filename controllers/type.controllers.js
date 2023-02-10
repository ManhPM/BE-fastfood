const { Wishlist_detail, Type } = require("../models");
const { QueryTypes } = require("sequelize");

const getAllType = async (req, res) => {
  try {
    const typeList = await Type.sequelize.query(
      "SELECT T.*, COUNT(I.id_item) as quantity FROM types as T, items as I WHERE I.id_type = T.id_type group by T.name",
      {
        type: QueryTypes.SELECT,
        raw: true,
      }
    );
    res.status(200).json(typeList);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
    getAllType,
};
