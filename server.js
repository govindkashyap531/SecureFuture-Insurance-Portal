const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config();

const app = express();


// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));


// Public Folder
app.use(express.static(path.join(__dirname, "public")));


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("✅ MongoDB Connected");
})
.catch((err) => {
    console.log("❌ MongoDB Error:", err.message);
});


// Routes
app.use("/auth", require("./routes/auth"));
app.use("/lead", require("./routes/lead"));
app.use("/policy", require("./routes/policy"));
app.use("/admin", require("./routes/admin"));
app.use("/adminAuth", require("./routes/adminAuth"));
app.use("/upload", require("./routes/upload"));

// Home Route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});


// Server Check
app.get("/health", (req, res) => {
    res.json({
        status: "Server Running",
        message: "SecureFuture Insurance Portal"
    });
});


// 404 Error
app.use((req, res) => {
    res.status(404).json({
        message: "Page Not Found"
    });
});


// Server Error
app.use((err, req, res, next) => {

    console.log("Server Error:", err.message);

    res.status(500).json({
        message: "Internal Server Error"
    });

});


// Start Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
