'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Set dark mode by default
    document.documentElement.classList.add('dark');
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <div className={resolvedTheme === 'dark' ? 'dark' : ''}>
      {children}
    </div>
  );
}
