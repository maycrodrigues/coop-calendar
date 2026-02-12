import { useEffect, useRef } from 'react';
import { useCalendarStore } from '../infrastructure/stores/useCalendarStore';
import { useAuthStore } from '../infrastructure/stores/useAuthStore';
import { useSyncStore } from '../infrastructure/stores/useSyncStore';
import { supabase } from '../infrastructure/services/supabaseClient';
import { CalendarEvent, EventType } from '../domain/entities/CalendarEvent';
import { ParentType } from '../domain/entities/CalendarDay';

export const useSync = () => {
  const { email } = useAuthStore();
  const { events, days, dayDetails, setEvents, setDays, initializeDefaultEvents } = useCalendarStore();
  const { setIsSaving, setLastSyncedAt } = useSyncStore();
  const isInitialMount = useRef(true);
  const isRemoteUpdate = useRef(false);

  // Helper to push changes to remote
  const pushData = async (currentEvents: CalendarEvent[], currentDays: Record<string, ParentType>, currentDayDetails: Record<string, { exchangeTime?: string }>) => {
      try {
        setIsSaving(true);
        // Upsert Events
        const eventsToUpsert = currentEvents.map(e => ({
          id: e.id,
          user_email: email,
          title: e.title,
          start_date: e.startDate,
          end_date: e.endDate,
          type: e.type,
          description: e.description,
          color: e.color,
        }));

        if (eventsToUpsert.length > 0) {
           await supabase.from('events').upsert(eventsToUpsert, { onConflict: 'id' });
        }

        // Upsert Days
        const daysToUpsert = Object.entries(currentDays).map(([date, parent]) => {
           const details = currentDayDetails[date] || {};
           return {
             user_email: email,
             date: date,
             parent: parent,
             pickup_time: details.exchangeTime, // Mapping exchangeTime to pickup_time column
             dropoff_time: null, // Deprecated
           };
        });

        if (daysToUpsert.length > 0) {
            await supabase.from('days').upsert(daysToUpsert, { onConflict: 'user_email, date' });
        }

        setLastSyncedAt(new Date());
      } catch (error) {
        console.error('Error pushing changes:', error);
      } finally {
        setIsSaving(false);
      }
  };

  useEffect(() => {
    if (!email || !supabase) return;

    // 1. Initial Fetch from Supabase
    const fetchRemoteData = async () => {
      try {
        isRemoteUpdate.current = true;
        
        // Fetch Events
        const { data: remoteEvents, error: eventsError } = await supabase
          .from('events')
          .select('*')
          .eq('user_email', email);

        // Fetch Days
        const { data: remoteDays, error: daysError } = await supabase
          .from('days')
          .select('*')
          .eq('user_email', email);

        const hasRemoteEvents = remoteEvents && remoteEvents.length > 0;
        const hasRemoteDays = remoteDays && remoteDays.length > 0;

        if (hasRemoteEvents || hasRemoteDays) {
           // REMOTE HAS DATA: Sync Remote -> Local
           if (remoteEvents && !eventsError) {
             const mappedEvents: CalendarEvent[] = remoteEvents.map((e: any) => ({
               id: e.id,
               title: e.title,
               startDate: e.start_date,
               endDate: e.end_date,
               type: e.type as EventType,
               description: e.description,
               color: e.color,
             }));
             setEvents(mappedEvents);
           }

           if (remoteDays && !daysError) {
             const daysMap: Record<string, ParentType> = {};
             const dayDetailsMap: Record<string, { exchangeTime?: string }> = {};
             remoteDays.forEach((d: any) => {
               daysMap[d.date] = d.parent as ParentType;
               if (d.pickup_time) {
                 dayDetailsMap[d.date] = {
                   exchangeTime: d.pickup_time, // Mapping pickup_time column to exchangeTime
                 };
               }
             });
             setDays(daysMap, dayDetailsMap);
           }
        } else {
           // REMOTE IS EMPTY: Check Local Data
           // If local data exists (e.g. default events), Push Local -> Remote
           // We access store directly to get latest state
           let localEvents = useCalendarStore.getState().events;
           const localDays = useCalendarStore.getState().days;
           const localDayDetails = useCalendarStore.getState().dayDetails;
           
           if (localEvents.length === 0) {
              // If local is also empty, initialize defaults
              useCalendarStore.getState().initializeDefaultEvents();
              localEvents = useCalendarStore.getState().events;
           }

           // If we have data now, push it to initialize the remote
           if (localEvents.length > 0 || Object.keys(localDays).length > 0) {
               await pushData(localEvents, localDays, localDayDetails);
           }
        }
      } catch (error) {
        console.error('Error fetching remote data:', error);
      } finally {
        // Allow local updates to trigger sync after initial fetch
        setTimeout(() => {
          isRemoteUpdate.current = false;
        }, 100);
      }
    };

    fetchRemoteData();

    // 2. Poll for updates every 30 seconds (replacing Realtime to avoid loops)
    const intervalId = setInterval(() => {
      fetchRemoteData();
    }, 30000);

    return () => {
      clearInterval(intervalId);
    };
  }, [email, setEvents, setDays, initializeDefaultEvents]);

  // 3. Push Changes
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (!email) return;

    // Skip push if the update came from remote
    if (isRemoteUpdate.current) {
      return;
    }

    // Immediate push without debounce (per user request)
    pushData(events, days, dayDetails);
    
  }, [events, days, dayDetails, email]); // Dependencies trigger push
};
