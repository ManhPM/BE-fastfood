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

const updateItemInWishList = async (req, res) => {
  const { id_item } = req.params;
  try {
    const info = await Item.sequelize.query(
      "SELECT W.* FROM wishlists as W, customers as CU, accounts as A WHERE A.username = :username AND CU.id_account = A.id_account AND CU.id_customer = W.id_customer",
      {
        replacements: { username: `${req.username}` },
        type: QueryTypes.SELECT,
        raw: true,
      }
    );
    const isExist = await Wishlist_detail.findOne({
      where: {
        id_item,
        id_wishlist: info[0].id_wishlist,
      },
    });

    if (isExist) {
      await Wishlist_detail.destroy({
        where: {
          id_item,
          id_wishlist: info[0].id_wishlist,
        },
      });
      res.status(201).json({ message: "Đã xoá khỏi mục yêu thích!" });
    } else {
      await Wishlist_detail.create({
        id_item,
        id_wishlist: info[0].id_wishlist,
      });
      res.status(201).json({ message: "Đã thêm vào danh sách yêu thích!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Thao tác thất bại!" });
  }
};

module.exports = {
    getAllType,
  updateItemInWishList,
};
