const AppError = require("../errorHandling/AppError");

class AuthController {
  constructor(authService) {
    this.authService = authService;
  }
  register = async (req, res, next) => {
    try {
      const user = await this.authService.register(req.body);
      res.status(201).json({
        success: true,
        user,
      });
    } catch (error) {
      next(new AppError(500, error));
    }
  }; 
  login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const user = await this.authService.login(email, password);
      this.authService.sendJwtToken(user, 200, res);
    } catch (error) {
      next(new AppError(500, error));
    }
  };
}

module.exports = AuthController;
