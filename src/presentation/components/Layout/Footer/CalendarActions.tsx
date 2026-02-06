import React from 'react';
import { ExportButton } from '../../Calendar/Actions/ExportButton';
import { ClearCalendarButton } from '../../Calendar/Actions/ClearCalendarButton';
import { SaveButton } from '../../Calendar/Actions/SaveButton';
import { AuditLogButton } from '../../Calendar/Actions/AuditLogButton';

export const CalendarActions: React.FC = () => {
  return (
    <div className="flex justify-center gap-4 flex-wrap">
      <SaveButton />
      <ExportButton />
      <AuditLogButton />
      <ClearCalendarButton />
    </div>
  );
};