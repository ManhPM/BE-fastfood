const express = require("express");
const {sequelize} = require("./models");
const {rootRouter} = require("./routers")
const { QueryTypes } = require("sequelize");
const cookieParser = require("cookie-parser");
const session = require('express-session');
const path = require("path");
const port = 3005;
const app = express();
const cors = require("cors");

app.use(cookieParser());
app.use(cors());
//cài ứng dụng sử dụng json
app.use(express.json());
//cài static file
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  express.urlencoded({
    extended: true,
  }),
);

//dùng router
app.use(rootRouter);

//lắng nghe sự kiện kết nối
app.listen(port, async () => {
    console.log(`App listening on http://localhost:${port}`);
    try {
        await sequelize.authenticate();
        console.log('Kết nối thành công!.');
      } catch (error) {
        console.error('Kết nối thất bại:', error);
      }
})