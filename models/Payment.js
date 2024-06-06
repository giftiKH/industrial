// models/Payment.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
  invoice: { type: Schema.Types.ObjectId, ref: "Invoice", required: true },
  tx_ref: { type: String, required: true, unique: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "success", "failed"],
    default: "pending",
  },
  chapa_response: { type: Object },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Payment", PaymentSchema);
