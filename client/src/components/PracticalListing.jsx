import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Loader from './Spinner';
import { Helmet } from "react-helmet";

const SubjectPracticals = () => {
  const { subjectId } = useParams();
  const [subject, setSubject] = useState(null);
  const [practicals, setPracticals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`https://college-practical.vercel.app/api/practicals/${subjectId}`)
      .then((response) => {
        const { subject, practicals } = response.data; // Ensure subject is part of the response
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

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto my-8">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{subject.subjectName}</title>
        <meta name='description' content='subject all the practical AIM:'/>
      </Helmet>
      <h1 className="text-2xl text-white font-semibold mb-4">
        Practicals for {subject.subjectName}
      </h1>
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
            {Array.isArray(practicals) &&
              practicals.map((practical, index) => (
                <tr key={practical._id}>
                  <td className="w-1/6 px-2 py-3 sm:w-1/6 md:w-1/6 lg:w-1/6 xl:w-1/6 border text-center">
                    {index + 1}
                  </td>
                  <td className="w-5/6 px-4 py-3 sm:w-5/6 md:w-5/6 lg:w-5/6 xl:w-5/6">
                    <div className="whitespace-pre-wrap">{practical.aim}</div>
                  </td>
                  <td className="w-1/12 px-4 py-3 sm:w-1/6 md:w-1/6 lg:w-1/6 xl:w-1/6 border text-center">
                    {(practical._id) ? (
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
