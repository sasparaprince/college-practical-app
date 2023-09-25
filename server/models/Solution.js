// models/Solution.js

const mongoose = require('mongoose');

const solutionSchema = new mongoose.Schema({
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject', // Reference to the Subject model
    required: true,
  },
  practicalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Practical', // Reference to the Practical model
    required: true,
  },
  solutionCode: {
    type: String,
    required: true,
  },
  codeOutput: {
    type: String,
    required: true,
  },
  explanation: {
    type: String,
    required: true,
  },
});

const Solution = mongoose.model('Solution', solutionSchema);

module.exports = Solution;
