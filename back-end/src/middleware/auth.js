const jwt = require("jsonwebtoken"); // Calculating...
const config = process.env;
const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.json({ state: false });
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.jsosn({ state: false });
  }
  return next();
};

module.exports = verifyToken;
