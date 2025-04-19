const SalesOptimization = require("../models/salesOptimization.model");

// Create a new sales optimization entry
exports.createEntry = async (req, res) => {
  try {
    const data = req.body;
    const entry = new SalesOptimization(data);
    await entry.save();
    res.status(201).json({ message: "Entry created successfully", data: entry });
  } catch (err) {
    res.status(500).json({ message: "Error creating entry", error: err.message });
  }
};

// Get all entries
exports.getAllEntries = async (req, res) => {
  try {
    const entries = await SalesOptimization.find().sort({ createdAt: -1 });
    res.status(200).json(entries);
  } catch (err) {
    res.status(500).json({ message: "Error fetching entries", error: err.message });
  }
};

// Get single entry by ID
exports.getEntryById = async (req, res) => {
  try {
    const entry = await SalesOptimization.findById(req.params.id);
    if (!entry) return res.status(404).json({ message: "Entry not found" });
    res.status(200).json(entry);
  } catch (err) {
    res.status(500).json({ message: "Error fetching entry", error: err.message });
  }
};
