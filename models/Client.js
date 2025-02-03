const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Name is too short"],
    },
    company: {
      type: String,
      trim: true,
      default: null,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    zipCode: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: (v) => {
          return /^(10\d{3})$/.test(v);
        },
        message: (props) => `${props.value} is not valid!`,
      },
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: function (email) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Simple email regex
        },
        message: "Invalid email format.",
      },
    },
    uniqueBusinessId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Client = mongoose.model("Client", ClientSchema);

module.exports = Client;
