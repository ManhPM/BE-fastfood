const multer = require('multer');
const { Account, Review, Order_detail, Order } = require("../../models")
const { QueryTypes } = require("sequelize");
const { sequelize } = require("../../models");

const storageAvatar = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/image");
  },
  filename: async function (req, file, cb) {
      try {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const account = await Account.findOne({
          where: {
            username: req.username
          }
        })
        await sequelize.query(
          "UPDATE customers SET image = :image WHERE id_account = :id_account",
          {
            replacements: {
              id_account: account.id_account,
              image: `${"http://localhost:3005/static/"+uniqueSuffix+"-"+file.originalname}`,
            },
            type: QueryTypes.UPDATE,
            raw: true,
          }
        );
        cb(null, uniqueSuffix+"-"+file.originalname);
      } catch (error) {
        console.log(error)
      }
  },
});

const storageReview = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/image");
  },
  filename: async function (req, file, cb) {
    const { id_item } = req.params;
    const { id_order } = req.query
    const { rating, comment } = req.body
      try {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const datetime = new Date();
        datetime.setHours(datetime.getHours() + 7);
        const order = await Order.findOne({
          where: {
            id_order  
          }
        })
          await Review.create({
            id_item,
            id_customer: order.id_customer,
            comment,
            datetime: datetime,
            rating,
            image: `${"http://localhost:3005/static/"+uniqueSuffix+"-"+file.originalname}`
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
          cb(null, uniqueSuffix+"-"+file.originalname);
      } catch (error) {
        console.log(error)
      }
  },
});

const uploadAvatar = multer({ storage: storageAvatar });
const uploadReview = multer({ storage: storageReview});

module.exports = {uploadAvatar, uploadReview}