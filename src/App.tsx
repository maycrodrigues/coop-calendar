import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Calendar } from './presentation/components/Calendar/Calendar';
import { CalendarLayout } from './presentation/components/Layout/CalendarLayout';
import { LanguageSelector } from './presentation/components/Language/LanguageSelector';
import { useCalendarStore } from './infrastructure/stores/useCalendarStore';
import { AuthGuard } from './presentation/components/Auth/AuthGuard';
import { useSync } from './hooks/useSync';

function App() {
  const { t, i18n } = useTranslation();
  const { initializeDefaultEvents } = useCalendarStore();
  
  useSync(); // Initialize sync mechanism

  useEffect(() => {
    initializeDefaultEvents();
  }, [initializeDefaultEvents]);

  return (
    <HelmetProvider>
      <Helmet>
        <title>{t('appTitle')} - {t('meta.title')}</title>
        <meta name="description" content={t('meta.description')} />
        <meta name="keywords" content={t('meta.keywords')} />
        <meta property="og:title" content={t('appTitle')} />
        <meta property="og:description" content={t('meta.description')} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="language" content={i18n.language} />
        <link rel="canonical" href={window.location.href} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>
      <AuthGuard>
        <CalendarLayout>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                {t('appTitle')}
              </h1>
              <LanguageSelector />
            </div>
            <Calendar />
          </div>
        </CalendarLayout>
      </AuthGuard>
    </HelmetProvider>
  );
}

export default App;