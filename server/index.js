const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const subjectsRouter = require('./routes/subject'); // Import the subjects route

const app = express();


// Serve static files from the 'build' directory
app.use(express.static(path.join(__dirname, 'client', 'build')));

// Handle all other routes by serving the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});


// Middleware
app.use(bodyParser.json());

// Connect to MongoDB (replace 'your-database-name' with your actual database name)
mongoose.connect('mongodb://127.0.0.1:27017/college-practical', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.use('/api/subjects', subjectsRouter); // Use the subjects route for /api/subjects

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
