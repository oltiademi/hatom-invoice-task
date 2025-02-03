const PDFKit = require("pdfkit");
const fs = require("fs");

class InvoicePDFGenerator {
  constructor(invoiceData) {
    this.invoiceData = invoiceData;
  }

  generateInvoicePDF(outputPath) {
    const document = new PDFKit();

    document.pipe(fs.createWriteStream(outputPath));

    document.fontSize(18).text("Invoice", { align: "center" }).moveDown();

    document
      .fontSize(12)
      .text(`Invoice Number: ${this.invoiceData.invoiceNumber}`)
      .text(`Issue Date: ${this.invoiceData.issueDate.toLocaleString("sq-AL")}`)
      .text(`Due Date: ${this.invoiceData.dueDate.toLocaleString("sq-AL")}`)
      .moveDown();

    document.text(`Client Name: ${this.invoiceData.client.name}`);
    document.text(`Company: ${this.invoiceData.client.company || "N/A"}`);
    document.text(`Address: ${this.invoiceData.client.address}`);
    document.text(`Country: ${this.invoiceData.client.country}`);
    document.text(`City: ${this.invoiceData.client.city}`);
    document.text(`Zip Code: ${this.invoiceData.client.zipCode}`);
    document.text(`Phone: ${this.invoiceData.client.phoneNumber}`);
    document.text(`Email: ${this.invoiceData.client.email}`);
    document
      .text(`Business ID: ${this.invoiceData.client.uniqueBusinessId}`)
      .moveDown();

    document.text("Services:", { underline: true }).moveDown();
    document.text("--------------------------------------------");
    this.invoiceData.invoiceServices.forEach((service) => {
      document.text(`Service Name: ${service.serviceName}`);
      document.text(`Quantity: ${service.quantity}`);
      document.text(`Price per unit: ${service.servicePrice}`);
      document.text("--------------------------------------------");
    });
    document.text(`VAT: ${this.invoiceData.vat}%`);
    document.text(`Discount: ${this.invoiceData.discount}`);
    document.text("--------------------------------------------");

    document
      .text(`Total Amount: ${this.invoiceData.totalInvoiceAmount}`)
      .moveDown();

    document.end();
  }
}

module.exports = InvoicePDFGenerator;
