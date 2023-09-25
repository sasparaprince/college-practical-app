const express = require('express');
const router = express.Router();
const Subject = require('../models/Subject');
const Practical = require('../models/Practical');
const Solution = require('../models/Solution');

// Create a new subject
// Create a new subject
router.post('/subjects', async (req, res) => {
    try {
      const newSubject = new Subject({
        subjectName: req.body.subjectName,
        imageUrl: req.body.imageUrl,
        // Add other fields as needed
      });
  
      const savedSubject = await newSubject.save();
      res.status(201).json(savedSubject);
    } catch (err) {
      console.error('Error while saving subject:', err);
      res.status(400).json({ error: err.message });
    }
  });
  

// Create a new practical
// Create a new practical
router.post('/practicals', async (req, res) => {
    try {
      const newPractical = new Practical({
        aim: req.body.aim,
        subjectId: req.body.subjectId, // Include subjectId
      });
  
      const savedPractical = await newPractical.save();
      res.status(201).json(savedPractical);
    } catch (err) {
      console.error('Error while saving practical:', err);
      res.status(400).json({ error: err.message });
    }
  });
  

// Create a new solution
router.post('/solutions', async (req, res) => {
  try {
    const newSolution = new Solution(req.body);
    const savedSolution = await newSolution.save();
    res.status(201).json(savedSolution);
  } catch (err) {
    console.error('Error while saving solution:', err);
    res.status(400).json({ error: err.message });
  }
});

// Get a list of subjects
router.get('/subjects', async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.json(subjects);
  } catch (err) {
    console.error('Error fetching subjects:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/practicals', async (req, res) => {
    try {
      const practicals = await Practical.find();
      const subjectIds = practicals.map((practical) => practical.subjectId);
      const subjects = await Subject.find({ _id: { $in: subjectIds } });
  
      // Create a map of subject IDs to subject names for efficient lookup
      const subjectMap = {};
      subjects.forEach((subject) => {
        subjectMap[subject._id] = subject.subjectName;
      });
  
      // Add the subjectName property to each practical
      const practicalsWithSubjects = practicals.map((practical) => ({
        ...practical.toObject(),
        subjectName: subjectMap[practical.subjectId] || 'N/A',
      }));
  
      res.json(practicalsWithSubjects);
    } catch (err) {
      console.error('Error fetching practicals:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  router.get('/practicals/:subjectId', async (req, res) => {
    try {
      const subjectId = req.params.subjectId;
      const practicals = await Practical.find({ subjectId });
      const subject = await Subject.findById(subjectId);
  
      if (!subject) {
        return res.status(404).json({ error: 'Subject not found' });
      }
  
      res.json({ subject, practicals });
    } catch (err) {
      console.error('Error fetching practicals:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

  // Create a solution
router.post('/', async (req, res) => {
    try {
      const { subjectId, practicalId, solutionCode, codeOutput, explanation } = req.body;
      const solution = new Solution({
        subjectId,
        practicalId,
        solutionCode,
        codeOutput,
        explanation,
      });
      const savedSolution = await solution.save();
      res.status(201).json(savedSolution);
    } catch (error) {
      console.error('Error creating solution:', error);
      res.status(400).json({ error: error.message });
    }
  });
  




// Define a route to get a specific solution by Subject ID, Practical ID, and Solution ID
router.get('/solutions/:subjectId/:practicalId/:solutionId', async (req, res) => {
  try {
    const { subjectId, practicalId, solutionId } = req.params;

    // Find a single solution that matches the provided IDs
    const solution = await Solution.findOne({
      subjectId,
      practicalId,
      _id: solutionId,
    });

    if (!solution) {
      return res.status(404).json({ error: 'Solution not found' });
    }

    res.json(solution);
  } catch (error) {
    console.error('Error fetching solution:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});






  



module.exports = router;
