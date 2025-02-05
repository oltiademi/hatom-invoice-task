const ClientService = require("../service/ClientService");

describe("ClientService", () => {
  let clientService;
  let mockRepository;

  beforeEach(() => {
    mockRepository = {
      createClient: jest.fn(),
      findAllClients: jest.fn(),
      findClientByBusinessId: jest.fn(),
      deleteClientByBusinessId: jest.fn(),
      saveClient: jest.fn(),
      updateClient: jest.fn(),
    };
    clientService = new ClientService(mockRepository)
    
  });

  test("createClient() should create a new client", async()=>{
    const clientData = {
      name: "Test test",
      company: "Test",
      address: "123 test street",
      country: "Test country",
      city: "Test city",
      zipCode: "10000",
      phoneNumber: "+484494",
      email: "test@gmail.com",
      uniqueBusinessId: "VA8888",
    };

    mockRepository.createClient.mockResolvedValue(clientData)
    const result = await clientService.createClient(clientData)

    expect(mockRepository.createClient).toHaveBeenCalledWith(clientData);
    expect(result).toEqual(clientData);
  })

  test("findAllClients() should return an array with all the clients", async()=>{
    const clients = [
      {
        name: "Test test",
        company: "Test",
        address: "123 test street",
        country: "Test country",
        city: "Test city",
        zipCode: "10000",
        phoneNumber: "+484494",
        email: "test@gmail.com",
        uniqueBusinessId: "VA8888",
      },
      {
        name: "Test test",
        company: "Test",
        address: "123 test street",
        country: "Test country",
        city: "Test city",
        zipCode: "10000",
        phoneNumber: "+484494",
        email: "test@gmail.com",
        uniqueBusinessId: "VA8888",
      },
    ];
    mockRepository.findAllClients.mockResolvedValue(clients);
    const result = await clientService.findAllClients();
    expect(result).toEqual(clients)
  })

  test("findClientByBusinessId() should return a client based on the id", async()=>{
    const businessId = "VA8888";
    const clientData = {
        name: "Test test",
        company: "Test Company",
        address: "123 Test street",
        country: "Test country",
        city: "Test city",
        zipCode: "10000",
        phoneNumber: "+38348804494",
        email: "japanifaceit@gmail.com",
        uniqueBusinessId: "OA8888",
      }
      mockRepository.findClientByBusinessId.mockResolvedValue(clientData)

      const result = await clientService.findClientByBusinessId(businessId)
      expect(mockRepository.findClientByBusinessId).toHaveBeenCalledWith(businessId)
      expect(result).toEqual(clientData);
  });

  test("deleteClientByBusinessId() should delete a client based on the id", async()=>{
    const businessId = "VA8888";
    mockRepository.deleteClientByBusinessId.mockResolvedValue(true);
    await clientService.deleteClientByBusinessId(businessId);
    expect(mockRepository.deleteClientByBusinessId).toHaveBeenCalledWith(businessId)
  });

  test("updateClient() should update a client", async()=>{
    const businessId = "VA8888";
    const updatedClient = {
        name: "Updated test",
        company: "Updated Test",
        address: "123 test street",
        country: "Test country",
        city: "Test city",
        zipCode: "10000",
        phoneNumber: "+484494",
        email: "test@gmail.com",
        uniqueBusinessId: "VA8888",
      }
    const existingClient ={
        name: "Test test",
        company: "Test",
        address: "123 test street",
        country: "Test country",
        city: "Test city",
        zipCode: "10000",
        phoneNumber: "+484494",
        email: "test@gmail.com",
        uniqueBusinessId: "VA8888",
      }

      mockRepository.findClientByBusinessId.mockResolvedValue(existingClient)
      mockRepository.saveClient.mockResolvedValue({...existingClient, ...updatedClient})

      const result = await clientService.updateClient(businessId, updatedClient);
      expect(mockRepository.findClientByBusinessId).toHaveBeenCalledWith(businessId);
      expect(mockRepository.saveClient).toHaveBeenCalledWith({...existingClient, ...updatedClient})

      expect(result).toEqual({...existingClient, ...updatedClient})
  });

});
