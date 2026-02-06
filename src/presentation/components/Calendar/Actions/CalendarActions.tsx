import React from 'react';
import { SaveButton } from './SaveButton';
import { ExportButton } from './ExportButton';
import { ClearButton } from './ClearButton';

export const CalendarActions: React.FC = () => {
  return (
    <div className="flex justify-center gap-4 flex-wrap">
      <SaveButton />
      <ExportButton />
      <ClearButton />
    </div>
  );
};