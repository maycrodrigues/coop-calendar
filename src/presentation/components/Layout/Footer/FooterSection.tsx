import React from 'react';
import { CalendarActions } from './CalendarActions';

export const FooterSection: React.FC = () => {
  return (
    <footer className="mt-8 pt-8 border-t border-gray-200">
      <div className="space-y-8">
        <CalendarActions />
      </div>
    </footer>
  );
};