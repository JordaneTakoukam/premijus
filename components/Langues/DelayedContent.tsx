// DelayedContent.tsx
'use client';

import { useEffect, useState } from "react";
import LanguageLoading from "@/components/Langues/LanguageLoading";

export default function DelayedContent({ children }: { children: React.ReactNode }) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500); // 2 secondes de délai
    return () => clearTimeout(timer);
  }, []);

  if (!showContent) {
    return <LanguageLoading />;
  }

  return <>{children}</>;
}
