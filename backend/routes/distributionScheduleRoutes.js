const express = require("express");
const router = express.Router();
const distributionScheduleController = require("../controllers/distributionScheduleController");

// Routes for distribution schedules
router.get("/all", distributionScheduleController.getAllDistributionSchedules);
router.get("/:id", distributionScheduleController.getDistributionScheduleById);
router.put("/:id", distributionScheduleController.updateDistributionSchedule);
router.delete("/:id", distributionScheduleController.deleteDistributionSchedule);

module.exports = router;
