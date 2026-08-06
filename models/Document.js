const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  age: {
    type: Number
  },
  city: {
    type: String
  },
  insuranceType: {
    type: String
  },
  aadhaar: {
    type: String
  },
  pan: {
    type: String
  },
  photo: {
    type: String
  },
  addressProof: {
    type: String
  },
  status: {
    type: String,
    default: "Pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Document", documentSchema);
