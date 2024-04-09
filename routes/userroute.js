const User = require('../models/Usermodel');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get('/user_info', async (req, res) => {
    const { DoctorId } = req.query;
    try {
      const user = await User.find({ DoctorId });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching user information:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  router.get('/user_info_mail', async (req, res) => {
    const { email } = req.query;
    try {
      const user = await User.find({ email });
      console.log(user);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching user information:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  
  module.exports = router;