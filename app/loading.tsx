import React from 'react';

function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 border-4 border-t-4 border-gray-200 border-t-yellow-400 rounded-full animate-spin"></div>
        <p className="text-lg font-semibold text-gray-200">Loading...</p>
      </div>
    </div>
  );
}

export default Loading;