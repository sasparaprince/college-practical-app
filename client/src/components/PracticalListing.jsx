import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const SubjectPracticals = () => {
  const { subjectId } = useParams();
  const [subject, setSubject] = useState(null);
  const [practicals, setPracticals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigation function

  useEffect(() => {
    // Fetch subject practicals based on subjectId
    axios
      .get(`http://localhost:3001/api/practicals/${subjectId}`)
      .then((response) => {
        const { subject, practicals } = response.data;
        setSubject(subject);
        setPracticals(practicals || []);
        setLoading(false);
        setError(null);
      })
      .catch((error) => {
        console.error('Error fetching subject practicals:', error);
        setLoading(false);
        setError('Error fetching subject practicals. Please try again later.');
      });
  }, [subjectId]);

  // Function to handle the "Solution" button click
  const handleSolutionClick = (practicalId, solutionId) => {
    // Use the navigate function to go to the solution page
    navigate(`/solution/${practicalId}/${solutionId}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-2xl text-white font-semibold mb-4">
        Practicals for {subject.subjectName}
      </h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-[#E3FDFD] bg-opacity-90 border-2 border-sky-500">
          <tr>
            <th className="w-10 px-6 py-3 text-left text-xs font-medium border uppercase tracking-wider">
              SR No
            </th>
            <th className="w-70 px-6 py-3 text-left text-xs font-medium border uppercase tracking-wider">
              Aim
            </th>
            <th className="w-20 px-6 py-3 text-left text-xs font-medium border uppercase tracking-wider">
              Solution
            </th>
          </tr>
        </thead>
        <tbody className="bg-white bg-opacity-90 divide-y divide-gray-200">
          {Array.isArray(practicals) &&
            practicals.map((practical) => (
              <tr key={practical._id}>
                <td className="w-10 px-6 border py-4 whitespace-nowrap">
                  {practical.srNo}
                </td>
                <td className="w-70 px-6 border py-4 whitespace-nowrap">
                  {practical.aim}
                </td>
                <td className="w-20 px-6 border py-4 whitespace-nowrap">
                  {/* Use a button to trigger the solution link */}
                  <button
                    onClick={() =>
                      handleSolutionClick(practical._id, practical.solutionId)
                    }
                    className="text-blue-500 hover:underline"
                  >
                    Solution
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubjectPracticals;
