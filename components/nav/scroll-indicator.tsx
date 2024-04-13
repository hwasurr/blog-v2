'use client';
import { useEffect, useState } from 'react';

export function ScrollIndicator(): JSX.Element | null {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const handleScroll = (): void => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!window.location.pathname.startsWith('/blog')) return null;

  return (
    <div className="sticky w-full">
      <div className="h-1 w-full bg-primary" style={{ width: `${progress}%` }}></div>
    </div>
  );
}
