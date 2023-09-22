import React from 'react';

const PracticalListing = () => {
  const practicals = [
    {
      srNo: 1,
      aim: 'Aim of Practical 1',
      solutionLink: 'https://example.com/solution1',
    },
    {
      srNo: 2,
      aim: 'Aim of Practical 2',
      solutionLink: 'https://example.com/solution2',
    },
    // Add more practicals as needed
  ];

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-2xl font-semibold mb-4">Practical List</h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className='bg-[#E3FDFD] bg-opacity-90 border-2 border-sky-500'>
          <tr>
            <th className="w-10 px-6 py-3 text-left text-xs font-medium border  uppercase tracking-wider">
              SR No
            </th>
            <th className="w-70 px-6 py-3 text-left text-xs font-medium border  uppercase tracking-wider">
              Aim
            </th>
            <th className="w-20 px-6 py-3 text-left text-xs font-medium border  uppercase tracking-wider">
              Solution Link
            </th>
          </tr>
        </thead>
        <tbody className="bg-white bg-opacity-90 divide-y  divide-gray-200">
          {practicals.map((practical) => (
            <tr key={practical.srNo}>
              <td className="w-10 px-6 border py-4 whitespace-nowrap">{practical.srNo}</td>
              <td className="w-70 px-6 border py-4 whitespace-nowrap">{practical.aim}</td>
              <td className="w-20 px-6 border py-4 whitespace-nowrap">
                <a
                  href={practical.solutionLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Solution Link
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PracticalListing;
