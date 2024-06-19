require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const initializeServer = require("./initializer");
const userRoutes = require("./routes/userRoutes");
const organizationRoutes = require("./routes/organizationRoutes");
const textbookRoutes = require("./routes/textbooks");
const textbookRequestRoutes = require("./routes/textbookRequests");
const receivedTextbookRoutes = require("./routes/receivedTextbookRoutes");
const distributionRatioRoutes = require("./routes/distributionRatioRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");
const distributionScheduleRoutes = require("./routes/distributionScheduleRoutes");
const distributionReportRoutes = require("./routes/distributionReportRoutes");
const emailRoutes = require('./routes/emailRoutes'); // Add this line

const app = express();
const PORT = process.env.PORT || 5000;

// Enable all CORS requests
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    // Start initializing the server
    initializeServer()
      .then(() => {
        // Routes
        app.use("/api/users", userRoutes);
        app.use("/api/org", organizationRoutes);
        app.use("/api/textbooks", textbookRoutes);
        app.use("/api/textbookRequests", textbookRequestRoutes);
        app.use("/api/receivedTextbooks", receivedTextbookRoutes);
        app.use("/api/distributionRatios", distributionRatioRoutes);
        app.use("/api/invoices", invoiceRoutes);
        app.use("/api/distributionSchedules", distributionScheduleRoutes);
        app.use("/api/distributionReports", distributionReportRoutes);
        app.use("/api/emails", emailRoutes); // Add this line

        // Middleware for logging HTTP requests
        app.use(async (req, res, next) => {
          // Assuming Log model is defined
          const Log = mongoose.model("Log");
          const logEntry = new Log({
            level: "info",
            message: `${req.method} ${req.url}`,
            user: req.user ? req.user._id : null, // Assuming user information is stored in req.user
            ip: req.ip, // Requester's IP address
          });
          await logEntry.save();
          next();
        });

        // Start the server
        app.listen(PORT, () => {
          console.log(`Server running on port ${PORT}`);
        });
      })
      .catch((err) => {
        console.error("Error initializing server:", err);
        process.exit(1);
      });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
