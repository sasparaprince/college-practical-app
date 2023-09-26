import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SolutionForm = () => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState('');
  const [practicals, setPracticals] = useState([]);
  const [selectedPracticalAim, setSelectedPracticalAim] = useState(''); // Use Practical Aim as Practical Name
  const [solutionCode, setSolutionCode] = useState('');
  const [codeOutput, setCodeOutput] = useState('');
  const [explanation, setExplanation] = useState('');

  // Fetch subjects
  useEffect(() => {
    axios.get('https://college-practical.vercel.app/api/subjects')
      .then((response) => {
        setSubjects(response.data);
      })
      .catch((error) => {
        console.error('Error fetching subjects:', error);
      });
  }, []);

  // Fetch practicals based on the selected subject
  useEffect(() => {
    if (selectedSubjectId) {
      axios.get(`http://localhost:3001/api/practicals/${selectedSubjectId}`)
        .then((response) => {
          setPracticals(response.data.practicals);
        })
        .catch((error) => {
          console.error('Error fetching practicals:', error);
        });
    }
  }, [selectedSubjectId]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Find the selected practical object by its aim
    const selectedPractical = practicals.find((practical) => practical.aim === selectedPracticalAim);

    // Make a POST request to create a solution
    axios.post('http://localhost:3001/api/solutions', {
      subjectId: selectedSubjectId,
      practicalId: selectedPractical._id, // Use Practical ID
      practicalName: selectedPracticalAim, // Use Practical Aim as Practical Name
      solutionCode,
      codeOutput,
      explanation,
    })
      .then((response) => {
        // Handle success (e.g., show a success message or redirect)
        console.log('Solution created:', response.data);
        // Optionally clear form fields or perform any other actions
      })
      .catch((error) => {
        console.error('Error creating solution:', error);
        // Handle error (e.g., display an error message)
      });
  };

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-2xl text-white font-semibold mb-4">Create a Solution</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-white font-medium mb-2">Select a Subject</label>
          <select
            value={selectedSubjectId}
            onChange={(e) => setSelectedSubjectId(e.target.value)}
            className="w-full p-2 bg-gray-200 rounded"
          >
            <option value="">Select a Subject</option>
            {subjects.map((subject) => (
              <option key={subject._id} value={subject._id}>
                {subject.subjectName}
              </option>
            ))}
          </select>
        </div>
        {selectedSubjectId && (
          <div className="mb-4">
            <label className="block text-white font-medium mb-2">Select a Practical</label>
            <select
              value={selectedPracticalAim}
              onChange={(e) => setSelectedPracticalAim(e.target.value)}
              className="w-full p-2 bg-gray-200 rounded"
            >
              <option value="">Select a Practical</option>
              {practicals.length > 0 ? (
                practicals.map((practical) => (
                  <option key={practical._id} value={practical.aim}>
                    {practical.aim}
                  </option>
                ))
              ) : (
                <option value="">No practicals available for the selected subject</option>
              )}
            </select>
          </div>
        )}
        <div className="mb-4">
          <label className="block text-white font-medium mb-2">Solution Code</label>
          <textarea
            value={solutionCode}
            onChange={(e) => setSolutionCode(e.target.value)}
            rows="6"
            className="w-full p-2 bg-gray-200 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white font-medium mb-2">Code Output</label>
          <textarea
            value={codeOutput}
            onChange={(e) => setCodeOutput(e.target.value)}
            rows="6"
            className="w-full p-2 bg-gray-200 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white font-medium mb-2">Explanation</label>
          <textarea
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
            rows="6"
            className="w-full p-2 bg-gray-200 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SolutionForm;
