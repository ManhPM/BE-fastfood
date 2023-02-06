const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return res.sendStatus(403);
      }
      try {
        const data = jwt.verify(token, "manhpham2k1");
        req.username = data.username;
        return next();
      } catch {
        return res.sendStatus(403);
      }
}

module.exports = {
    authenticate,
}