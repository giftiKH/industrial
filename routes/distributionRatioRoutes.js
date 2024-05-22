const express = require("express");
const router = express.Router();
const distributionRatioController = require("../controllers/distributionRatioController");

router.post("/add", distributionRatioController.createDistributionRatio);
router.get("/all", distributionRatioController.getAllDistributionRatios);
router.get("/:id", distributionRatioController.getDistributionRatioById);
router.put("/:id", distributionRatioController.updateDistributionRatio);
router.delete("/:id", distributionRatioController.deleteDistributionRatio);

module.exports = router;
