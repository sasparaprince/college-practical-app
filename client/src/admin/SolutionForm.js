import React, { useState } from 'react';

const SolutionForm = () => {
  const [practicalAim, setPracticalAim] = useState('');
  const [practicalCode, setPracticalCode] = useState('');
  const [explanation, setExplanation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform your form submission logic here
    // You can send this data to your server or handle it as needed

    console.log('Form submitted successfully');
    console.log('Practical Aim:', practicalAim);
    console.log('Practical Code:', practicalCode);
    console.log('Explanation:', explanation);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Add Solution</h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label htmlFor="practicalAim" className="block text-gray-700">Practical Aim:</label>
          <input
            type="text"
            id="practicalAim"
            value={practicalAim}
            onChange={(e) => setPracticalAim(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="practicalCode" className="block text-gray-700">Practical Code:</label>
          <textarea
            id="practicalCode"
            value={practicalCode}
            onChange={(e) => setPracticalCode(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            rows="4"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="explanation" className="block text-gray-700">Explanation:</label>
          <textarea
            id="explanation"
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            rows="4"
            required
          ></textarea>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Add Solution
          </button>
        </div>
      </form>
    </div>
  );
};

export default SolutionForm;
