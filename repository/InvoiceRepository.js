const Invoice = require("../models/Invoice");

class InvoiceRepository {
  async createInvoice(invoiceData) {
    return await Invoice.create(invoiceData);
  }

  async findAllInvoices() {
    return await Invoice.find({});
  }

  async findLastInvoice(year) {
    return await Invoice.findOne({
      invoiceNumber: new RegExp(`HA/${year}/`),
    }).sort({ invoiceNumber: -1 });
  }

  async updateInvoice(invoiceNumber, invoiceData) {
    return await Invoice.updateOne(
      {
        invoiceNumber,
      },
      { $set: invoiceData },
      { new: true }
    );
  }

  newInvoiceEntity(
    invoiceNumber,
    issueDate,
    dueDate,
    client,
    invoiceServices,
    vat,
    discount,
    totalInvoiceAmount
  ) {
    return new Invoice({
      invoiceNumber,
      issueDate,
      dueDate,
      client,
      invoiceServices,
      vat,
      discount,
      totalInvoiceAmount,
    });
  }
  async saveInvoice(invoice) {
    return await invoice.save();
  }

  async deleteInvoiceByNumber(number) {
    return await Invoice.deleteOne({ invoiceNumber: number });
  }
}

module.exports = InvoiceRepository;
