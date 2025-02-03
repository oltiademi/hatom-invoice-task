const { promisify } = require("util");
const jwt = require("jsonwebtoken");

class JwtUtils {
  signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "90d",
    });
  };

  verifyToken = (token) => {
    return promisify(jwt.verify)(token, process.env.JWT_SECRET);
  };
}

module.exports = JwtUtils;
