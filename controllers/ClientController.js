const AppError = require("../errorHandling/AppError");

class ClientController {
  constructor(clientService) {
    this.clientService = clientService;
  }

  createClient = async (req, res, next) => {
    try {
      const client = await this.clientService.createClient(req.body);
      res.status(201).json({
        success: true,
        client,
      });
    } catch (error) {
      next(new AppError(500, error));
    }
  };

  findAllClients = async (req, res, next) => {
    try {
      const clients = await this.clientService.findAllClients();
      res.status(200).json({
        success: true,
        clients,
      });
    } catch (error) {
      next(new AppError(500, error));
    }
  };

  findClientByBusinessId = async(req, res, next)=>{
    try {
      const { businessId } = req.params
      const client = await this.clientService.findClientByBusinessId(businessId)
      res.status(200).json({
        message: "success",
        client
      })
    } catch (error) {
      next(new AppError(500, error))
    }
  }

  updateClient = async(req, res, next)=>{
    try {
      const { businessId } = req.params;
      const updatedClient = await this.clientService.updateClient(businessId, req.body);
      res.status(200).json({
        message: "client updated",
        updatedClient
      })
    } catch (error) {
      next(new AppError(500, error))
    }
  }

  deleteClientByBusinessId = async(req, res, next)=>{
    try {
      const { businessId} = req.params
      await this.clientService.deleteClientByBusinessId(businessId);
      res.status(200).json({
        message: "Client deleted"
      })
    } catch (error) {
      next(new AppError(500, error))
    }
  }
}

module.exports = ClientController;
