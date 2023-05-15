const express = require("express");
const {Account} = require("./models");
const { QueryTypes } = require("sequelize");
const { sequelize } = require("./models");
const { rootRouter } = require("./routers");
const cookieParser = require("cookie-parser");
const {authenticate} = require("./middlewares/auth/authenticate")
const path = require("path");
const port = 3005;
const app = express();
const cors = require("cors");
const multer = require("multer");

app.use(cookieParser());
app.use(cors());
//cài ứng dụng sử dụng json
app.use(express.json());
//cài static file
app.use("/static", express.static(path.join(__dirname, "public")));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    console.log(req.username)
    cb(null, req.username + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/avatar", authenticate, upload.single("avatar"), async function (req, res, next) {
  try {
    const account = await Account.findOne({
      where: {
        username: req.username
      }
    })
    await Account.sequelize.query(
      "UPDATE customers SET image = :image WHERE id_account = :id_account",
      {
        replacements: { id_account: account.id_account, image: `${"http://localhost:3005/static/"+req.username + "-" + req.file.originalname}` },
        type: QueryTypes.UPDATE,
        raw: true,
      }
    );
    console.log(req.file)
    res.json({message: "Cập nhật ảnh đại diện thành công!"});
  } catch (error) {
    console.log(error);
  }
});

app.use(
  express.urlencoded({
    extended: true,
  })
);

//dùng router
app.use(rootRouter);

//lắng nghe sự kiện kết nối
app.listen(port, async () => {
  console.log(`App listening on http://localhost:${port}`);
  try {
    await sequelize.authenticate();
    console.log("Kết nối thành công!.");
  } catch (error) {
    console.error("Kết nối thất bại:", error);
  }
});
