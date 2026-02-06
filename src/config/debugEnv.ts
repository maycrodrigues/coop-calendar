export const debugEnv = () => {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

  console.log('Environment Check:', {
    VITE_SUPABASE_URL: url ? 'Defined (Starts with ' + url.substring(0, 8) + '...)' : 'Missing',
    VITE_SUPABASE_ANON_KEY: key ? 'Defined' : 'Missing',
    MODE: import.meta.env.MODE,
    PROD: import.meta.env.PROD
  });
};
