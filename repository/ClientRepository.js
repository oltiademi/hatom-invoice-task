const Client = require("../models/Client");

class ClientRepository {
  async createClient(clientData) {
    return await Client.create(clientData);
  }

  async findClientByBusinessId(uniqueBusinessId) {
    return await Client.findOne({ uniqueBusinessId });
  }

  async findAllClients() {
    return await Client.find({});
  }

  async findClientByEmail(email) {
    return await Client.findOne({ email });
  }

  async updateClient(businessId, clientData) {
    return await Client.updateOne(
      {
        uniqueBusinessId: businessId,
      },
      { $set: clientData },
      { new: true }
    );
  }


  async saveClient(client) {
    return await client.save();
  }

  async deleteClientByBusinessId(businessId) {
    return await Client.deleteOne({ uniqueBusinessId: businessId });
  }
}

module.exports = ClientRepository;
