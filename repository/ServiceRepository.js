const Service = require("../models/Service");

class ServiceRepository {
  async findServiceByName(serviceName) {
    return await Service.findOne({ serviceName });
  }

  async createService(serviceData) {
    return await Service.create(serviceData);
  }

  async findAllServices() {
    return await Service.find({});
  }

  async findServiceById(serviceId) {
    return await Service.findById(serviceId);
  }

  async updateService(serviceId, serviceData) {
    return Service.updateOne(
      {
        _id: serviceId,
      },
      {
        $set: serviceData,
      },
      {
        new: true,
      }
    );
  }

  async saveService(service){
    return await service.save();
  }

  async deleteServiceById(serviceId) {
    return await Service.deleteOne({
      _id: serviceId,
    });
  }
}

module.exports = ServiceRepository;
