const AppError = require("../errorHandling/AppError");

class ClientService {
  constructor(clientRepository) {
    this.clientRepository = clientRepository;
  }

  async createClient(clientData) {
    const client = await this.clientRepository.findClientByBusinessId(
      clientData.businessId
    );

    if (client)
      throw new AppError(400, "A user with this business ID already exists");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValidFormat = emailRegex.test(clientData.email);
    if (!isEmailValidFormat)
      throw new AppError(400, "Email is not a valid format");

    if (clientData.name.length < 4)
      throw new AppError(400, "Name is too short");
    return await this.clientRepository.createClient(clientData);
  }

  async findAllClients() {
    return await this.clientRepository.findAllClients();
  }

  async findClientByBusinessId(businessId) {
    const client = await this.clientRepository.findClientByBusinessId(
      businessId
    );
    if (!client) throw new AppError(404, "This client does not exist");
    return client;
  }

  async deleteClientByBusinessId(businessId) {
    const client = await this.clientRepository.findClientByBusinessId(
      businessId
    );
    if (!client) throw new AppError(404, "This client does not exist");
    return await this.clientRepository.deleteClientByBusinessId(businessId);
  }

  async updateClient(businessId, clientData) {
    const client = await this.clientRepository.findClientByBusinessId(
      businessId
    );

    if (!client) throw new AppError(404, "This client does not exist");

    Object.keys(clientData).forEach((key) => {
      client[key] = clientData[key];
    });

    return await this.clientRepository.saveClient(client);
  }
}

module.exports = ClientService;
