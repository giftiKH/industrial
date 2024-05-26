require("dotenv").config();

// Make sure you have the environment variable JWT_SECRET set in your .env file
const jwtSecret = process.env.JWT_SECRET;

const express = require("express");
const app = express();
const cors = require("cors");

// Enable all CORS requests
app.use(cors());
const db = require("./config/db");
const jwt = require("jsonwebtoken");
const initializeServer = require("./initializer");
const userRoutes = require("./routes/userRoutes");
const organizationRoutes = require("./routes/organizationRoutes");
const textbookRoutes = require('./routes/textbooks');
const textbookRequestRoutes = require('./routes/textbookRequests');
const receivedTextbookRoutes = require('./routes/receivedTextbookRoutes')
const distributionRatioRoutes = require("./routes/distributionRatioRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");
const distributionScheduleRoutes = require("./routes/distributionScheduleRoutes");
const distributionReportRoutes = require("./routes/distributionReportRoutes");

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/org", organizationRoutes); 
app.use('/api/textbooks', textbookRoutes);
app.use('/api/textbookRequests', textbookRequestRoutes);
app.use('/api/receivedTextbooks', receivedTextbookRoutes)
app.use("/api/distributionRatios", distributionRatioRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/distributionSchedules", distributionScheduleRoutes);
app.use("/api/distributionReports", distributionReportRoutes);

// Middleware for logging HTTP requests
app.use(async (req, res, next) => {
  const logEntry = new Log({
    level: 'info',
    message: `${req.method} ${req.url}`,
    user: req.user ? req.user._id : null, // Assuming user information is stored in req.user
    ip: req.ip, // Requester's IP address
  });
  await logEntry.save();
  next();
});


// Call initialization function when the server starts
initializeServer()
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("Error initializing server:", err));
