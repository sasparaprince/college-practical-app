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

  // Add state variables for search
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPracticals, setFilteredPracticals] = useState([]);

  // Function to handle search input change
  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter practicals based on the search query
    const filtered = practicals.filter((practical) =>
      practical.aim.toLowerCase().includes(query)
    );
    setFilteredPracticals(filtered);
  };

  useEffect(() => {
    axios
      .get(`https://college-practical.vercel.app/api/practicals/${subjectId}`)
      .then((response) => {
        const { subject, practicals } = response.data;
        setSubject(subject);
        setPracticals(practicals || []);
        setLoading(false);
        setError(null);

        // Update filteredPracticals when practicals change
        setFilteredPracticals(practicals || []);
      })
      .catch((error) => {
        console.error('Error fetching subject practicals:', error);
        setLoading(false);
        setError('Error fetching subject practicals. Please try again later.');
      });
  }, [subjectId]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Modify the heading based on the presence of "theory" in the subject name
  const modifiedHeading = subject.subjectName.includes('theory')
    ? `Subject: ${subject.subjectName}`
    : `Practicals for ${subject.subjectName}`;

  return (
    <div className="container mx-auto my-8">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{subject.subjectName} - {modifiedHeading} Practical</title>
        <meta
          name="description"
          content={`Explore ${subject.subjectName} practical solutions for ${subject.subjectName} at College Practical Hub. Find a list of practicals, code.`}
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
          className="px-4 py-2 border rounded-md w-full"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full mx-auto divide-y divide-gray-200">
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
            {Array.isArray(filteredPracticals) &&
              filteredPracticals.map((practical, index) => (
                <tr key={practical._id} className="group hover:bg-gray-100">
                  <td className="w-1/6 px-2 py-3 sm:w-1/6 md:w-1/6 lg:w-1/6 xl:w-1/6 border text-center">
                    {index + 1}
                  </td>
                  <td className="w-5/6 px-4 py-3 sm:w-5/6 md:w-5/6 lg:w-5/6 xl:w-5/6">
                    <div className="whitespace-pre-wrap">{practical.aim}</div>
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
    </div>
  );
};

export default SubjectPracticals;
