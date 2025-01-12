import React, { ReactNode } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from '@/shared/store';

export function PersistWrapper({ children }: { children: ReactNode }) {
  return (
    <PersistGate persistor={persistor} loading={null}>
      {children}
    </PersistGate>
  );
}
