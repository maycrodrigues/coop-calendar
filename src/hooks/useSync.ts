import { useEffect, useRef } from 'react';
import { useCalendarStore } from '../infrastructure/stores/useCalendarStore';
import { useAuthStore } from '../infrastructure/stores/useAuthStore';
import { supabase } from '../infrastructure/services/supabaseClient';
import { CalendarEvent } from '../domain/entities/CalendarEvent';

export const useSync = () => {
  const { email } = useAuthStore();
  const { events, days, setEvents, setDays } = useCalendarStore();
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (!email || !supabase) return;

    // 1. Initial Fetch from Supabase
    const fetchRemoteData = async () => {
      try {
        const { data: remoteEvents, error: eventsError } = await supabase
          .from('events')
          .select('*')
          .eq('user_email', email);

        if (remoteEvents && !eventsError) {
          // Assuming remote data matches local structure or mapping logic here
          // setEvents(remoteEvents as CalendarEvent[]);
        }

        const { data: remoteDays, error: daysError } = await supabase
          .from('days')
          .select('*')
          .eq('user_email', email);
          
        if (remoteDays && !daysError) {
            // Transform array back to Record<string, ParentType>
            // const daysMap = ...
            // setDays(daysMap);
        }
      } catch (error) {
        console.error('Error fetching remote data:', error);
      }
    };

    // fetchRemoteData(); // Uncomment when Supabase is configured

    // 2. Subscribe to Realtime Changes
    const channel = supabase
      .channel('calendar_sync')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'events', filter: `user_email=eq.${email}` },
        (payload) => {
          console.log('Remote event change:', payload);
          // refresh data or merge payload
          // fetchRemoteData();
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'days', filter: `user_email=eq.${email}` },
        (payload) => {
          console.log('Remote day change:', payload);
          // fetchRemoteData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [email]);

  // 3. Push Changes (Debounced or on change)
  // This is a simplified "Save" strategy. In a real Offline-first app, 
  // we would use a queue system (Action Log) to replay changes.
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (!email) return;

    const pushChanges = async () => {
       // Logic to upsert events to Supabase
       // await supabase.from('events').upsert(events.map(e => ({ ...e, user_email: email })));
       // await supabase.from('days').upsert(...);
    };

    // const timeoutId = setTimeout(pushChanges, 2000); // Debounce 2s
    // return () => clearTimeout(timeoutId);
  }, [events, days, email]);
};
