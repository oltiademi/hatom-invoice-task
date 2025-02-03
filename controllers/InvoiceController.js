const AppError = require("../errorHandling/AppError");

class InvoiceController {
  constructor(service) {
    this.invoiceService = service;
  }

  createInvoice = async (req, res, next) => {
    try {
      const invoiceData = req.body;
      const invoice = await this.invoiceService.createInvoice(invoiceData);
      res.status(201).json({
        success: true,
        invoice,
      });
    } catch (error) {
      next(new AppError(500, error));
    }
  };

  findAllInvoices = async (req, res, next) => {
    try {
      const invoices = await this.invoiceService.findAllInvoices();
      res.status(200).json({
        success: true,
        invoices,
      });
    } catch (error) {
      next(new AppError(500, error));
    }
  };

  findInvoiceByNumber = async(req,res,next)=>{
    try {
      const { invoiceNumber } = req.query;
      const invoice = await this.invoiceService.findInvoiceByNumber(invoiceNumber);
      res.status(200).json({
        message: "success",
        invoice
      });
    } catch (error) {
      next(new AppError(500, error));
    }
  }

  updateInvoice = async(req, res, next)=>{
    try {
      const { invoiceNumber } = req.query;
      const invoiceData = req.body;
      const updatedInvoice = await this.invoiceService.updateInvoice(
        invoiceNumber,
        invoiceData
      );
      res.status(200).json({
        message: "success",
        updatedInvoice
      })
    } catch (error) {
      next(new AppError(500, error))
    }

  }

  deleteInvoiceByNumber = async (req, res, next) => {
    try {
      const { invoiceNumber } = req.query;
      await this.invoiceService.deleteInvoiceByNumber(invoiceNumber);
      res.status(200).json({
        message: "Invoice deleted",
      });
    } catch (error) {
      next(new AppError(500, error));
    }
  };
}

module.exports = InvoiceController;
