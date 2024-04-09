const express = require('express');
const router = express.Router();
const Pred = require('../models/predmodel');

router.get('/getpred/:email', async (req, res) => {
    try {
      const email = req.params.email;
      const latestPred = await Pred.findOne({ email: email }).sort({ Date: -1 }).limit(1);
      console.log(latestPred);
      res.status(200).json(latestPred);
    } catch (error) {
      console.error("Error fetching latest vital by email:", error);
      res.status(500).json({ message: error.message });
    }
  });

  module.exports = router;