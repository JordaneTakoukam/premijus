// components/LanguageLoading.tsx
"use client";

import { useEffect, useState } from 'react';

export default function LanguageLoading() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);

    window.addEventListener('languagechange', handleStart);
    window.addEventListener('languagechanged', handleComplete);

    return () => {
      window.removeEventListener('languagechange', handleStart);
      window.removeEventListener('languagechanged', handleComplete);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
      <span className="sr-only">Chargement de la langue...</span>
    </div>
  );
}