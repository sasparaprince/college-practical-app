import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SubjectListing = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/api/subjects')
    .then((response) => {
      console.log('API Response:', response.data);
      setSubjects(response.data);
      setLoading(false);
      setError(null);
    })
    .catch((error) => {
      console.error('Error fetching subjects:', error);
      setLoading(false);
      setError('Error fetching subjects. Please try again later.');
    });
  
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-2xl text-white font-semibold mb-4">All Subjects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {subjects.map((subject) => (
          <Link to={`/subject/${subject._id}`} key={subject._id}>
            <div className="bg-white p-4 rounded-xl shadow-xl">
              <img
                src={subject.imageUrl}
                alt={subject.description}
                className="w-16 h-16 object-cover rounded-full mx-auto mb-2"
              />
              <p className="text-lg font-semibold text-center">{subject.subjectName}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SubjectListing;
