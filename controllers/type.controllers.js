const { Type } = require("../models");
const { QueryTypes } = require("sequelize");

const createType = async (req, res) => {
  const { name } = req.body
  try {
      await Type.create({ name })
      res.status(201).json({message: "Tạo mới  thành công!"})
  } catch (error) {
      res.status(500).json({message: "Đã có lỗi xảy ra!"})
  }
}

const updateType = async (req, res) => {
  const { id_type } = req.params
  const { name } = req.body
  try {
      const typeUpdate = await Type.findOne({
        where: {
          id_type
        }
      })
      typeUpdate.name = name
      await typeUpdate.save();
      res.status(201).json({message: "Cập nhật thành công!"})
  } catch (error) {
      res.status(500).json({message: "Đã có lỗi xảy ra. Cập nhật thất bại!"})
  }
}

const deleteType = async (req, res) => {
  const { id_type } = req.params
  try {
      const typeUpdate = await Type.findOne({
        where: {
          id_type
        }
      })
      typeUpdate.status = 0;
      await typeUpdate.save();
      res.status(201).json({message: "Xoá thành công!"})
  } catch (error) {
      res.status(500).json({message: "Đã có lỗi xảy ra. Xoá thất bại!"})
  }
}

const getAllType = async (req, res) => {
  try {
    const typeList = await Type.sequelize.query(
      "SELECT T.*, COUNT(I.id_item) as quantity FROM types as T, items as I WHERE I.id_type = T.id_type group by T.id_type",
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
    createType,
    updateType,
    deleteType,
};
