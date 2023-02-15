const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return res.status(403).json({message: "Vui lòng đăng nhập!", isSuccess: false });
      }
      try {
        const data = jwt.verify(token, "manhpham2k1");
        req.username = data.username;
        return next();
      } catch {
        return res.status(403).json({message: "Đã có lỗi xảy ra!", isSuccess: false });
      }
}

module.exports = {
    authenticate,
}