const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "weconnect secret", (err, decodedToken) => {
      if (err) res.status(302).json({ url: "/login" });
      else next();
    });
  } else {
    res.status(302).json({ url: "/login" });
  }
};
module.exports = { requireAuth };
