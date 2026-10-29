'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/context/theme/ThemeContext';
import { dashboardTheme } from '@/theme/theme';
import { useState } from 'react';

export function DashboardMainProviders({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={dashboardTheme}>
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
}