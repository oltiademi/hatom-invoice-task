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

router.post('/create', protect, checkRole(['superadmin', 'admin']), serviceController.createService);
router.get('/all', protect, serviceController.findAllServices);
router.get('/findById/:serviceId', protect, serviceController.findServiceById)
router.patch('/update/:serviceId', protect, checkRole(['superadmin', 'admin']), serviceController.updateService)
router.delete(
  "/delete/:serviceId",
  protect,
  serviceController.deleteServiceById
);

module.exports = router;
