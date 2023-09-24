import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Import a code style, e.g., 'prism' or 'duotoneDark'


const practicals = [
  {
    id: 1,
    aim: 'Aim of Practical 1',
    code: `
#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}
`,
    output: 'Output for Practical 1:\nHello, World!\n',
    explanation: 'Explanation for Practical 1',
  },
  {
    id: 2,
    aim: 'Aim of Practical 2',
    code: `
#include <stdio.h>

int main() {
    int num1 = 5;
    int num2 = 10;
    int sum = num1 + num2;
    
    printf("Sum of %d and %d is %d.\\n", num1, num2, sum);
    return 0;
}
`,
    output: 'Output for Practical 2:\nSum of 5 and 10 is 15.\n',
    explanation: 'Explanation for Practical 2',
  },
  // Add more practicals as needed
];

const Solution = () => {
    return (
        <div className="container mx-auto p-4">
          <h2 className="text-2xl font-semibold mb-4">Solutions</h2>
          <div className="grid gap-4">
            {practicals.map((practical) => (
              <div key={practical.id} className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">{practical.aim}</h3>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <strong>C Code:</strong>
                  <SyntaxHighlighter language="c" style={prism}>
                    {practical.code}
                  </SyntaxHighlighter>
                </div>
                <div className="mt-4">
                  <strong>Output:</strong>
                  <pre className="bg-gray-100 p-4 rounded-lg whitespace-pre-wrap">{practical.output}</pre>
                </div>
                <div className="mt-4">
                  <strong>Explanation:</strong>
                  <p>{practical.explanation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
};

export default Solution;
