const InvoicePDFGenerator = require("../utils/PdfGenerator");

class PDFService {
  async generateInvoicePDF(invoice) {
    const pdfGenerator = new InvoicePDFGenerator(invoice);    
    const formattedPath = invoice.invoiceNumber && invoice.invoiceNumber.replace(/\//g, "-");
    const pdfPath = `./pdfFiles/${formattedPath}.pdf`;
    pdfGenerator.generateInvoicePDF(pdfPath);
    return pdfPath;
  }
}

module.exports = PDFService;
