const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Policy = require("../models/Policy");
const Lead = require("../models/Lead");

const auth = require("../middleware/auth");


// Dashboard Stats
router.get("/stats",async (req, res) => {

    try {

        const users = await User.countDocuments();
        const policies = await Policy.countDocuments();
        const leads = await Lead.countDocuments();

        res.json({
            success: true,
            users,
            policies,
            leads
        }); 

    } catch (err) {

        res.status(500).json({
            success:false,
            message:err.message
        });

    }

});



// Get All Users
router.get("/stats", async (req, res) => {
    try {

        const users = await User.find().sort({
            _id:-1
        });

        res.json(users);

    } catch(err){

        res.status(500).json({
            message:err.message
        });

    }

});



// Get All Policies
router.get("/policies", async (req, res) => {
    try {

        const policies = await Policy.find().sort({
            _id:-1
        });

        res.json(policies);

    } catch(err){

        res.status(500).json({
            message:err.message
        });

    }

});



// Get All Leads
router.get("/leads", async (req, res) => {
    try {

        const leads = await Lead.find().sort({
            createdAt:-1
        });

        res.json(leads);

    } catch(err){

        res.status(500).json({
            message:err.message
        });

    }

});


module.exports = router;
