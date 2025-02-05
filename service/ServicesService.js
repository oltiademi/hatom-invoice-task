const AppError = require("../errorHandling/AppError");

class ServicesService {
  constructor(serviceRepository) {
    this.serviceRepository = serviceRepository;
  }

  async createService(serviceData) {
    if (!serviceData.serviceName)
      throw new AppError(400, "Service name can't be empty");

    if (!serviceData.servicePrice)
      throw new AppError(400, "Service price can't be empty");

    const existingService = await this.serviceRepository.findServiceByName(
      serviceData.serviceName
    );

    if (existingService)
      throw new AppError(500, "A service with this name already exists");

    return await this.serviceRepository.createService(serviceData);
  }

  async findAllServices() {
    return await this.serviceRepository.findAllServices();
  }

  async findServiceById(serviceId) {
    const service = this.serviceRepository.findServiceById(serviceId);
    if (!service) throw new AppError(404, "This service does not exist");
    return service;
  }

  async updateService(serviceId, serviceData) {
    const existingService = await this.serviceRepository.findServiceById(
      serviceId
    );
    if (!existingService || existingService.length === 0)
      throw new AppError(404, "This service does not exist");

    Object.keys(serviceData).forEach((key) => {
      existingService[key] = serviceData[key];
    });

    return await this.serviceRepository.saveService(existingService);
  }

  async deleteServiceById(serviceId) {
    const service = this.serviceRepository.findServiceById(serviceId);
    if (!service) throw new AppError(404, "This service does not exist");
    return await this.serviceRepository.deleteServiceById(serviceId);
  }
}

module.exports = ServicesService;
