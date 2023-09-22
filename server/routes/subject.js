const express = require('express');
const router = express.Router();
const Subject = require('../models/Subject');

// Create a new subject
router.post('/', async (req, res) => {
  try {
    const { name, description } = req.body;
    const newSubject = new Subject({ name, description });
    const savedSubject = await newSubject.save();
    res.status(201).json(savedSubject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while adding subject' });
  }
});

module.exports = router;
