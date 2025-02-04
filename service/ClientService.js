const AppError = require("../errorHandling/AppError");

class ClientService {
  constructor(clientRepository) {
    this.clientRepository = clientRepository;
  }

  async createClient(clientData) {
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
