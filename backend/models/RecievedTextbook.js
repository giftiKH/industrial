const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const receivedTextbookSchema = new Schema({
  textbooks: [
    {
      textbook: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Textbook",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  publisher: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const ReceivedTextbook = mongoose.model(
  "ReceivedTextbook",
  receivedTextbookSchema 
);

module.exports = ReceivedTextbook;
