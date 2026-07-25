const mongoose = require("mongoose");

const policySchema = new mongoose.Schema({
  userId: String,
  type: String,
  amount: Number,
  duration: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Policy", policySchema);
