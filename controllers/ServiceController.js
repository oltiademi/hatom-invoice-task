const AppError = require("../errorHandling/AppError");

class ServiceController {
  constructor(servicesService) {
    this.servicesService = servicesService;
  }

  createService = async (req, res, next) => {
    try {
      const service = await this.servicesService.createService(req.body);
      res.status(201).json({
        message: "success",
        service,
      });
    } catch (error) {
      next(new AppError(500, error));
    }
  };

  findAllServices = async (req, res, next) => {
    try {
      const services = await this.servicesService.findAllServices();
      res.status(200).json({
        message: "success",
        services,
      });
    } catch (error) {
      next(new AppError(500, error));
    }
  };

  findServiceById = async (req, res, next) => {
    try {
      const { serviceId } = req.params;
      const service = await this.servicesService.findServiceById(serviceId);
      res.status(200).json({
        message: "success",
        service,
      });
    } catch (error) {
      next(new AppError(500, error));
    }
  };

  updateService = async (req, res, next) => {
    try {
      const {serviceId} = req.params;
      const service = await this.servicesService.updateService(serviceId, req.body);
      res.status(200).json({
        message: "success",
        service,
      });
    } catch (error) {
      next(new AppError(500, error));
    }
  };
  deleteServiceById = async (req, res, next) => {
    try {
      const { serviceId } = req.params;
      await this.servicesService.deleteServiceById(serviceId);
      res.status(200).json({
        message: "Service deleted",
      });
    } catch (error) {
      next(new AppError(500, error));
    }
  };
}

module.exports = ServiceController;
