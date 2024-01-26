'use client';

import React, { createRef, useLayoutEffect } from 'react';

const src = 'https://utteranc.es/client.js';

export interface UtterancesProps {
  repo: string;
  slug: string | string[];
  theme: 'dark' | 'light';
}

const Utterances: React.FC<UtterancesProps> = React.memo(({ repo, theme, slug }) => {
  const containerRef = createRef<HTMLDivElement>();
  useLayoutEffect(() => {
    const utterances = document.createElement('script');

    const attributes = {
      src,
      repo,
      'issue-term': Array.isArray(slug) ? slug.join('/') : slug,
      label: '✨💬✨',
      theme: theme === 'dark' ? 'dark-blue' : 'github-light',
      crossOrigin: 'anonymous',
      async: 'true',
    };

    Object.entries(attributes).forEach(([key, value]) => {
      utterances.setAttribute(key, value);
    });

    containerRef.current?.appendChild(utterances);
  }, [containerRef, repo, theme]);

  return <div ref={containerRef} />;
});

Utterances.displayName = 'Utterances';

export default Utterances;
