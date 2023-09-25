import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Solution = () => {
  const { solutionId } = useParams();
  const [solution, setSolution] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the solution data based on the solutionId parameter
    axios.get(`http://localhost:3001/api/solutions/${solutionId}`)
      .then((response) => {
        setSolution(response.data);
        setLoading(false);
        setError(null);
      })
      .catch((error) => {
        console.error('Error fetching solution:', error);
        setLoading(false);
        setError('Error fetching solution. Please try again later.');
      });
  }, [solutionId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!solution) {
    return <div>Solution not found.</div>;
  }

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-2xl text-white font-semibold mb-4">Solution for {solution.aim}</h1>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-2">{solution.aim}</h3>
        <div className="bg-gray-100 p-4 rounded-lg">
          <strong>C Code:</strong>
          <pre>{solution.solutionCode}</pre>
        </div>
        <div className="mt-4">
          <strong>Output:</strong>
          <pre>{solution.codeOutput}</pre>
        </div>
        <div className="mt-4">
          <strong>Explanation:</strong>
          <p>{solution.explanation}</p>
        </div>
      </div>
    </div>
  );
};

export default Solution;
