const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
  {
    invoiceNumber: {
      type: String,
      required: true,
      unique: true,
      match: /^HA\/\d{4}\/\d{3}$/,
    },
    issueDate: { type: Date, required: true },
    dueDate: { type: Date, required: true },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    invoiceServices: [
      {
        serviceGeneralId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Service",
          required: true,
        },
        serviceName: {
          type: String,
          required: true,
        },
        quantity: { type: Number, required: true },
        servicePrice: { type: Number, required: true },
      },
    ],
    vat: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
    },
    totalInvoiceAmount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Invoice = mongoose.model("Invoice", invoiceSchema);

module.exports = Invoice;
