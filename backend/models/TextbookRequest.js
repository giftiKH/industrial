const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const textbookSchema = new Schema(
  {
    textbook: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Textbook",
      required: true,
    },
    quantity: { type: Number, required: true },
  },
  { _id: true } // Allow _id generation for each textbook
);

const textbookRequestSchema = new Schema({
  textbooks: [textbookSchema], // Use the textbook schema within the textbooks array
  evaluation: {
    status: {
      type: String,
      enum: ["accepted", "rejected", "not evaluated"],
      default: "not evaluated",
    },
    evaluatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    }, // Reference to User model
    comment: { type: String, default: null },
    evaluationDate: { type: Date, default: null },
  },
  requestDate: { type: Date, default: Date.now },
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  year: { type: Number, required: true },
  submission: { type: Boolean, default: false },
});

const TextbookRequest = mongoose.model(
  "TextbookRequest",
  textbookRequestSchema
);

module.exports = TextbookRequest;
