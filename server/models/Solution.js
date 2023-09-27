const mongoose = require('mongoose');

const solutionSchema = new mongoose.Schema({
  practicalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Practical',
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
