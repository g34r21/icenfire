'use client';

import { QueryClientProvider } from '@tanstack/react-query';

import { getQueryClient } from '@/utils/getQueryClient';

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
