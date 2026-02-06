import React from 'react';

interface CalendarLayoutProps {
  children: React.ReactNode;
}

export const CalendarLayout: React.FC<CalendarLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full md:w-11/12 lg:w-5/6 xl:w-3/4 min-h-screen bg-white p-3 sm:p-6 shadow-lg flex flex-col">
        <div className="flex-grow">
          {children}
        </div>
      </div>
    </div>
  );
};