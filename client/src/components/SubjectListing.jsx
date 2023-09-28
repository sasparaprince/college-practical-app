import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loader from './Spinner';
import { Helmet } from 'react-helmet';

const SubjectListing = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://college-practical.vercel.app/api/subjects')
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
    return <Loader />
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (

    <div className="container mx-auto my-8">
       <Helmet>
                <meta charSet="utf-8" />
                <title>All Subjects</title>
<meta name='description' content='data structure,python , OOP , java, web-app, c , c++'/>
            </Helmet>

      <h1 className="text-2xl text-white font-semibold mb-4">All Subjects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {subjects.map((subject) => (
          <Link to={`/subject/${subject._id}`} key={subject._id}>
            <div className="bg-white opacity-80 p-4 rounded-xl shadow-lg hover:shadow-slate-300">
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
