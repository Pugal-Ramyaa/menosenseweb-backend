const Dr = require('../models/Drmodel');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/add_dr', async (req, res) => {
    try {
      const { name, email, password,id,
        speciality,
        hospital,
        hospitaladdress,
        contact,
         } = req.body;
      const existingDr = await Dr.findOne({ id });
      if (existingDr) {
        return res.status(400).json({ message: 'Dr already exists' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newDr = new Dr({
        name,
        email,
        password: hashedPassword, 
        id,
        speciality,
        hospital,
        hospitaladdress,
        contact,
        email
      });
      await newDr.save();
      res.status(200).json({ id: newDr.id });
    } catch (error) {
      console.error("Error adding dr:", error);
      res.status(500).json({ message: error.message });
    }
  });
  
  router.get('/email_present', async (req, res) => {
    const { email } = req.query;
    try {
      const dr = await Dr.findOne({ email });
      if (dr) {
        res.status(200).json({ message: 'Email found in database' });
      } else {
        res.status(404).json({ message: 'Email not found in database' });
      }
    } catch (error) {
      console.error('Error fetching user information:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  router.get('/dr_info', async (req, res) => {
    const { id } = req.query;
    try {
      const dr = await Dr.findOne({ id });
      if (!dr) {
        return res.status(404).json({ message: 'Dr not found' });
      }
    
      res.status(200).json(dr);
    } catch (error) {
      console.error('Error fetching user information:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  router.post('/login', async (req, res) => {
    try {
      const { id, password } = req.body;
      const dr = await Dr.findOne({ id });
      if (!dr) {
        return res.status(400).json({ message: 'Invalid credentials-email' });
      }
      else{
        console.log("first");
        console.log(dr.password);
        const isPasswordValid = await bcrypt.compare(password, dr.password);
        if (!isPasswordValid) {
          return res.status(400).json({ message: 'Invalid credentials-password' });
        }
        else{
          console.log("200");
          res.status(200).json({ id: dr.id });
        }
      }
      
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  module.exports = router;