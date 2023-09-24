import React, { useState } from 'react';

const PracticalForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [solutionLink, setSolutionLink] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform your form submission logic here
    // You can send this data to your server or handle it as needed

    console.log('Form submitted successfully');
    console.log('Title:', title);
    console.log('Description:', description);
    console.log('Solution Link:', solutionLink);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Add Practical</h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700">Practical Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            rows="4"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="solutionLink" className="block text-gray-700">Solution Link:</label>
          <input
            type="text"
            id="solutionLink"
            value={solutionLink}
            onChange={(e) => setSolutionLink(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Add Practical
          </button>
        </div>
      </form>
    </div>
  );
};

export default PracticalForm;
