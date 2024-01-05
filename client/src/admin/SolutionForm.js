import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const SolutionForm = () => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState('');
  const [practicals, setPracticals] = useState([]);
  const [selectedPracticalId, setSelectedPracticalId] = useState('');
  const [solutions, setSolutions] = useState([
    { solutionCode: '', codeOutput: '', explanation: '', imageURL: '' },
  ]);

  useEffect(() => {
    // Fetch subjects
    axios
      .get('https://college-practical.vercel.app/api/subjects')
      .then((response) => {
        setSubjects(response.data);
      })
      .catch((error) => {
        console.error('Error fetching subjects:', error);
      });
  }, []);

  useEffect(() => {
    // Fetch practicals based on the selected subject
    if (selectedSubjectId) {
      axios
        .get(`https://college-practical.vercel.app/api/practicals/${selectedSubjectId}`)
        .then((response) => {
          setPracticals(response.data.practicals);
        })
        .catch((error) => {
          console.error('Error fetching practicals:', error);
        });
    }
  }, [selectedSubjectId]);

  const addSolution = () => {
    setSolutions([...solutions, { solutionCode: '', codeOutput: '', explanation: '', imageURL: '' }]);
  };

  const handleSolutionChange = (index, field, value) => {
    const updatedSolutions = [...solutions];
    updatedSolutions[index][field] = value;
    setSolutions(updatedSolutions);
  };

  const handleImageUpload = async (index, file) => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await axios.post('https://your-image-upload-api-endpoint', formData);

      handleSolutionChange(index, 'imageURL', response.data.imageURL);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to create the practical with multiple solutions
      const response = await axios.post('https://college-practical.vercel.app/api/solutions', {
        practicalId: selectedPracticalId,
        solutions: solutions,
      });

      // Handle success...
      console.log('Solutions created:', response.data);
    } catch (error) {
      // Handle error...
      console.error('Error creating solutions:', error);
    }
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
              value={selectedPracticalId}
              onChange={(e) => setSelectedPracticalId(e.target.value)}
              className="w-full p-2 bg-gray-200 rounded"
            >
              <option value="">Select a Practical</option>
              {practicals.length > 0 ? (
                practicals.map((practical) => (
                  <option key={practical._id} value={practical._id}>
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
          <h2 className="text-2xl text-white font-semibold mb-2">Solutions</h2>
          {solutions.map((solution, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-xl text-white font-semibold mb-2">Solution {index + 1}</h3>
              <div className="mb-4">
                <label className="block text-white font-medium mb-2">Solution Code</label>
                <div
                  contentEditable="true"
                  onInput={(e) =>
                    handleSolutionChange(index, 'solutionCode', e.currentTarget.innerHTML)
                  }
                  className="w-full p-2 bg-gray-200 rounded"
                  dangerouslySetInnerHTML={{ __html: solution.solutionCode }}
                ></div>
              </div>
              <div className="mb-4">
                <label className="block text-white font-medium mb-2">Code Output</label>
                <div
                  contentEditable="true"
                  onInput={(e) =>
                    handleSolutionChange(index, 'codeOutput', e.currentTarget.innerHTML)
                  }
                  className="w-full p-2 bg-gray-200 rounded"
                  dangerouslySetInnerHTML={{ __html: solution.codeOutput }}
                ></div>
              </div>
              <div className="mb-4">
                <label className="block text-white font-medium mb-2">Explanation</label>
                <ReactQuill
                  className='bg-white'
                  value={solution.explanation}
                  onChange={(value) => handleSolutionChange(index, 'explanation', value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-white font-medium mb-2">Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(index, e.target.files[0])}
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addSolution}
            className="bg-blue-500 text-white font-medium py-2 px-4 rounded mb-4 hover:bg-blue-600"
          >
            Add Solution
          </button>
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
        >
          Submit Solutions
        </button>
      </form>
    </div>
  );
};

export default SolutionForm;
