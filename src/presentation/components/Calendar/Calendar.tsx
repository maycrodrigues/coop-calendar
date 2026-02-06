import React, { useState } from 'react';
import { CalendarHeader } from './Header/CalendarHeader';
import { CalendarViewSelector } from './ViewSelector/CalendarViewSelector';
import { MonthView } from './Views/MonthView';
import { YearView } from './Views/YearView';
import { CalendarViewType } from '../../../domain/entities/CalendarView';
import { useCalendarNavigation } from '../../hooks/useCalendarNavigation';
import { AddEventModal } from './Modals/AddEventModal';
import { LogViewerModal } from './Modals/LogViewerModal';
import { CalendarActions } from '../Layout/Footer/CalendarActions';

export const Calendar: React.FC = () => {
  const [view, setView] = useState<CalendarViewType>('month');
  const { currentDate, navigateForward, navigateBackward } = useCalendarNavigation(view);

  const ViewComponent = {
    month: MonthView,
    year: YearView,
  }[view];

  return (
    <>
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <CalendarHeader
            currentDate={currentDate}
            view={view}
            onPrevious={navigateBackward}
            onNext={navigateForward}
          />
          <CalendarViewSelector
            currentView={view}
            onViewChange={setView}
          />
        </div>
        <ViewComponent currentDate={currentDate} />
        <div className="mt-8 pt-8 border-t border-gray-200">
          <CalendarActions />
        </div>
      </div>
      <AddEventModal />
      <LogViewerModal />
    </>
  );
};