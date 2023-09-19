import React from 'react';
import { Link } from 'react-router-dom';

const SubjectListing = () => {
  const items = [
    { id: 1, image: 'https://miro.medium.com/v2/resize:fit:1400/0*UVG1F-0kLAEWAT3k', description: 'Data Structure' },
    { id: 2, image: 'https://media.istockphoto.com/id/473035236/vector/object-oriented-programming-oop.jpg?s=612x612&w=0&k=20&c=2vBUhGzzaesGJWpKtVMqA-aOPHskDIIizSdtMwZOy9Q=', description: 'Object Oriented Programming' },
    { id: 3, image: 'https://s3.us-west-1.amazonaws.com/mindbowser.com-content/wp-content/uploads/2021/09/03091025/Best-Java-Integrated-Development-Environments-new.png', description: 'Java' },
    { id: 4, image: 'https://s3.us-west-1.amazonaws.com/mindbowser.com-content/wp-content/uploads/2021/09/03091025/Best-Java-Integrated-Development-Environments-new.png', description: 'Programming for Problem Solving Practical List' },
    // Add more items as needed
  ];

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-2xl font-semibold mb-4">All Subjects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {items.map((item) => (
          <Link to={`/practical/${item.id}`} key={item.id}>
            <div className="bg-white p-4 rounded-xl shadow-xl">
              <img
                src={item.image}
                alt={item.description}
                className="w-16 h-16 object-cover rounded-full mx-auto mb-2"
              />
              <p className="text-lg font-semibold text-center">{item.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SubjectListing;
