import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import nextRouterMock from 'next-router-mock';
import React from 'react';

import HouseMembers from '@/components/HouseMembers';

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

describe('House Members', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('renders house members cards properly', async () => {
    fetchMock.get(
      'begin:https://www.anapioficeandfire.com/api/characters/',
      new Response(
        JSON.stringify({
          aliases: ['Littlefinger'],
          allegiances: [
            'https://www.anapioficeandfire.com/api/houses/10',
            'https://www.anapioficeandfire.com/api/houses/11',
          ],
          books: ['https://www.anapioficeandfire.com/api/books/1'],
          born: 'In 268 AC, at the Fingers',
          culture: 'Valemen',
          died: '',
          father: '',
          mother: '',
          name: 'Petyr Baelish',
          playedBy: ['Aidan Gillen'],
          povBooks: [],
          spouse: 'https://www.anapioficeandfire.com/api/characters/688',
          titles: [
            'Master of coin (formerly)',
            'Lord Paramount of the Trident',
            'Lord of Harrenhal',
            'Lord Protector of the Vale',
          ],
          tvSeries: [
            'Season 1',
            'Season 2',
            'Season 3',
            'Season 4',
            'Season 5',
          ],
          url: 'https://www.anapioficeandfire.com/api/characters/823',
        }),
        { status: 200 },
      ),
    );

    render(<HouseMembers membersUrls={['https://www.anapioficeandfire.com/api/characters/823']} />, { wrapper });

    await waitFor(() => {
      expect(screen.getByText('Petyr Baelish')).toBeInTheDocument();
      expect(screen.getByText('Alive')).toBeInTheDocument();
    });
  });
});
