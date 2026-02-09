import React, { useState, useEffect } from 'react';
import { CalendarHeader } from './Header/CalendarHeader';
import { CalendarViewSelector } from './ViewSelector/CalendarViewSelector';
import { MonthView } from './Views/MonthView';
import { YearView } from './Views/YearView';
import { CalendarViewType } from '../../../domain/entities/CalendarView';
import { useCalendarNavigation } from '../../hooks/useCalendarNavigation';
import { AddEventModal } from './Modals/AddEventModal';
import { LogViewerModal } from './Modals/LogViewerModal';
import { CalendarActions } from '../Layout/Footer/CalendarActions';
import { useIsMobile } from '../../hooks/useIsMobile';

export const Calendar: React.FC = () => {
  const isMobile = useIsMobile();
  const [view, setView] = useState<CalendarViewType>(isMobile ? 'year' : 'month');
  const { currentDate, navigateForward, navigateBackward } = useCalendarNavigation(view);

  // Force Year View on Mobile
  useEffect(() => {
    if (isMobile && view !== 'year') {
      setView('year');
    }
  }, [isMobile, view]);

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
          {!isMobile && (
            <CalendarViewSelector
              currentView={view}
              onViewChange={setView}
            />
          )}
        </div>
        
        {/* Pass readOnly={true} if on mobile.
            Note: MonthView doesn't accept readOnly yet, but it won't be rendered on mobile.
            YearView now accepts readOnly.
        */}
        <ViewComponent 
          currentDate={currentDate} 
          {...(view === 'year' ? { readOnly: isMobile } : {})}
        />

        {/* Hide footer actions on mobile if read-only implies no actions */}
        {!isMobile && (
          <div className="mt-8 pt-8 border-t border-gray-200">
            <CalendarActions />
          </div>
        )}
      </div>
      {!isMobile && <AddEventModal />}
      <LogViewerModal />
    </>
  );
};