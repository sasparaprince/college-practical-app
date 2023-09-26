import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';

const Solution = () => {

  const [solution, setSolution] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const { solutionId, practicalId } = useParams();


  useEffect(() => {
    // Fetch solution based on the provided solutionId and practicalId
    axios
      .get(`https://college-practical.vercel.app/api/solutions/${practicalId}/${solutionId}`)
      .then((response) => {
        setSolution(response.data);
      })
      .catch((error) => {
        console.error('Error fetching solution:', error);
        setSolution(null); // Set solution to null in case of an error.
      });
  }, [solutionId, practicalId]);

  const copyCodeToClipboard = () => {
    if (solution && solution.solutionCode) {
      // Create a temporary textarea element to copy the code to the clipboard
      const tempTextArea = document.createElement('textarea');
      tempTextArea.value = solution.solutionCode;
      document.body.appendChild(tempTextArea);
      tempTextArea.select();
      document.execCommand('copy');
      document.body.removeChild(tempTextArea);

      // Set the state to indicate that code is copied
      setIsCopied(true);

      // Reset the copied state after a brief period (e.g., 2 seconds)
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  };

  if (solution === null) {
    return <div>Loading...</div>;
  }

  if (!solution) {
    return <div>Solution not found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl text-white font-semibold mb-4">Practical Aim: {solution.practicalName}</h2>
      {/* Add a paragraph to display the practical aim */}
      <div className="bg-white p-4 rounded-lg shadow-md">
      <p className="text-lg font-medium mb-4">{solution.practicalName}</p>

        <div className="bg-gray-100 p-4 rounded-lg">
          <strong>C Code:</strong>
          <div className="relative">
            <button
              onClick={copyCodeToClipboard}
              className={`absolute top-2 right-2 bg-blue-500 text-white p-1 rounded cursor-pointer ${
                isCopied ? 'bg-green-500' : ''
              }`}
            >
              {isCopied ? 'Copied!' : 'Copy'}
            </button>
            <SyntaxHighlighter language="c" style={prism}>
              {solution.solutionCode}
            </SyntaxHighlighter>
          </div>
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
