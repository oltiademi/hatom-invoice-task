const JwtUtils = require("../utils/jwtUtils");
const jwtUtils = new JwtUtils();
const User = require("../models/User");
const AppError = require("../errorHandling/AppError");

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1]; //Bearer token
  }

  if (!token) {
    next(new AppError(401, "You are not logged in!"));
  }

  try {
    const decoded = await jwtUtils.verifyToken(token);

    const currentUser = await User.findById(decoded.id);
    
    if (!currentUser) {
      next(new AppError(401, "The user belonging to this token no longer exists"));
    }

    req.user = currentUser;
    next();
  } catch (error) {
    next(new AppError(401, "You are not logged in!"));
  }
};

module.exports = protect;
