const User = require("../models/User");

class AuthRepository {
  async register(userData) {
    return await User.create(userData);
  }
  
  async findUserByEmail(email){
    return await User.findOne({email})
  }
}

module.exports = AuthRepository;
