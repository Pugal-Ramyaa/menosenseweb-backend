const express = require('express');
const router = express.Router();
const Logs = require('../models/logmodel');

router.get('/average', async (req, res) => {
  const { email, year } = req.query;

  try {
    const parsedYear = parseInt(year);
    const averageSymptoms = [];
    for (let month = 0; month < 12; month++) {
      const startDate = new Date(parsedYear, month, 1);
      const endDate = new Date(parsedYear, month + 1, 0);
      const logs = await Logs.find({ email, Date: { $gte: startDate, $lte: endDate } });
      console.log(logs);
      const sumSymptoms = {
        sleepingProblems: 0.0,
        hotFlashes: 0.0,
        nightSweats: 0.0,
        chills: 0.0,
        fatigue: 0.0,
        headAche: 0.0,
        vaginalDryness: 0.0,
        moodSwings: 0.0,
        weight:0.0,
        heartRate:0.0,
      };
      logs.forEach(log => {
        for (const symptom in sumSymptoms) {
          // Check if the symptom value is null, if so, treat it as 0
          sumSymptoms[symptom] += log[symptom] || 0;
        }
      });
      const numLogs = logs.length;
      const averageSymptomsOfMonth = {};
      for (const symptom in sumSymptoms) {
        averageSymptomsOfMonth[symptom] = numLogs > 0.0 ? Math.round(sumSymptoms[symptom] / numLogs) : 0.0;
      }
      averageSymptoms.push({
        month: month + 1, // Month index starts from 0, so add 1 to get the actual month number
        year: parsedYear,
        symptoms: averageSymptomsOfMonth
      });
    }
    res.json({ averageSymptoms });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
router.get('/heart_weight', async (req, res) => {
    const { email, year } = req.query;
    try {
      const parsedYear = parseInt(year);
      const averageValues = [];
      for (let month = 0; month < 12; month++) {
        const startDate = new Date(parsedYear, month, 1);
        const endDate = new Date(parsedYear, month + 1, 0);
        const logs = await Logs.find({ email, Date: { $gte: startDate, $lte: endDate } });
        console.log(logs);
        const sumValue = {
          heartRate:0.0,
          weight:0.0
        };
        logs.forEach(log => {
          for (const value in sumValue) {
            // Check if the symptom value is null, if so, treat it as 0
            sumValue[value] += log[value] || 0;
          }
        });
        const numLogs = logs.length;
        const averageValuesOfMonth = {};
        for (const value in sumValue) {
          averageValuesOfMonth[value] = numLogs > 0.0 ? Math.round(sumValue[value] / numLogs) : 0.0;
        }
        averageValues.push({
          month: month + 1, // Month index starts from 0, so add 1 to get the actual month number
          year: parsedYear,
          values: averageValuesOfMonth
        });
      }
      res.json({ averageValues });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
module.exports = router;
