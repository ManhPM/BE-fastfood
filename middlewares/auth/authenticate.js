const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    const token = req.headers.access_token;
    const token2 = req.body.access_token;
    console.log("Token 1: ",token + " Token 2: ",token2)
    if (!token) {
        return res.status(403).json({message: "Vui lòng đăng nhập!" });
      }
      try {
        const data = jwt.verify(token, "manhpham2k1");
        req.username = data.username;
        return next();
      } catch {
        return res.status(403).json({message: "Vui lòng đăng nhập!" });
      }
}

module.exports = {
    authenticate,
}