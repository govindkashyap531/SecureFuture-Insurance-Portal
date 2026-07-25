const express = require("express");
const router = express.Router();

const Lead = require("../models/Lead");

// Create Lead
router.post("/create", async (req, res) => {
  try {
    const lead = new Lead({
      name: req.body.name,
      mobile: req.body.mobile,
      email: req.body.email,
      city: req.body.city,
      insuranceType: req.body.insuranceType,
      investmentAmount: req.body.investmentAmount
    });

    await lead.save();

    res.status(201).json({
      success: true,
      message: "Lead Saved Successfully",
      lead
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// Get All Leads
router.get("/", async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: leads.length,
      leads
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});
// Get All Leads for Admin
router.get("/all", async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
