const express = require("express");
const AuthController = require("../controllers/AuthController");
const AuthRepository = require("../repository/AuthRepository");
const AuthService = require("../service/AuthService");
const JwtUtils = require("../utils/jwtUtils");
const protect = require("../middleware/protect");
const checkRole = require("../middleware/checkRole");

const router = express.Router();

const authRepository = new AuthRepository();
const jwtUtils = new JwtUtils()
const authService = new AuthService(authRepository, jwtUtils);
const authController = new AuthController(authService);

router.post("/register",protect,checkRole(["superadmin", 'admin', 'manager']), authController.register);
router.post("/login", authController.login);
router.get("/protected", protect,checkRole(["superadmin"]), (req,res)=>{res.json("protected")});

module.exports = router;
