class ClientService{
    constructor(clientRepository){
        this.clientRepository = clientRepository
    }

    async createClient(clientData){
        return await this.clientRepository.createClient(clientData);
    }

    async findAllClients(){
        return await this.clientRepository.findAllClients();
    }

    async findClientByBusinessId(businessId){
        return await this.clientRepository.findClientByBusinessId(businessId);
    }

    async deleteClientByBusinessId(businessId){
        return await this.clientRepository.deleteClientByBusinessId(businessId);
    }

    async updateClient(businessId, clientData){
        const client = await this.clientRepository.findClientByBusinessId(businessId);
        
        if(!client) return null;

        Object.keys(clientData).forEach((key)=>{
            client[key] = clientData[key];
        })

        return await this.clientRepository.saveClient(client);
    }
}

module.exports = ClientService;