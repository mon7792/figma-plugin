import React, { FunctionComponent } from 'react';
import logo from '../../assets/logo.svg';

//
type GenerateProps = {};

// Generate Components
const Generate: FunctionComponent<GenerateProps> = ({}) => {
  return (
    <>
      <div className="bg-white p-8 rounded-lg shadow-md w-96 font-mono">
        <div className="mb-4">
          <img src={logo} />
          <input
            type="text"
            id="search"
            className="border border-gray-300 rounded-lg w-full py-2 px-4 focus:outline-none focus:border-blue-400"
            placeholder="describe your feel"
          />
        </div>
        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
          Visualize
        </button>
    </div>
    </>
  );
};

export default Generate;
