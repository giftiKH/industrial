const express = require("express");
const router = express.Router();
const distributionReportController = require("../controllers/distributionReportController");

router.post("/add", distributionReportController.createDistributionReport);
router.get("/all", distributionReportController.getAllDistributionReports);
router.get("/:id", distributionReportController.getDistributionReportById);
router.put("/:id", distributionReportController.updateDistributionReport);
router.delete("/:id", distributionReportController.deleteDistributionReport);

module.exports = router;
