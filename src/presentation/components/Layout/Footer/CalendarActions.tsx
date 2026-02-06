import React from 'react';
import { AuditLogButton } from '../../Calendar/Actions/AuditLogButton';

export const CalendarActions: React.FC = () => {
  return (
    <div className="flex justify-center gap-4 flex-wrap">
      <AuditLogButton />
    </div>
  );
};