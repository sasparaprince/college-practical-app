import React from 'react';

const About = () => {
  return (
    <div className=" text-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-black shadow-lg shadow-white p-4  rounded-3xl">
        <h1 className="text-4xl sm:text-5xl font-semibold mb-8">About Us</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="mb-4 border p-2 rounded-2xl border-white">
            <p className="text-lg sm:text-xl  leading-relaxed">
              Welcome to OurWebsiteName! We are a team of passionate individuals dedicated to providing educational resources and practical solutions for students.
            </p>
          </div>
          <div className="mb-4 border p-2 rounded-2xl border-white">
            <p className="text-lg sm:text-xl leading-relaxed">
              Our mission is to assist students in their academic journey by offering a wide range of practical exercises and solutions across various subjects.
            </p>
          </div>
        </div>
        <p className="text-lg sm:text-xl leading-relaxed">
          Please feel free to explore our website and make the most of the educational content we provide.
        </p>
      </div>
    </div>
  );
};

export default About;
