import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Loader from './Spinner';
import { Helmet } from 'react-helmet';

const SubjectPracticals = () => {
  const { subjectId } = useParams();
  const [subject, setSubject] = useState(null);
  const [practicals, setPracticals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10); // Number of practicals per page

  // Add state variables for search
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPracticals, setFilteredPracticals] = useState([]);
  const [searching, setSearching] = useState(false); // State for indicating search in progress
  const [searchTimer, setSearchTimer] = useState(null); // Timer for search delay

  // Function to fetch practicals based on parameters
  const fetchPracticals = (subjectId, page, perPage, searchQuery) => {
    axios
      .get(`https://college-practical.vercel.app/api/practicals/${subjectId}?page=${page}&limit=${perPage}&search=${searchQuery}`)
      .then((response) => {
        console.log('Response data:', response.data); // Check the structure of the response data
        const { subject, practicals } = response.data;
        setSubject(subject);
        setPracticals(practicals || []);
        setLoading(false);
        setError(null);

        // Update filteredPracticals only when searching
        if (searching) {
          setFilteredPracticals(practicals || []);
        }
      })
      .catch((error) => {
        console.error('Error fetching subject practicals:', error);
        setLoading(false);
        setError('Error fetching subject practicals. Please try again later.');
      });
  };

  // Function to handle search input change
  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
    clearTimeout(searchTimer);
    setSearchTimer(setTimeout(() => {
      setSearching(true); // Indicate that search is in progress
      setPage(1); // Reset page number when searching
      fetchPracticals(subjectId, 1, perPage, searchQuery);
    }, 2000)); // Trigger search after 500 milliseconds
  };


  // Function to clear search timer
  const clearSearchTimer = () => {
    clearTimeout(searchTimer);
  };

  useEffect(() => {
    // Fetch practicals
    fetchPracticals(subjectId, page, perPage, searchQuery);

    // Update filteredPracticals only when searching
    if (searching) {
      setFilteredPracticals(practicals || []);
    } else {
      setFilteredPracticals([]);
    }
  }, [subjectId, page, perPage, searchQuery, searching]);

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Modify the heading based on the presence of "theory" in the subject name
  const modifiedHeading = subject && subject.subjectName && subject.subjectName.includes('theory')
    ? `Subject: ${subject.subjectName}`
    : `Practicals for ${subject && subject.subjectName}`;

  // Calculate SR No
  const calculateSRNo = (index) => ((page - 1) * perPage) + index + 1;

  // Function to highlight matched text
  const highlightText = (text, query) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <span key={index} style={{ backgroundColor: 'yellow', color: 'black' }}>
              {part}
            </span>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <div className="container mx-auto my-8">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`${subject && subject.subjectName} - ${modifiedHeading} Practical`}</title>
        <meta
          name="description"
          content={`Explore ${subject && subject.subjectName} practical solutions for ${subject && subject.subjectName} at College Practical Hub. Find a list of practicals, code.`}
        />
      </Helmet>

      <h1 className="text-2xl text-white font-semibold mb-4">
        {modifiedHeading}
      </h1>

      {/* Search input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search Practical Aims..."
          value={searchQuery}
          onChange={handleSearchChange}
          onBlur={clearSearchTimer}
          className="px-4 py-2 border rounded-md w-full"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full mx-auto divide-y divide-gray-200">
          {/* Table headers */}
          <thead className="bg-[#E3FDFD] bg-opacity-90 border-2 border-sky-500">
            <tr>
              <th className="w-1/24 px-2 py-3 sm:w-1/6 md:w-1/6 lg:w-1/6 xl:w-1/6 text-xs font-medium border text-center uppercase tracking-wider">
                SR No
              </th>
              <th className="w-5/6 px-4 py-3 sm:w-5/6 md:w-5/6 lg:w-5/6 xl:w-5/6 text-center text-xs font-medium border uppercase tracking-wider">
                Aim
              </th>
              <th className="w-1/12 px-4 py-3 sm:w-1/6 md:w-1/6 lg:w-1/6 xl:w-1/6 text-center text-xs font-medium border uppercase tracking-wider">
                Solution
              </th>
            </tr>
          </thead>
          <tbody className="bg-white bg-opacity-90 divide-y divide-gray-200">
            {/* Practical rows */}
            {(searching ? filteredPracticals : practicals).map((practical, index) => (
              <tr key={practical._id} className="group hover:bg-gray-100">
                <td className="w-1/6 px-2 py-3 sm:w-1/6 md:w-1/6 lg:w-1/6 xl:w-1/6 border text-center">
                  {calculateSRNo(index)}
                </td>
                <td className="w-5/6 px-4 py-3 sm:w-5/6 md:w-5/6 lg:w-5/6 xl:w-5/6">
                  <div className="whitespace-pre-wrap">
                    {highlightText(practical.aim, searchQuery)}
                  </div>
                </td>
                <td className="w-1/12 px-4 py-3 sm:w-1/6 md:w-1/6 lg:w-1/6 xl:w-1/6 text-center">
                  {practical._id ? (
                    <Link to={`/solutions/${practical._id}`}>Solution</Link>
                  ) : (
                    <span className="text-gray-400">No Solution</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div className="mt-4 flex justify-center">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className=""
        >
          <a href="#_" class="relative inline-block text-lg group">
            <span class="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
              <span class="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
              <span class="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
              <span class="relative">Prev</span>
            </span>
            <span class="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
          </a>
        </button>
        <button
          onClick={handleNextPage}
          className=""
        >
          <a href="#_" class="relative inline-block text-lg group">
            <span class="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
              <span class="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
              <span class="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-500 group-hover:-rotate-180 ease"></span>
              <span class="relative">Next</span>
            </span>
            <span class="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
          </a>
        </button>

      </div>
    </div>
  );
};

export default SubjectPracticals;
