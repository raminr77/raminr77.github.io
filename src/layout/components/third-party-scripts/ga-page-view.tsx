'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { sendGAEvent } from '@next/third-parties/google';
import { useEffect, useRef } from 'react';

export function GAPageView() {
  const pathname = usePathname();
  const isMounted = useRef(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    const query = searchParams.toString();
    sendGAEvent('event', 'page_view', {
      page_path: query ? `${pathname}?${query}` : pathname
    });
  }, [pathname, searchParams]);

  return null;
}
