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

router.post(
  "/create",
  protect,
  checkRole(["superadmin", "admin", "manager"]),
  clientController.createClient
);
router.get("/all", protect, clientController.findAllClients);
router.get(
  "/findById/:businessId",
  protect,
  clientController.findClientByBusinessId
);
router.delete(
  "/delete/:businessId",
  protect,
  checkRole(["superadmin", "admin", "manager"]),
  clientController.deleteClientByBusinessId
);
router.patch(
  "/update/:businessId",
  protect,
  checkRole(["superadmin", "admin", "manager"]),
  clientController.updateClient
);

module.exports = router;
