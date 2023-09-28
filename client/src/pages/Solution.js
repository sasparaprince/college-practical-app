import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams} from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Loader from '../components/Spinner';
import NotFound from '../components/NotFound';
import { Helmet } from "react-helmet";



const Solution = () => {
  const { practicalId } = useParams();
  const [practical, setPractical] = useState(null); // Add state for practical
  const [solutions, setSolutions] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`https://college-practical.vercel.app/api/practicals/${practicalId}/solutions`)
      .then((response) => {
        setPractical(response.data); // Set the practical data
        setSolutions(response.data.solutions); // Set the solutions data
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching solutions:', error);
        setLoading(false);
        setError('Error fetching solutions. Please try again later.');
      });
  }, [practicalId]);

  const copyCodeToClipboard = (code) => {
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = code;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextArea);

    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (solutions.length === 0) {
    return <NotFound />
  }

  return (
    <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{practical.aim}</title>
                <meta name='description' content={practical.aim}/>

            </Helmet>
    <Navbar />
    <div className="container mx-auto p-4">
      <h2 className="text-2xl text-white font-semibold mb-4">
        Solutions for Practical {}
      </h2>
      <div className='bg-white p-4 rounded-lg shadow-md mb-4'>
      <h3 className="text-lg font-medium mb-4">Practical Aim: {practical.aim}</h3>

      </div>
      {solutions.map((solution) => (
        <div key={solution._id} className="bg-white p-4 rounded-lg shadow-md mb-4">
          <div className="bg-gray-100 p-4 rounded-lg">
            <strong>Code:</strong>
            <div className="relative">
              <button
                onClick={() => copyCodeToClipboard(solution.solutionCode)}
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
      ))}
    </div>
    <Footer />
    </>
  );
};

export default Solution;
