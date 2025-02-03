
const AppError = require("../errorHandling/AppError")
class AuthService {
  constructor(repository, jwtUtils) {
    this.repository = repository;
    this.jwtUtils = jwtUtils
  }
  async register(userData) {
    try{
    return await this.repository.register(userData);
    }catch(err){
      throw new AppError(500, "Failed to register")
    }
  }

  async login(email, password) {
    const user = await this.repository.findUserByEmail(email);
    if(!user) throw new AppError(404, "User not found");

    const passwordMatch = await user.verifyPassword(password);
    if (!passwordMatch) throw new AppError(400, "Invalid credentials");
    
    return user;
  }

  sendJwtToken(user, statusCode, res) {
    const token = this.jwtUtils.signToken(user._id);

    const cookieOptions = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.cookie("jwt", token, cookieOptions);
    user.password = undefined; //hide password
    res.status(statusCode).json({
      success: true,
      token,
      user,
    });
  }
}

module.exports = AuthService;
