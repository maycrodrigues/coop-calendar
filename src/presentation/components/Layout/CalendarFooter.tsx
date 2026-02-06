import React from 'react';
import { ClearCalendarButton } from '../Calendar/ClearCalendarButton';
import { ExportButton } from '../Calendar/ExportButton';

export const CalendarFooter: React.FC = () => {
  return (
    <footer className="mt-8 pt-4 border-t border-gray-200">
      <div className="flex justify-center gap-4">
        <ExportButton />
        <ClearCalendarButton />
      </div>
    </footer>
  );
};