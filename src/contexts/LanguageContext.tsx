import React, { createContext, useState } from 'react';

interface LanguageContextType {
  language: 'en' | 'fr';
  toggleLanguage: () => void;
}

export const LanguageContext = createContext<LanguageContextType>({} as LanguageContextType);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<'en' | 'fr'>('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'fr' : 'en');
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}