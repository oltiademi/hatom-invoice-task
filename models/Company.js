const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  companyAddress: {
    type: String,
  },
  vat: {
    type: Number,
    default: 0,
  },
});


const Company = mongoose.model("Company", companySchema);

module.exports = Company;