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
  const { id_item } = req.params;
  //console.log(id_item);
  try {
    const reviews = await sequelize.query(
      "SELECT R.id_item, R.rating, R.comment, DATE_FORMAT(R.datetime, '%d/%m/%Y %H:%i') as datetime, C.name as name_customer FROM reviews as R, customers as C WHERE R.id_customer = C.id_customer AND R.id_item = :id_item ORDER BY datetime DESC LIMIT 4",
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



const createReviewByItem = async (req, res) => {
  const { id_item } = req.params;
  const { rating, comment } = req.body;
  try {
    const id_accountQuery = await sequelize.query(
      "SELECT id_account FROM accounts as Acc WHERE Acc.username = :username",
      {
        replacements: { username: `${req.username}` },
        type: QueryTypes.SELECT,
      }
    );
    // Tim customer
    const id_customerQuery = await sequelize.query(
      "SELECT id_customer FROM customers WHERE id_account = :id_account",
      {
        replacements: { id_account: id_accountQuery[0].id_account },
        type: QueryTypes.SELECT,
      }
    );
    //const id_customer = 2;
    const checkItemInSevenDays = await sequelize.query(
      "SELECT OrdOfCus.id_order, id_item,  datediff(now(), OrdOfCus.datetime) as thoiGianDat FROM order_details as Ord_det, (SELECT id_order,datetime FROM orders as Ord WHERE Ord.id_customer = :id_customer)  as OrdOfCus WHERE Ord_det.id_order = OrdOfCus.id_order AND Ord_det.id_item = :id_item AND Ord_det.isReviewed != 1 HAVING thoiGianDat < 7",
      {
        replacements: {
          id_customer: id_customerQuery[0].id_customer,
          id_item: id_item,
        },
        type: QueryTypes.SELECT,
      }
    );
    if (checkItemInSevenDays.length != 0) {
      //Kiem tra xem no co Review san pham nay chua
      // do sth

      //Tao comment
      const datetime = new Date();
      datetime.setHours(datetime.getHours() + 7);
      await Review.create({
        id_item,
        id_customer: id_customerQuery[0].id_customer,
        comment,
        datetime: datetime,
        rating,
      });

      //Cap nhat trang thai da Review san pham nay` roi`
      //const order_detail=Order_detail.findOne({ where: {id_oder: checkItemInSevenDays[0].id_order}});
      await Order_detail.update(
        { isReviewed: 1 },
        {
          where: {
            isReviewed: 0,
            id_order: checkItemInSevenDays[0].id_order,
            id_item: checkItemInSevenDays[0].id_item,
          },
        }
      );
      //await Order_detail.save();
      res.status(200).json({ message: "Đánh giá thành công!" });
    } else {
      res.status(404).json({ message: "Bạn không còn lượt đánh giá!" });
    }
  } catch (error) {
    res.status(500).json(error);
  }

  // Kiểm tra đã từng đặt món này chưa
};
module.exports = {
  getAllReviewByItem,
  createReviewByItem,
  get4LastestReviewsByItem,
};
