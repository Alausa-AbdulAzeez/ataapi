const express = require("express");
const {
  createToleranceData,
  getAllTolerance,
  importCsvData,
} = require("../controllers/dataController");
const router = express.Router();

// CREATE A NEW TOLERANCE
router.post("/createTolerance", createToleranceData);

// CREATE A NEW TOLERANCE
router.post("/import-csv", importCsvData);

// GET ALL TOLERANCES
router.get("/", getAllTolerance);

module.exports = router;
