const Invoice = require("../models/Invoice");

class InvoiceService {
  constructor(
    invoiceRepository,
    clientRepository,
    serviceRepository,
    pdfService
  ) {
    this.invoiceRepository = invoiceRepository;
    this.clientRepository = clientRepository;
    this.serviceRepository = serviceRepository;
    this.pdfService = pdfService;
  }
  async createInvoice(invoiceData) {
    let client = await this.clientRepository.findClientByBusinessId(
      invoiceData.client.uniqueBusinessId
    );

    if (!client) {
      client = await this.clientRepository.createClient(invoiceData.client);
    }
    const services = [];
    let totalServiceAmount = 0;
    for (const service of invoiceData.services) {
      let existingService = await this.serviceRepository.findServiceByName(
        service.serviceName
      ); //returns array with one element

      existingService = existingService[0];
      if (!existingService || existingService.length === 0) {
        existingService = await this.serviceRepository.createService({
          serviceName: service.serviceName,
          servicePrice: service.servicePrice,
        });
      }
      const serviceTotal = existingService.servicePrice * service.quantity;

      services.push({
        serviceGeneralId: existingService._id,
        serviceName: existingService.serviceName,
        quantity: service.quantity,
        servicePrice: service.servicePrice,
        totalAmount: serviceTotal,
      });
      totalServiceAmount += serviceTotal;
    }
    const totalVat = totalServiceAmount * (invoiceData.vat / 100);
    const totalInvoiceAmount =
      totalServiceAmount + totalVat - invoiceData.discount;

    const invoiceNumber = await this.getInvoiceNumber();

    const invoice = this.invoiceRepository.newInvoiceEntity(
      invoiceNumber,
      invoiceData.issueDate,
      invoiceData.dueDate,
      client,
      services,
      invoiceData.vat,
      invoiceData.discount,
      totalInvoiceAmount.toFixed(2)
    );

    await this.pdfService.generateInvoicePDF(invoice);

    return await this.invoiceRepository.createInvoice(invoice);
  }

  async findAllInvoices() {
    return await this.invoiceRepository.findAllInvoices();
  }

  async getInvoiceNumber() {
    const year = new Date().getFullYear();
    const lastInvoice = await this.invoiceRepository.findLastInvoice(year);
    let nextNumber = 1;
    if (lastInvoice) {
      const lastNumber = parseInt(lastInvoice.invoiceNumber.split("/")[2], 10);
      nextNumber = lastNumber + 1;
    }

    return `HA/${year}/${String(nextNumber).padStart(3, "0")}`;
  }

  async findInvoiceByNumber(invoiceNumber) {
    return this.invoiceRepository.findInvoiceByNumber(invoiceNumber);
  }
  async updateInvoice(invoiceNumber, invoiceData) {
    const existingInvoice = await this.invoiceRepository.findInvoiceByNumber(
      invoiceNumber
    );
    if (!existingInvoice || existingInvoice.length === 0) return null;

    Object.keys(invoiceData).forEach((key) => {
      existingInvoice[key] = invoiceData[key];
    });

    return await this.invoiceRepository.saveInvoice(existingInvoice);
  }

  async deleteInvoiceByNumber(number) {
    return await this.invoiceRepository.deleteInvoiceByNumber(number);
  }
}

module.exports = InvoiceService;
