import React from 'react';

export const Legend: React.FC = () => {
  return (
    <div className="mt-4 flex gap-4 justify-center flex-wrap">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-blue-200 rounded"></div>
        <span>Father</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-pink-200 rounded"></div>
        <span>Mother</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-gradient-to-r from-blue-200 to-pink-200 rounded"></div>
        <span>Shared (Transition)</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-purple-200 rounded"></div>
        <span>Shared (Default)</span>
      </div>
    </div>
  );
};