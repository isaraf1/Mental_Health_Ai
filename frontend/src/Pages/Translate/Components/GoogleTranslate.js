import React, { useEffect } from 'react';

export default function GoogleTranslate() {
  useEffect(() => {
    const loadGoogleTranslate = () => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        // script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;

        // Success and error handling for script loading
        script.onload = () => resolve(script);
        script.onerror = () => reject(new Error('Google Translate script failed to load'));

        document.body.appendChild(script);
      });
    };

    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate && window.google.translate.TranslateElement) {
        // Clear any existing instances to prevent duplication
        const existingTranslateElement = document.getElementById('google_translate_element');
        if (existingTranslateElement) {
          existingTranslateElement.innerHTML = '';
        }
        new window.google.translate.TranslateElement(
          { pageLanguage: 'en', includedLanguages: 'en,hi,bn,gu,kn,ml,mr,ta,te,ur' },
          'google_translate_element'
        );
      }
    };

    if (!window.google || !window.google.translate) {
      loadGoogleTranslate().catch(error => {
        console.error('Error loading Google Translate:', error);
      });
    } else {
      window.googleTranslateElementInit();
    }

    return () => {
      // Clean up the global callback to avoid memory leaks
      delete window.googleTranslateElementInit;
    };
  }, []);

  return (
    <div id="google_translate_element"></div>
  );
}
