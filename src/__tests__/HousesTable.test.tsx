import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import nextRouterMock from 'next-router-mock';
import React from 'react';

import Houses from '@/components/HousesTable';

vi.mock('next/navigation', () => {
  const usePathname = () => {
    const router = nextRouterMock;
    return router.pathname;
  };

  const useSearchParams = () => {
    return new URLSearchParams();
  };

  return {
    useRouter: () => nextRouterMock,
    usePathname,
    useSearchParams,
  };
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('Houses Component', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('renders houses table properly', async () => {
    fetchMock.get(
      'https://anapioficeandfire.com/api/houses?page=1&pageSize=10',
      new Response(JSON.stringify([
        {
          id: '200',
          name: 'House Stark',
          url: 'https://anapioficeandfire.com/api/houses/200',
          swornMembers: ['https://anapioficeandfire.com/api/characters/1'],
        },
      ]), { status: 200 }),
    );

    render(<Houses />, { wrapper });

    await waitFor(() => {
      expect(screen.getByRole('link')).toHaveAttribute('href', '/houses/200/members');
      expect(screen.getByText('House Stark')).toBeInTheDocument();
    });
  });
});
