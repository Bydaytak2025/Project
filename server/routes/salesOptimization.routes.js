const express = require("express");
const router = express.Router();
const controller = require("../controllers/salesOptimization.controller");

// POST /api/sales - Create new entry
router.post("/", controller.createEntry);

// GET /api/sales - Get all entries
router.get("/", controller.getAllEntries);

// GET /api/sales/:id - Get single entry
router.get("/:id", controller.getEntryById);

module.exports = router;
