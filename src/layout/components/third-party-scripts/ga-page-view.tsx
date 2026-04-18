'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { sendGAEvent } from '@next/third-parties/google';
import { useEffect } from 'react';

export function GAPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams.toString();
    sendGAEvent('event', 'page_view', {
      page_path: query ? `${pathname}?${query}` : pathname
    });
  }, [pathname, searchParams]);

  return null;
}
