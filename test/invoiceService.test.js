const InvoiceService = require("../service/InvoiceService");

describe("InvoiceService", () => {
  let invoiceService;
  let mockInvoiceRepository;
  let mockClientRepository;
  let mockServiceRepository;
  let mockPdfService;

  beforeEach(() => {
    mockClientRepository = {
      createClient: jest.fn(),
      findClientByBusinessId: jest.fn(),
    };

    mockServiceRepository = {
      findServiceByName: jest.fn(),
      createService: jest.fn(),
    };

    mockInvoiceRepository = {
      createInvoice: jest.fn(),
      findAllInvoices: jest.fn(),
      findInvoiceByNumber: jest.fn(),
      saveInvoice: jest.fn(),
      deleteInvoiceByNumber: jest.fn(),
      findLastInvoice: jest.fn(),
      newInvoiceEntity: jest.fn(),
    };

    mockPdfService = {
      generateInvoicePDF: jest.fn(),
    };

    invoiceService = new InvoiceService(
      mockInvoiceRepository,
      mockClientRepository,
      mockServiceRepository,
      mockPdfService
    );
  });

  test("createInvoice() should create an invoice", async () => {
    const invoiceData = {
      issueDate: "2025-01-31",
      dueDate: "2025-02-15",
      client: {
        name: "Test test",
        company: "Test",
        address: "Test Street",
        country: "Test country",
        city: "Test city",
        zipCode: "10000",
        phoneNumber: "456789",
        email: "test@gmail.com",
        uniqueBusinessId: "test",
      },
      services: [
        {
          serviceName: "Service 1",
          quantity: 3,
          servicePrice: 600,
        },
      ],
      vat: 20,
      discount: 10,
    };

    const mockInvoiceData = {
      invoiceNumber: "HA/2025/002",
      issueDate: "2025-01-31",
      dueDate: "2025-02-15",
      client: {
        name: "Test test",
        company: "Test",
        address: "Test Street",
        country: "Test country",
        city: "Test",
        zipCode: "10000",
        phoneNumber: "456789",
        email: "test@gmail.com",
        uniqueBusinessId: "test",
      },
      invoiceServices: [
        {
          quantity: 3,
          serviceGeneralId: "679fa1ebe0e2f3544ca86013",
          serviceName: "Service 1",
          servicePrice: 600,
          totalAmount: 1800,
        },
      ],
      vat: 20,
      discount: 10,
      totalInvoiceAmount: "2150.00",
    };
    const serviceData = {
      _id: "679fa1ebe0e2f3544ca86013",
      serviceGeneralId: "679fa1ebe0e2f3544ca86013",
      serviceName: "Service 1",
      quantity: 3,
      servicePrice: 600,
    };
    mockClientRepository.findClientByBusinessId.mockResolvedValue(
      mockInvoiceData.client
    );
    mockServiceRepository.findServiceByName.mockResolvedValueOnce([
      serviceData,
    ]);
    mockInvoiceRepository.findLastInvoice.mockResolvedValue({
      invoiceNumber: "HA/2025/001",
    });
    mockInvoiceRepository.newInvoiceEntity.mockResolvedValue(mockInvoiceData);
    mockPdfService.generateInvoicePDF.mockResolvedValue();
    mockInvoiceRepository.createInvoice.mockResolvedValue(mockInvoiceData);

    const result = await invoiceService.createInvoice(invoiceData);

    expect(mockClientRepository.findClientByBusinessId).toHaveBeenCalledWith(
      mockInvoiceData.client.uniqueBusinessId
    );
    expect(mockServiceRepository.findServiceByName).toHaveBeenCalledWith(
      "Service 1"
    );
    expect(mockInvoiceRepository.findLastInvoice).toHaveBeenCalledWith(2025);
    expect(mockInvoiceRepository.newInvoiceEntity).toHaveBeenCalledWith(
      mockInvoiceData.invoiceNumber,
      mockInvoiceData.issueDate,
      mockInvoiceData.dueDate,
      mockInvoiceData.client,
      mockInvoiceData.invoiceServices,
      mockInvoiceData.vat,
      mockInvoiceData.discount,
      mockInvoiceData.totalInvoiceAmount
    );
    expect(mockPdfService.generateInvoicePDF).toHaveBeenCalledWith(
      expect.any(Object)
    );

    expect(result).toEqual(mockInvoiceData);
  });

  test("findAllInvoices() should return all invoices", async () => {
    const invoiceData = {
      _id: "679fa9ced6640e56b4c06b12",
      invoiceNumber: "HA/2025/001",
      issueDate: "2025-01-31",
      dueDate: "2025-02-15",
      client: "679fa9ced6640e56b4c06b11",
      invoiceServices: [
        {
          _id: "679fa9ced6640e56b4c06b13",
          serviceGeneralId: "679fa1ebe0e2f3544ca86007",
          serviceName: "Service 1",
          quantity: 3,
          servicePrice: 600,
        },
        {
          _id: "679fa9ced6640e56b4c06b14",
          serviceGeneralId: "679fa1ebe0e2f3544ca86008",
          serviceName: "Service 2",
          quantity: 2,
          servicePrice: 700,
        },
      ],
      vat: 20,
      discount: 10,
      totalInvoiceAmount: 3830,
      createdAt: "2025-02-02",
      updatedAt: "2025-02-02",
      __v: 0,
    };

    mockInvoiceRepository.findAllInvoices.mockResolvedValue(invoiceData);
    const result = await invoiceService.findAllInvoices();
    expect(result).toEqual(invoiceData);
  });

  test("findInvoiceByNumber() should return an invoice based on its number", async () => {
    const invoiceNumber = "HA/2025/001";
    const invoiceData = {
      _id: "679fa9ced6640e56b4c06b12",
      invoiceNumber: "HA/2025/001",
      issueDate: "2025-01-31",
      dueDate: "2025-02-15",
      client: "679fa9ced6640e56b4c06b11",
      invoiceServices: [
        {
          _id: "679fa9ced6640e56b4c06b13",
          serviceGeneralId: "679fa1ebe0e2f3544ca86007",
          serviceName: "Service 1",
          quantity: 3,
          servicePrice: 600,
        },
        {
          _id: "679fa9ced6640e56b4c06b14",
          serviceGeneralId: "679fa1ebe0e2f3544ca86008",
          serviceName: "Service 2",
          quantity: 2,
          servicePrice: 700,
        },
      ],
      vat: 20,
      discount: 10,
      totalInvoiceAmount: 3830,
      createdAt: "2025-02-02",
      updatedAt: "2025-02-02",
      __v: 0,
    };

    mockInvoiceRepository.findInvoiceByNumber.mockResolvedValue(invoiceData);
    const result = await invoiceService.findInvoiceByNumber(invoiceNumber);
    expect(mockInvoiceRepository.findInvoiceByNumber).toHaveBeenCalledWith(
      invoiceNumber
    );
    expect(result).toEqual(invoiceData);
  });

  test("updateInvoice() should update an invoice", async () => {
    const invoiceNumber = "HA/2025/002";

    const updatedInvoice = {
      issueDate: "2025-02-01",
      dueDate: "2025-02-20",
    };

    const existingInvoiceData = {
      invoiceNumber: "HA/2025/001",
      issueDate: "2025-01-31",
      dueDate: "2025-02-15",
      client: {
        name: "Test test",
        company: "Test company",
        address: "Test Street",
        country: "Test country",
        city: "Test city",
        zipCode: "10000",
        phoneNumber: "5674494",
        email: "test@gmail.com",
        uniqueBusinessId: "test",
      },
      services: [
        {
          quantity: 3,
          serviceGeneralId: "679fa1ebe0e2f3544ca86013",
          serviceName: "Service 1",
          servicePrice: 600,
          totalAmount: 1800,
        },
      ],
      vat: 20,
      discount: 10,
      totalInvoiceAmount: "2150.00",
    };

    const updatedInvoiceData = {
      invoiceNumber: "HA/2025/001",
      issueDate: "2025-02-01",
      dueDate: "2025-02-20",
      client: {
        name: "Test test",
        company: "Test company",
        address: "Test Street",
        country: "Test country",
        city: "Test city",
        zipCode: "10000",
        phoneNumber: "5674494",
        email: "test@gmail.com",
        uniqueBusinessId: "test",
      },
      services: [
        {
          quantity: 3,
          serviceGeneralId: "679fa1ebe0e2f3544ca86013",
          serviceName: "Service 1",
          servicePrice: 600,
          totalAmount: 1800,
        },
      ],
      vat: 20,
      discount: 10,
      totalInvoiceAmount: "2150.00",
    };

    mockInvoiceRepository.findInvoiceByNumber.mockResolvedValue(
      existingInvoiceData
    );
    mockInvoiceRepository.saveInvoice.mockResolvedValue(updatedInvoiceData);
    mockPdfService.generateInvoicePDF.mockResolvedValue();

    const result = await invoiceService.updateInvoice(
      invoiceNumber,
      updatedInvoice
    );

    expect(mockInvoiceRepository.findInvoiceByNumber).toHaveBeenCalledWith(
      invoiceNumber
    );
    expect(mockInvoiceRepository.saveInvoice).toHaveBeenCalledWith(
      updatedInvoiceData
    );

    expect(result).toEqual(updatedInvoiceData);
  });

  test("deleteInvoiceByNumber() should delete invoice based on its number", async () => {
    const invoiceNumber = "HA/2025/001";
    mockInvoiceRepository.deleteInvoiceByNumber.mockResolvedValue(true);
    await invoiceService.deleteInvoiceByNumber(invoiceNumber);
    expect(mockInvoiceRepository.deleteInvoiceByNumber).toHaveBeenCalledWith(
      invoiceNumber
    );
  });
});
