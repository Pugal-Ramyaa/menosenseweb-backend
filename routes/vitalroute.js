const express = require('express');
const router = express.Router();
const Vital = require('../models/Vitalmodel');

router.get('/vitals/:email', async (req, res) => {
    try {
      const email = req.params.email;
      const latestVital = await Vital.findOne({ email: email }).sort({ Date: -1 }).limit(1);
      console.log(latestVital);
      res.status(200).json(latestVital);
    } catch (error) {
      console.error("Error fetching latest vital by email:", error);
      res.status(500).json({ message: error.message });
    }
  });

  module.exports = router;