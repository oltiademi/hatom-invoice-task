const AppError = require("../errorHandling/AppError");

class ServicesService {
  constructor(serviceRepository) {
    this.serviceRepository = serviceRepository;
  }

  async createService(serviceData) {
    const existingService = await this.serviceRepository.findServiceByName(
      serviceData.serviceName
    );
    
    if (existingService.length > 0)
      throw new AppError(500, "A service with this name already exists");
    return await this.serviceRepository.createService(serviceData);
  }

  async findAllServices() {
    return await this.serviceRepository.findAllServices();
  }

  async findServiceById(serviceId) {
    return await this.serviceRepository.findServiceById(serviceId);
  }

  async updateService(serviceId, serviceData){
    const existingService = await this.serviceRepository.findServiceById(serviceId);
    if(!existingService || existingService.length ===0) throw new AppError(404, "This service does not exist")
    
    Object.keys(serviceData).forEach((key)=>{
        existingService[key] = serviceData[key]
    })

    return await this.serviceRepository.saveService(existingService);
  }

  async deleteServiceById(serviceId) {
    return await this.serviceRepository.deleteServiceById(serviceId);
  }
}

module.exports = ServicesService;
