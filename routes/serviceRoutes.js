const express = require("express");
const router = express.Router();

const ServiceController = require("../controllers/ServiceController");
const ServiceRepository = require("../repository/ServiceRepository");
const ServicesService = require("../service/ServicesService");
const protect = require("../middleware/protect");
const checkRole = require("../middleware/checkRole");

const serviceRepository = new ServiceRepository();
const servicesService = new ServicesService(serviceRepository);
const serviceController = new ServiceController(servicesService);


/**
 * @swagger
 * tags:
 *   name: Services
 *   description: Services management routes, first you need to be authorized with a JWT token that you can get from the login request
 */

/**
 * @swagger
 * /services/create:
 *   post:
 *     summary: Create a new service
 *     tags: [Services]
 *     security:
 *       - BearerAuth: []  # Requires authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               serviceName:
 *                 type: string
 *                 example: "Service 2"
 *               servicePrice:
 *                 type: number
 *                 example: 500
 *     responses:
 *       201:
 *         description: Successfully created a new service
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 serviceId:
 *                   type: string
 *                   example: "61a7f7b5e6c09c001c5a5b14"
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized access
 *       403:
 *         description: Forbidden (insufficient role)
 */
router.post(
  "/create",
  protect,
  checkRole(["superadmin", "admin"]),
  serviceController.createService
);

/**
 * @swagger
 * /services/all:
 *   get:
 *     summary: Get all services
 *     tags: [Services]
 *     security:
 *       - BearerAuth: []  # Requires authentication
 *     responses:
 *       200:
 *         description: List of all services
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   serviceId:
 *                     type: string
 *                     example: "61a7f7b5e6c09c001c5a5b14"
 *                   serviceName:
 *                     type: string
 *                     example: "Service 2"
 *                   servicePrice:
 *                     type: number
 *                     example: 500
 *       401:
 *         description: Unauthorized access
 */
router.get("/all", protect, serviceController.findAllServices);

/**
 * @swagger
 * /services/findById/{serviceId}:
 *   get:
 *     summary: Get a service by its ID
 *     tags: [Services]
 *     security:
 *       - BearerAuth: []  # Requires authentication
 *     parameters:
 *       - name: serviceId
 *         in: path
 *         required: true
 *         description: ID of the service
 *         schema:
 *           type: string
 *           example: "61a7f7b5e6c09c001c5a5b14"
 *     responses:
 *       200:
 *         description: Successfully retrieved service
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 serviceId:
 *                   type: string
 *                   example: "61a7f7b5e6c09c001c5a5b14"
 *                 serviceName:
 *                   type: string
 *                   example: "Service 2"
 *                 servicePrice:
 *                   type: number
 *                   example: 500
 *       400:
 *         description: Invalid service ID
 *       401:
 *         description: Unauthorized access
 */
router.get("/findById/:serviceId", protect, serviceController.findServiceById);

/**
 * @swagger
 * /services/update/{serviceId}:
 *   patch:
 *     summary: Update an existing service by ID
 *     tags: [Services]
 *     security:
 *       - BearerAuth: []  # Requires authentication
 *     parameters:
 *       - name: serviceId
 *         in: path
 *         required: true
 *         description: ID of the service to be updated
 *         schema:
 *           type: string
 *           example: "61a7f7b5e6c09c001c5a5b14"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               serviceName:
 *                 type: string
 *                 example: "Updated Service"
 *               servicePrice:
 *                 type: number
 *                 example: 600
 *     responses:
 *       200:
 *         description: Successfully updated the service
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 updatedService:
 *                   type: object
 *                   properties:
 *                     serviceId:
 *                       type: string
 *                       example: "61a7f7b5e6c09c001c5a5b14"
 *                     serviceName:
 *                       type: string
 *                       example: "Updated Service"
 *                     servicePrice:
 *                       type: number
 *                       example: 600
 *       400:
 *         description: Invalid service ID or invalid input data
 *       401:
 *         description: Unauthorized access
 *       403:
 *         description: Forbidden (insufficient role)
 */
router.patch(
  "/update/:serviceId",
  protect,
  checkRole(["superadmin", "admin"]),
  serviceController.updateService
);

/**
 * @swagger
 * /services/delete/{serviceId}:
 *   delete:
 *     summary: Delete a service by ID
 *     tags: [Services]
 *     security:
 *       - BearerAuth: []  # Requires authentication
 *     parameters:
 *       - name: serviceId
 *         in: path
 *         required: true
 *         description: ID of the service to delete
 *         schema:
 *           type: string
 *           example: "61a7f7b5e6c09c001c5a5b14"
 *     responses:
 *       200:
 *         description: Successfully deleted the service
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Service deleted
 *       400:
 *         description: Invalid service ID
 *       401:
 *         description: Unauthorized access
 *       403:
 *         description: Forbidden (insufficient role)
 */
router.delete(
  "/delete/:serviceId",
  protect,
  serviceController.deleteServiceById
);

module.exports = router;
