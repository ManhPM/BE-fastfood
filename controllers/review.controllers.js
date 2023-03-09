const {
  Review,
  Item,
  Customer,
  Order_detail,
  sequelize,
} = require("../models");
const { QueryTypes } = require("sequelize");

// Lấy Review theo sản phẩm
const getAllReviewByItem = async (req, res) => {
  const { id_item } = req.params;
  //console.log(id_item);
  try {
    const reviews = await sequelize.query(
      "SELECT Cus.name, Rev.rating , Rev.comment, DATE_FORMAT(Rev.datetime, '%d/%m/%Y %H:%i') as datetime FROM reviews as Rev, customers as Cus  Where id_item= :id_item AND Rev.id_customer = Cus.id_customer ORDER BY datetime DESC",
      {
        replacements: { id_item: id_item },
        type: QueryTypes.SELECT,
      }
    );
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json(error);
  }
};

const get4LastestReviewsByItem = async (req, res) => {
  try {
    const reviews = await sequelize.query(
      "SELECT I.name as name_item, R.id_item, R.rating, R.comment, DATE_FORMAT(R.datetime, '%d/%m/%Y %H:%i') as datetime, C.name as name_customer FROM reviews as R, customers as C, items as I WHERE R.id_customer = C.id_customer AND R.id_item = I.id_item ORDER BY R.datetime DESC LIMIT 4",
      {
        type: QueryTypes.SELECT,
      }
    );
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json(error);
  }
};

const createReviewByItem = async (req, res) => {
  const { id_item } = req.params;
  const { id_order } = req.query
  const { rating, comment } = req.body;
  try {
    // kiem tra xem co <= 7 ngay khong
    // lay id_customer
    const check7day = await sequelize.query(
      "SELECT O.id_customer, datediff(curdate(), O.datetime) as count FROM orders as O WHERE O.id_order = :id_order",
      {
        replacements: {
          id_order: id_order,
        },
        type: QueryTypes.SELECT,
      }
    );
     if(check7day[0].count <= 7){
      const datetime = new Date();
      datetime.setHours(datetime.getHours() + 7);
      await Review.create({
        id_item,
        id_customer: check7day[0].id_customer,
        comment,
        datetime: datetime,
        rating,
      });
      await Order_detail.update(
        { isReviewed: 1 },
        {
          where: {
            isReviewed: 0,
            id_order,
            id_item,
          },
        }
      );
      res.status(200).json({ message: "Đánh giá thành công!" });
     }
     else {
      res.status(400).json({ message: "Đánh giá thất bại. Đơn bạn đặt đã vượt quá 7 ngày!" });
     }
  } catch (error) {
    res.status(400).json({ message: "Đã có lỗi xảy ra!" });
  }


};
module.exports = {
  getAllReviewByItem,
  createReviewByItem,
  get4LastestReviewsByItem,
};
