'use client';

import { useState, useEffect } from 'react';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
      // Add padding to body when banner is shown
      document.body.style.paddingBottom = '80px';
    } else if (consent === 'accepted') {
      loadGoogleAnalytics();
    }
    setIsLoaded(true);
  }, []);

  const loadGoogleAnalytics = () => {
    const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
    if (!gaMeasurementId) return;

    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`;
    script.async = true;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', gaMeasurementId, {
      anonymize_ip: true,
      cookie_flags: 'SameSite=None;Secure'
    });
  };

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    loadGoogleAnalytics();
    // Remove padding when banner is hidden
    document.body.style.paddingBottom = '0';
    setShowBanner(false);
  };

  const rejectCookies = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    // Remove padding when banner is hidden
    document.body.style.paddingBottom = '0';
    setShowBanner(false);
  };

  if (!isLoaded || !showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 shadow-lg z-50 py-3 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-sm text-gray-700 flex-1">
            We use cookies to analyze website traffic via Google Analytics.{' '}
            <a 
              href="/legal/privacy-policy" 
              className="text-blue-600 hover:underline font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn more
            </a>
          </p>
          
          <div className="flex gap-2 flex-shrink-0">
            <button
              onClick={rejectCookies}
              className="px-4 py-1.5 text-sm border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Reject
            </button>
            <button
              onClick={acceptCookies}
              className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}