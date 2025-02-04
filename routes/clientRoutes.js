const express = require("express");
const router = express.Router();
const ClientRepository = require("../repository/ClientRepository");
const ClientService = require("../service/ClientService");
const ClientController = require("../controllers/ClientController");
const protect = require("../middleware/protect");
const checkRole = require("../middleware/checkRole");

const clientRepository = new ClientRepository();
const clientService = new ClientService(clientRepository);
const clientController = new ClientController(clientService);


/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: Client management routes, first you need to be authorized with a JWT token that you can get from the login request
 */

/**
 * @swagger
 * /clients/create:
 *   post:
 *     summary: Create a new client
 *     tags: [Clients]
 *     security:
 *       - BearerAuth: []  # Requires authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Test test"
 *               company:
 *                 type: string
 *                 example: "Test Company"
 *               address:
 *                 type: string
 *                 example: "123 Test Street"
 *               country:
 *                 type: string
 *                 example: "Test country"
 *               city:
 *                 type: string
 *                 example: "Test city"
 *               zipCode:
 *                 type: string
 *                 example: "10000"
 *               phoneNumber:
 *                 type: string
 *                 example: "444494"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "testemail@gmail.com"
 *               uniqueBusinessId:
 *                 type: string
 *                 example: "8888"
 *     responses:
 *       201:
 *         description: Successfully created client
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 client:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "Test test"
 *                     company:
 *                       type: string
 *                       example: "Test Company"
 *                     email:
 *                       type: string
 *                       example: "testemail@gmail.com"
 *                     uniqueBusinessId:
 *                       type: string
 *                       example: "8888"
 *       400:
 *         description: Bad request (missing fields, invalid data, etc.)
 *       401:
 *         description: Unauthorized (invalid or missing token)
 */
router.post(
  "/create",
  protect,
  checkRole(["superadmin", "admin", "manager"]),
  clientController.createClient
);

/**
 * @swagger
 * /clients/all:
 *   get:
 *     summary: Get all clients
 *     tags: [Clients]
 *     security:
 *       - BearerAuth: []  # Requires authentication
 *     responses:
 *       200:
 *         description: List of all clients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: "Test test"
 *                   company:
 *                     type: string
 *                     example: "Test"
 *                   email:
 *                     type: string
 *                     example: "testemail@gmail.com"
 *                   uniqueBusinessId:
 *                     type: string
 *                     example: "8888"
 *       401:
 *         description: Unauthorized (invalid or missing token)
 */
router.get("/all", protect, clientController.findAllClients);

/**
 * @swagger
 * /clients/findById/{businessId}:
 *   get:
 *     summary: Get client by business ID
 *     tags: [Clients]
 *     security:
 *       - BearerAuth: []  # Requires authentication
 *     parameters:
 *       - in: path
 *         name: businessId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique business ID of the client
 *     responses:
 *       200:
 *         description: Client data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: "Test test"
 *                 company:
 *                   type: string
 *                   example: "Test"
 *                 email:
 *                   type: string
 *                   example: "virtytademi@gmail.com"
 *                 uniqueBusinessId:
 *                   type: string
 *                   example: "VA8888"
 *       404:
 *         description: Client not found
 *       401:
 *         description: Unauthorized (invalid or missing token)
 */
router.get(
  "/findById/:businessId",
  protect,
  clientController.findClientByBusinessId
);

/**
 * @swagger
 * /clients/delete/{businessId}:
 *   delete:
 *     summary: Delete a client by business ID
 *     tags: [Clients]
 *     security:
 *       - BearerAuth: []  # Requires authentication
 *     parameters:
 *       - in: path
 *         name: businessId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique business ID of the client to delete
 *     responses:
 *       200:
 *         description: Client successfully deleted
 *       404:
 *         description: Client not found
 *       401:
 *         description: Unauthorized (invalid or missing token)
 */
router.delete(
  "/delete/:businessId",
  protect,
  checkRole(["superadmin", "admin", "manager"]),
  clientController.deleteClientByBusinessId
);

/**
 * @swagger
 * /clients/update/{businessId}:
 *   patch:
 *     summary: Update client by business ID
 *     tags: [Clients]
 *     security:
 *       - BearerAuth: []  # Requires authentication
 *     parameters:
 *       - in: path
 *         name: businessId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique business ID of the client to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Test test"
 *               company:
 *                 type: string
 *                 example: "Updated Test Company"
 *               address:
 *                 type: string
 *                 example: "123 Test Street"
 *               country:
 *                 type: string
 *                 example: "Test country"
 *               city:
 *                 type: string
 *                 example: "Test city"
 *               zipCode:
 *                 type: string
 *                 example: "10000"
 *               phoneNumber:
 *                 type: string
 *                 example: "47704494"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "testemail@gmail.com"
 *               uniqueBusinessId:
 *                 type: string
 *                 example: "8888"
 *     responses:
 *       200:
 *         description: Successfully updated client
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Invalid data
 *       404:
 *         description: Client not found
 *       401:
 *         description: Unauthorized (invalid or missing token)
 */
router.patch(
  "/update/:businessId",
  protect,
  checkRole(["superadmin", "admin", "manager"]),
  clientController.updateClient
);

module.exports = router;
