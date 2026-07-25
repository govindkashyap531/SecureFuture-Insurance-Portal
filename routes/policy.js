const express = require("express");
const router = express.Router();
const Policy = require("../models/Policy");

// CREATE POLICY
router.post("/create", async (req, res) => {
  try {
    const { userId, type, amount, duration } = req.body;

    const policy = new Policy({
      userId,
      type,
      amount,
      duration
    });

    await policy.save();

    res.json({ message: "Policy created", policy });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALL POLICIES
router.get("/", async (req, res) => {
  const policies = await Policy.find();
  res.json(policies);
});

module.exports = router;
