// models/Log.js

const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  level: String,
  message: String,
  timestamp: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to the user who triggered the log
  ip: String, // IP address of the requester
});

const Log = mongoose.model("Log", logSchema);

module.exports = Log;
