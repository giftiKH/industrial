const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const textbookRequestSchema = new Schema({
  textbooks: [
    new Schema(
      {
        textbook: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Textbook",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
      { _id: false }
    ), // Prevent _id generation for textbooks
  ],
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
});

const TextbookRequest = mongoose.model(
  "TextbookRequest",
  textbookRequestSchema
);

module.exports = TextbookRequest;
