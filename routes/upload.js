const express = require("express");
const multer = require("multer");
const Document = require("../models/Document");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

router.post(
  "/",
  upload.fields([
    { name: "aadhaar", maxCount: 1 },
    { name: "pan", maxCount: 1 },
    { name: "photo", maxCount: 1 },
    { name: "addressProof", maxCount: 1 }
  ]),
  async (req, res) => {
    try {

      const doc = new Document({
        name: req.body.name,
        mobile: req.body.mobile,
        email: req.body.email,
        age: req.body.age,
        city: req.body.city,
        insuranceType: req.body.insuranceType,

        aadhaar: req.files.aadhaar?.[0]?.filename || "",
        pan: req.files.pan?.[0]?.filename || "",
        photo: req.files.photo?.[0]?.filename || "",
        addressProof: req.files.addressProof?.[0]?.filename || "",

        status: "Pending"
      });

      await doc.save();

      res.json({
        success: true,
        message: "Documents uploaded successfully",
        data: doc
      });

    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message
      });
    }
  }
);
// Get all uploaded applications
router.get("/all", async (req, res) => {
  try {
    const documents = await Document.find().sort({ createdAt: -1 });
    res.json(documents);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Update application status
router.put("/status/:id", async (req, res) => {
  try {
    await Document.findByIdAndUpdate(req.params.id, {
      status: req.body.status
    });

    res.json({
      success: true,
      message: "Status updated successfully"
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Delete application
router.delete("/:id", async (req, res) => {
  try {
    await Document.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Application deleted successfully"
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});
module.exports = router;
