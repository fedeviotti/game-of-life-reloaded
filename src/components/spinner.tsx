import * as React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center w-full min-h-[80vh]">
      <div className="relative w-24 h-24 animate-spin rounded-full bg-gradient-to-r from-gray-800 via-red-500 to-yellow-600 ">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gray-200 rounded-full border-2 border-white" />
      </div>
    </div>
  );
};

export default Spinner;
