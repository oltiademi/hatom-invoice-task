const express = require("express");

const router = express.Router();

const InvoiceService = require("../service/InvoiceService");
const InvoiceRepository = require("../repository/InvoiceRepository");
const ClientRepository = require("../repository/ClientRepository");
const ServiceRepository = require("../repository/ServiceRepository");
const InvoiceController = require("../controllers/InvoiceController");
const PDFService = require("../service/PdfService");
const EmailService = require("../service/EmailService")
const checkRole = require("../middleware/checkRole");
const protect = require("../middleware/protect");

const invoiceRepository = new InvoiceRepository();
const clientRepository = new ClientRepository();
const serviceRepository = new ServiceRepository();
const pdfService = new PDFService();
const emailService = new EmailService();
const invoiceService = new InvoiceService(
  invoiceRepository,
  clientRepository,
  serviceRepository,
  pdfService,
  emailService
);
const invoiceController = new InvoiceController(invoiceService);

/**
 * @swagger
 * tags:
 *   name: Invoices
 *   description: Invoice management routes, first you need to be authorized with a JWT token that you can get from the login request
 */

/**
 * @swagger
 * /invoices/create:
 *   post:
 *     summary: Create a new invoice
 *     tags: [Invoices]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               issueDate:
 *                 type: string
 *                 format: date
 *                 example: "2025-01-31"
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 example: "2025-02-15"
 *               client:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: "Test test"
 *                   company:
 *                     type: string
 *                     example: "Test"
 *                   address:
 *                     type: string
 *                     example: "123 Test Street"
 *                   country:
 *                     type: string
 *                     example: "Test"
 *                   city:
 *                     type: string
 *                     example: "Test"
 *                   zipCode:
 *                     type: string
 *                     example: "10000"
 *                   phoneNumber:
 *                     type: string
 *                     example: "2344494"
 *                   email:
 *                     type: string
 *                     format: email
 *                     example: "test@gmail.com"
 *                   uniqueBusinessId:
 *                     type: string
 *                     example: "8888"
 *               services:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     serviceName:
 *                       type: string
 *                       example: "Service 1"
 *                     quantity:
 *                       type: integer
 *                       example: 3
 *                     servicePrice:
 *                       type: number
 *                       format: float
 *                       example: 600
 *               vat:
 *                 type: number
 *                 example: 20
 *               discount:
 *                 type: number
 *                 example: 10
 *     responses:
 *       201:
 *         description: Invoice created successfully
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: Unauthorized - Bearer token missing or invalid
 *       403:
 *         description: Unauthorized
 */

router.post(
  "/create",
  protect,
  checkRole(["superadmin", "admin"]),
  invoiceController.createInvoice
);


/**
 * @swagger
 * /invoices/all:
 *   get:
 *     summary: Get all invoices
 *     tags: [Invoices]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of invoices
 */
router.get("/all", protect, invoiceController.findAllInvoices);

/**
 * @swagger
 * /invoices/findByNumber:
 *   get:
 *     summary: Find an invoice by its number
 *     tags: [Invoices]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: invoiceNumber
 *         schema:
 *           type: string
 *         required: true
 *         description: The invoice number
 *     responses:
 *       200:
 *         description: Invoice found
 *       404:
 *         description: Invoice not found
 */
router.get("/findByNumber", protect, invoiceController.findInvoiceByNumber);

/**
 * @swagger
 * /invoices/delete/:
 *   delete:
 *     summary: Delete an invoice by its number
 *     tags: [Invoices]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: invoiceNumber
 *         schema:
 *           type: string
 *         required: true
 *         description: The invoice number
 *     responses:
 *       200:
 *         description: Invoice deleted
 *       403:
 *         description: Unauthorized
 */
router.delete(
  "/delete/",
  protect,
  checkRole(["superadmin"]),
  invoiceController.deleteInvoiceByNumber
);

/**
 * @swagger
 * /invoices/update/:
 *   patch:
 *     summary: Update an invoice
 *     tags: [Invoices]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               issueDate:
 *                 type: string
 *                 example: 24-03-2025
 *     responses:
 *       200:
 *         description: Invoice updated successfully
 *       403:
 *         description: Unauthorized
 */
router.patch(
  "/update",
  protect,
  checkRole(["superadmin", "admin"]),
  invoiceController.updateInvoice
);

module.exports = router;
