'use client';

import { useRef } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { Metadata } from 'next';
import { persistor, store } from '@/store';

export const metadata: Metadata = {
  title: 'Golden Reputation',
  description: 'Golden Reputation',
};

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClientRef = useRef(new QueryClient());

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClientRef.current}>{children}</QueryClientProvider>
      </PersistGate>
    </Provider>
  );
};

export default AppProvider;
