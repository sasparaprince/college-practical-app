import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useParams } from 'react-router-dom';

const Solution = () => {
  const { subjectId, practicalId, solutionId } = useParams();
  const [solution, setSolution] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/solutions/${subjectId}/${practicalId}/${solutionId}`)
      .then((response) => {
        setSolution(response.data);
      })
      .catch((error) => {
        console.error('Error fetching solution:', error);
      });
  }, [subjectId, practicalId, solutionId]);

  if (!solution) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">{solution.practicalName}</h2>
      {/* Add a paragraph to display the practical aim */}
      <p className="text-lg font-medium mb-4">Practical Aim: {solution.practicalAim}</p>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="bg-gray-100 p-4 rounded-lg">
          <strong>C Code:</strong>
          <SyntaxHighlighter language="c" style={prism}>
            {solution.solutionCode}
          </SyntaxHighlighter>
        </div>
        <div className="mt-4">
          <strong>Output:</strong>
          <pre className="bg-gray-300 p-4 rounded-lg whitespace-pre-wrap">{solution.codeOutput}</pre>
        </div>
        <div className="mt-4">
          <strong>Explanation:</strong>
          <pre className="bg-gray-100 p-4 rounded-lg whitespace-pre-wrap">{solution.explanation}</pre>
        </div>
      </div>
    </div>
  );
};

export default Solution;
