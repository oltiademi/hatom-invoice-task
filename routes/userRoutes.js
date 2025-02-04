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

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authentication management routes
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Superadmins can register new users, first need to be authorized by the login route
 *     tags: [Authentication]
 *     security:
 *       - BearerAuth: []  # Requires authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "newuser"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "newuser@gmail.com"
 *               password:
 *                 type: string
 *                 example: "test1234"
 *               phoneNumber:
 *                 type: string
 *                 example: "3424324"
 *               role:
 *                 type: string
 *                 enum: [superadmin, admin, manager]
 *                 example: "manager"
 *     responses:
 *       201:
 *         description: Successfully registered a new user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "61a7f7b5e6c09c001c5a5b14"
 *                     username:
 *                       type: string
 *                       example: "newuser"
 *                     email:
 *                       type: string
 *                       example: "newuser@gmail.com"
 *                     role:
 *                       type: string
 *                       example: "manager"
 *       400:
 *         description: Bad request (missing fields, invalid email, etc.)
 *       401:
 *         description: Unauthorized (invalid or missing token)
 */
router.post("/register", protect, checkRole(["superadmin", "admin", "manager"]), authController.register);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: User login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "test@example.com"
 *               password:
 *                 type: string
 *                 example: "test1234"
 *     responses:
 *       200:
 *         description: Successfully authenticated, returns JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true 
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Invalid credentials
 */
router.post("/login", authController.login);

module.exports = router;
