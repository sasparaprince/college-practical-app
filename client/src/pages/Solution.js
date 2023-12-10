import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Loader from '../components/Spinner';
import NotFound from '../components/NotFound';
import { Helmet } from 'react-helmet';
import { faMoon, faSun, faCopy, faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import html2canvas from 'html2canvas'; // Import html2canvas
import '../App.css';

const Solution = () => {
  const { practicalId } = useParams();
  const [practical, setPractical] = useState(null);
  const [solutions, setSolutions] = useState([]);
  const [outputBackgroundBlack, setOutputBackgroundBlack] = useState(false);
  const outputRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://college-practical.vercel.app/api/practicals/${practicalId}/solutions`);
        setPractical(response.data);
        setSolutions(response.data.solutions);
      } catch (error) {
        console.error('Error fetching solutions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [practicalId]);

  const copyCodeToClipboard = (code) => {
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = code;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextArea);

    toast.success('Code copied to clipboard!', {
      position: 'top-center',
      autoClose: 2000,
    });
  };

  const toggleOutputBackgroundColor = () => {
    setOutputBackgroundBlack(!outputBackgroundBlack);
  };

  const downloadImage = () => {
    const outputElement = outputRef.current;

    html2canvas(outputElement).then((canvas) => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'output_image.png';
      link.click();
    });

    toast.success('Image downloaded!', {
      position: 'top-center',
      autoClose: 2000,
    });
  };
  if (loading) {
    return <Loader />;
  }
  if (!practical || solutions.length === 0) {
    return <NotFound />;
  }

  

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{practical?.aim} college practical hub</title>
        <meta name="description" content={practical?.aim} />
      </Helmet>
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="bg-white p-4 rounded-lg shadow-md mb-4 Aim-hover">
          <h3 className="text-lg font-medium mb-4">Topic: {practical.aim}</h3>
        </div>
        {solutions.map((solution) => (
          <div key={solution._id} className="bg-white p-4 rounded-lg shadow-md mb-4">
            {solution.solutionCode && solution.solutionCode.length > 0 && (
              <div className="bg-gray-100 p-4 rounded-lg">
                <strong>Code:</strong>
                <div className="relative">
                  <button
                    onClick={() => copyCodeToClipboard(solution.solutionCode)}
                    className="absolute top-2 right-2 p-1 rounded cursor-pointer icon fa-xl "
                  >
                    <FontAwesomeIcon icon={faCopy} />
                  </button>
                  <SyntaxHighlighter language="c" style={prism}>
                    {solution.solutionCode}
                  </SyntaxHighlighter>
                </div>
              </div>
            )}

            {solution.codeOutput && solution.codeOutput.length > 0 && (
              <div>
                <div className="relative">
                  <strong>Output:</strong>
                  <button
                    onClick={toggleOutputBackgroundColor}
                    className="absolute top-2 right-2 p-1 rounded cursor-pointer icon fa-xl"
                  >
                    {outputBackgroundBlack ? <FontAwesomeIcon icon={faMoon} /> : <FontAwesomeIcon icon={faSun} />}
                  </button>
                </div>
                <div
                  ref={outputRef}
                  className={`mt-4 ${outputBackgroundBlack ? 'bg-black border-black text-white' : 'bg-white'}`}
                >
                  {solution.codeOutput && solution.codeOutput.length > 0 && (
                    <pre className="p-4 border rounded-lg whitespace-pre-wrap">{solution.codeOutput}</pre>
                  )}
                </div>
                <button
                  onClick={downloadImage}
                  className="mt-2 bg-stone-900 hover:bg-stone-300 transition-transform transform text-white hover:text-stone-900 scale-95 hover:scale-100 font-bold py-2 px-4 rounded-xl"
                >
                  <FontAwesomeIcon icon={faDownload} className="mr-2" />
                  Download Image
                </button>
              </div>
            )}

            {solution.explanation && solution.explanation.length > 0 && (
              <div className="mt-4">
                <strong>Explanation:</strong>
                <pre
                  className="bg-gray-300 p-4 rounded-lg whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: solution.explanation }}
                ></pre>
              </div>
            )}
          </div>
        ))}
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default Solution;
