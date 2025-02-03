const ServicesService = require("../service/ServicesService");

describe("ServicesService", () => {
  let servicesService;
  let mockRepository;

  beforeEach(() => {
    mockRepository = {
      findServiceByName: jest.fn(),
      createService: jest.fn(),
      findAllServices: jest.fn(),
      findServiceById: jest.fn(),
      updateService: jest.fn(),
      saveService: jest.fn(),
      deleteServiceById: jest.fn(),
    };
    servicesService = new ServicesService(mockRepository);
  });
  test("createService() should create a new service", async () => {
    const serviceData = { serviceName: "Test Service", servicePrice: 500 };
    mockRepository.findServiceByName.mockResolvedValue([]);
    mockRepository.createService.mockResolvedValue(serviceData);

    const result = await servicesService.createService(serviceData);
    expect(mockRepository.findServiceByName).toHaveBeenCalledWith(
      serviceData.serviceName
    );

    expect(mockRepository.createService).toHaveBeenCalledWith(serviceData);
    expect(result).toEqual(serviceData);
  });

  test("findAllServices() should return array of services", async () => {
    const services = [
      { serviceName: "Test service 1", servicePrice: 700 },
      { serviceName: "Test service 2", servicePrice: 600 },
    ];
    mockRepository.findAllServices.mockResolvedValue(services);
    const result = await servicesService.findAllServices();
    expect(result).toEqual(services);
  });

  test("findServiceById() should return a service based on the given id", async () => {
    const serviceData = {
      _id: "679fa1ebe0e2f3544ca86008",
      serviceName: "Test service",
      servicePrice: 200,
    };

    mockRepository.findServiceById.mockResolvedValue(serviceData);
    const result = await servicesService.findServiceById(serviceData._id);
    expect(mockRepository.findServiceById).toHaveBeenCalledWith(serviceData._id);
    expect(result).toEqual(serviceData);
  });

  test("updateService() should update an existing service", async () => {
    const serviceId = "679fa1ebe0e2f3544ca86007";
    const updatedServiceData = {
      serviceName: "Updated Service",
      servicePrice: 750,
    };

    const existingService = {
      _id: serviceId,
      serviceName: "Old Service",
      servicePrice: 500,
    };

    mockRepository.findServiceById.mockResolvedValue(existingService);
    mockRepository.saveService.mockResolvedValue({
      ...existingService,
      ...updatedServiceData,
    });

    const result = await servicesService.updateService(
      serviceId,
      updatedServiceData
    );

    expect(mockRepository.findServiceById).toHaveBeenCalledWith(serviceId);

    expect(mockRepository.saveService).toHaveBeenCalledWith({
      ...existingService,
      ...updatedServiceData,
    });

    expect(result).toEqual({ ...existingService, ...updatedServiceData });
  });

  test("deleteServiceById() should delete a service by ID", async () => {
    const serviceId = "679fa1ebe0e2f3544ca86007";

    mockRepository.deleteServiceById.mockResolvedValue(true);
    await servicesService.deleteServiceById(serviceId);

    expect(mockRepository.deleteServiceById).toHaveBeenCalledWith(serviceId);
  });

});
