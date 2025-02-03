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

router.post(
  "/create",
  protect,
  checkRole(["superadmin", "admin"]),
  invoiceController.createInvoice
);
router.get("/all", protect, invoiceController.findAllInvoices);
router.get("/findByNumber", protect, invoiceController.findInvoiceByNumber);
router.delete(
  "/delete/",
  protect,
  checkRole(["superadmin"]),
  invoiceController.deleteInvoiceByNumber
);
router.patch(
  "/update",
  protect,
  checkRole(["superadmin", "admin"]),
  invoiceController.updateInvoice
);

module.exports = router;
