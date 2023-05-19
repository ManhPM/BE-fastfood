const {
  Review,
  Order_detail,
  Order,
  sequelize,
} = require("../models");
const { QueryTypes } = require("sequelize");


// Lấy Review theo sản phẩm
const getAllReviewByItem = async (req, res) => {
  const { id_item } = req.params;
  //console.log(id_item);
  try {
    const reviews = await sequelize.query(
      "SELECT Cus.name, Rev.rating , Rev.comment, DATE_FORMAT(Rev.datetime, '%d/%m/%Y %H:%i') as datetime FROM reviews as Rev, customers as Cus  Where id_item= :id_item AND Rev.id_customer = Cus.id_customer ORDER BY Rev.datetime DESC",
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

const createReview = async (req, res) => {
  const { id_item } = req.params;
  const { id_order } = req.query
  const { rating, comment, image } = req.body
  try {
      const datetime = new Date();
      datetime.setHours(datetime.getHours() + 7);
      const order = await Order.findOne({
        where: {
          id_order
        }
      })
      if(image){
        await Review.create({
          id_item,
          id_customer: order.id_customer,
          comment,
          datetime: datetime,
          rating,
          image,
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
        await Review.create({
          id_item,
          id_customer: order.id_customer,
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
  } catch (error) {
    res.status(500).json({ message: "Đã có lỗi xảy ra!" });
  }
};

module.exports = {
  getAllReviewByItem,
  get4LastestReviewsByItem,
  createReview,
};
