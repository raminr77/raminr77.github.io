import { useCallback } from 'react';

import { sendGTMEvent } from '@next/third-parties/google';

type GTMPayload = Parameters<typeof sendGTMEvent>[0];

/**
 * Returns a stable callback that fires a GTM event. Avoids inline `() => sendGTMEvent(...)`
 * recreations on every render.
 */
export function useTrack(payload: GTMPayload) {
  return useCallback(() => sendGTMEvent(payload), [payload]);
}
